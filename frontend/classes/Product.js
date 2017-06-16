import productDescriptions from '../helpers/products/product-descriptions';
import random from '../helpers/math/random';

import logger from '../helpers/logger/logger';

const names = ['Alpha-Centaura', 'Sun', 'Magenta', 'Grapes', 'Best Hosting', 'Unnamed'];


import percentify from '../helpers/math/percentify';

import computeRating from '../helpers/products/compute-rating';

import * as PRODUCT_STAGES from '../constants/products/product-stages';

import companyCostComputer from '../helpers/products/compute-company-cost';
import companyMerger from '../helpers/products/company-merger';

import * as balance from '../constants/balance';

import round from '../helpers/math/round';


export default class Product {
  constructor({ idea, name, isCompetitor }) {
    // this.isCompetitor = isCompetitor;

    if (!idea) throw 'no idea in classes/Product.js';

    if (!name) {
      const index = Math.floor(random(0, names.length - 1));
      name = names[index];
    }

    const defaults = productDescriptions(idea);
    const defaultFeatures = defaults.features;

    let maxRating = 6;
    if (isCompetitor) maxRating = 8;

    const luck = random(1, maxRating) / 10; // luck in 0.1-0.6

    const offer = defaultFeatures.map((f, i) => Math.floor(luck * f.data));

    const features = {
      offer, // features, that are attached to main idea
      development: {}, // backups, more dev servers, e.t.c.

      marketing: {}, // SEO, SMM, mass media, email marketing e.t.c.
      analytics: {}, // simple analytics (main KPIs),
      // middle (segments analytics), mid+ (segments + versions),

      // not only chat with users, but also localisations, content updates
      // and all sort of things, that you need doing constantly
      support: {},
      payment: {}
    };

    const clients = isCompetitor ? Math.ceil(random(100, defaults.marketSize / 10)) : 10;

    const KPI = {
      debt: 0, // technical debt. Shows, how fast can you implement new features
      clients,
      newClients: clients,

      hype: 1000,

      bugs: 10,

      currentUXBugs: 100,
      foundUXBugs: 0,
      fixedUXBugs: 0
    };

    this.features = features;
    this.KPI = KPI;
    this.idea = idea;
    this.name = name;

    this.XP = 1900;

    this.tests = 1;
    this.improvements = 1;

    this.owner = !isCompetitor;
  }

  isOurProduct() {
    return this.owner;
  }

  getCompanyCost() {
    return companyCostComputer.compute(this);
  }

  getRating(segmentId) {
    if (!segmentId) segmentId = 0;

    const result = round(computeRating(this, segmentId));

    return Math.max(result, 0);
  }

  getClients(segmentId) {
    const total =  this.KPI.clients;
    if (segmentId === undefined || segmentId === null) return total;

    const s = this.getSegmentBySegmentId(segmentId);

    return Math.floor(s.percentage * total / 100);
  }

  getSegmentBySegmentId(segId) {
    return this.getSegments()[segId];
  }

  getHypeDamping() {
    return -2;
  }

  getSegmentedPriorities(segId) {
    const s = this.getSegmentBySegmentId(segId);
    const features = this.getDefaults().features;

    return s.rating.map((r, index) => {
      return {
        rating: r,
        feature: features[index].shortDescription,
      }
    }).sort((s1, s2) => s2.rating - s1.rating);
  }

  getNewClients() {
    return this.KPI.newClients;
  }

  getDisloyalClients() {
    return Math.floor(this.getClients() * this.getChurnRate().raw);
  }

  getViralClients() {
    return Math.floor(this.getNewClients() * this.getViralityRate());
  }

  getMainFeatureQualityByFeatureId(featureId) {
    const value = this.features.offer[featureId];

    return value; // round(value / feature.data);
  }

  getMainFeatureDefaultQualityByFeatureId(featureId) {
    return this.getDefaults().features[featureId].data;
  }

  getPrettyFeatureNameByFeatureId(featureId){
    return this.getDefaults().features[featureId].shortDescription;
  }

  requirementsOKforSegment(segmentId) {
    const { segments } = this.getDefaults();
    const segment = segments[segmentId];
    const requirements = segment.requirements;

    let valid = true;

    let unmetRequirements = [];

    requirements.forEach((r, featureId) => {
      const max = this.getDefaults().features[featureId].data;

      const featureQuality = this.getMainFeatureQualityByFeatureId(featureId);
      const need = max * r / 100;

      const met = featureQuality >= need;

      if (!met) {
        valid = false;

        unmetRequirements.push({
          name: this.getPrettyFeatureNameByFeatureId(featureId),
          now: featureQuality,
          need
        });
      }
      // logger.debug(`feature quality #${featureId}: ${featureQuality}. Requirement is ${met}`)
    });

    return {
      valid,
      unmetRequirements
    };
  }

  getAnalyticsValueForFeatureCreating() {
    // range: 0 - 1
    // range: 0.1 - 0.4
    const analytics = this.features.analytics;

    let value = 0;

    const feedback = analytics.feedback;
    const webvisor = analytics.webvisor;
    const segmenting = analytics.segmenting;

    if (segmenting) {
      value = 0.4;
    } else if (webvisor) {
      value = 0.3;
    } else if (feedback) {
      value = 0.1;
    }

    return value;
  }

  getDefaults() {
    return productDescriptions(this.idea);
  }

  getProductUtility() {
    return this.getDefaults().utility;
  }

  getPaymentModifier() {
    const payments = this.features.payment;
    // mockBuying
    // basicPricing
    // segmentedPricing
    if (payments.segmentedPricing3) {
      return 1;
    }
    if (payments.segmentedPricing2) {
      return 0.85;
    }
    if (payments.segmentedPricing) {
      return 0.7;
    }


    if (payments.basicPricing3) {
      return 0.4;
    }
    if (payments.basicPricing2) {
      return 0.30;
    }
    if (payments.basicPricing) {
      return 0.25;
    }

    if (payments.mockBuying) {
      return 1;
    }

    return 0;
  }

  getConversionRate(segmentId) {
    const rating = this.getRating(segmentId);
    const utility = this.getProductUtility();

    const paymentModifier = this.getPaymentModifier();

    let conversion = utility * rating * paymentModifier / 1000; // rating 10 - 0.05

    let raw;
    let pretty;
    if (conversion < 0 || conversion > 15) {
      logger.error(`invalid conversion value ${conversion}`);
      // throw 'INVALID_CONVERSION_ERROR';
      conversion = 0;
    }

    // if (segmentId > 0) {
    //   conversion = rating * paymentModifier / 10;
    // }

    raw = conversion;
    pretty = percentify(conversion);

    return {
      raw, pretty
    }
  }

  getProductPrice(segId) {
    const defaults = this.getDefaults();

    if (!segId) return defaults.price;

    return defaults.segments[segId].price;
  }

  getFeatures(featureGroup) {
    return this.features[featureGroup];
  }

  isPaymentEnabled(segmentId) {
    const payments = this.getFeatures('payment');
    // mockBuying
    // basicPricing
    // segmentedPricing

    logger.shit('requirements for segment');

    if (!this.requirementsOKforSegment(segmentId).valid) return 0;

    if (payments.basicPricing) {
      return 1;
    }

    return 0;
  }

  getSegmentIncome(segId) {
    const conversion = this.getConversionRate(segId).raw * this.isPaymentEnabled(segId); // rating 10 - 0.05

    const clients = this.getClients(segId);
    const price = this.getProductPrice(segId);

    // logger.debug(`getSegmentIncome segment ${segId}, ${conversion}%, ${clients} cli, ${price}$`);
    const payments = conversion * clients;

    // logger.debug('getProductIncome', segId, payments);
    // need app
    // want to pay
    // can pay
    return payments * price;
  }

  getProductIncome() {
    const segments = this.getSegments();

    return segments
      .map((s, segId) => {
        return this.getSegmentIncome(segId);
      })
      .reduce((p, c) => p + c, 0);
  }

  getIdea() {
    return this.idea;
  }

  getViralityRate() {
    const rating = this.getRating();
    const multiplier = this.getDefaults().virality;
    const marketing = this.getMarketingFeatures();

    let base = 0.1;

    if (rating >= 7) {
      base += (rating - 7) / 10;
    }

    let referralBonuses = 0;
    // if (marketing.improvedReferralProgram) {
    //   referralBonuses += 0.45;
    // }

    if (marketing.referralProgram) {
      // referralBonuses += 0.21;
      referralBonuses += 0.65 * marketing.referralProgram;
    }

    return (base + referralBonuses) * multiplier;
  }

  getMarketingFeatures() {
    return this.features.marketing;
  }

  getBlogPower() {
    return this.getBlogStatusStructured().power;
  }

  getBlogStatusStructured() {
    const marketing = this.getMarketingFeatures();
    let power = 0;
    let support = 0;

    const featureCost = name => this.getMarketingFeatureList().filter(f => f.name === name)[0].support.marketing;

    if (marketing.blog) {
      power = 0.25;
      support = featureCost('blog')
    }
    if (marketing.blogII) {
      power = 0.5;
      support = featureCost('blogII')
    }
    if (marketing.blogIII) {
      power = 1;
      support = featureCost('blogIII')
    }

    return {
      power,
      supportCost: support,
      financed: true // has enough points
    }
  }

  getSupportPower() {
    const marketing = this.getMarketingFeatures();

    if (marketing.supportIII) return 1;
    if (marketing.supportII)  return 0.5;
    if (marketing.support)    return 0.25;

    return 0;
  }

  getEmailPower() {
    const marketing = this.getMarketingFeatures();

    if (marketing.emailIII) return 1;
    if (marketing.emailII)  return 0.5;
    if (marketing.email)    return 0.25;

    return 0;
  }

  getMarketingSupportCostPerClientForSupportFeature() {
    const marketing = this.getMarketingFeatures();

    if (marketing.supportIII) return 0.25;
    if (marketing.supportII)  return 0.5;
    if (marketing.support)    return 1;

    return 0;
  }

  getChurnRate() {
    // TODO fix constant values in blog, email, support in getChurnRate(i)
    // return answer in partitions 0-1
    logger.shit('TODO fix constant values in blog, email, support in getChurnRate(i)');

    let rating = this.getRating();

    if (rating < 3) {
      rating = 3;
      // return {
      //   raw: 1,
      //   pretty: 100
      // };
    }

    // logger.log('getChurnRate in ProductStore', rating, Math.pow(12 - rating, 1.7));
    const ratingModifier = Math.min(Math.pow(12 - rating, 1.65));

    const blog = this.getBlogPower();
    const emails = this.getEmailPower();
    const support = this.getSupportPower();
    const k = 0.6; // поправочный коэффициент

    const marketingModifier = 0.35 * blog + 0.15 * emails + 0.5 * support; // max total sum = 1

    // 15: r7
    // bad 10-15+
    // good 1-5
    const churn = ratingModifier * (1 - k * marketingModifier) / 100;

    // logger.debug('product-store.js getChurnRate', churn);

    return {
      raw: churn,
      pretty: percentify(churn)
    };
  }

  getProductBlogCost() {
    const BASE_BLOG_COST = 1000;

    return this.getMarketingFeatures().blog ? BASE_BLOG_COST : 0;
  }

  getProductSupportCost() {
    const marketing = this.getMarketingFeatures();

    const support = marketing.support || 0;

    if (!support) return 0;

    const clients = this.getClients();

    if (clients < 1000)   return 300;
    if (clients < 10000)  return 500;
    if (clients < 100000) return 3000;

    return 10000;
  }

  getProductExpenses() {
    return 0;
    return this.getProductBlogCost() + this.getProductSupportCost();
  }

  getName() {
    return this.name;
  }

  getStage() {
    return this.stage;
  }

  getFeatureStatus(featureGroup, featureName) {
    return this.features[featureGroup][featureName] > 0;
  }

  getCostPerClient() {
    return this.getDefaults().CAC;
  }

  getRatingForMetricsTab() {
    let phrase;
    const features = this.features;
    const analytics = features.analytics;

    // rating depends on
    // number of users (stat pogreshnost)
    // feedback form
    // segmenting
    // webvisor

    // if (!analytics.feedback && !analytics.webvisor && !analytics.segmenting) {
    //   return 0;
    // }
    let analyticsModifier = 1;
    if (analytics.feedback) analyticsModifier -= 0.3;

    if (analytics.webvisor) {
      analyticsModifier -= 0.5;
    } else if (analytics.segmenting) {
      analyticsModifier -= 0.65;
    }

    const clients = this.getClients();
    let factor = 2;
    if (clients > 100000) {
      factor = 1;
    } else if (clients > 10000) {
      factor = 1.1;
    } else if (clients > 1000) {
      factor = 1.2;
    } else if (clients > 100) {
      factor = 1.5;
    } else {
      factor = 2;
    }

    const error = round(5 * factor * analyticsModifier);
    const offset = Math.random() * error;
    const rating = this.getRating();

    let leftValue = round(rating - offset);
    if (leftValue < 0) {
      leftValue = 0;
    }

    let rightValue = round(leftValue + error);
    if (rightValue < 0) {
      rightValue = 0;
    } else if (rightValue > 10) {
      rightValue = 10;
    }

    phrase = `${leftValue} - ${rightValue}`;
    phrase = rating;

    return phrase;
  }

  getClientAnalyticsModifier() {
    let factor;
    const clients = this.getClients();

    const CLIENTS_LOT = 10000;
    const CLIENTS_MID = 1000;
    const CLIENTS_LOW = 100;

    let clientMin;
    let clientMax;

    let index;

    if (clients > CLIENTS_LOT) {
      factor = 4;
      clientMax = CLIENTS_LOT;
      clientMin = CLIENTS_LOT;
      index = 0;
    } else if (clients > CLIENTS_MID) {
      factor = 3;
      clientMax = CLIENTS_LOT;
      clientMin = CLIENTS_MID;
      index = 1;
    } else if (clients > CLIENTS_LOW) {
      factor = 2.5;
      clientMax = CLIENTS_MID;
      clientMin = CLIENTS_LOW;
      index = 2;
    } else {
      factor = 1;
      clientMax = CLIENTS_LOW;
      clientMin = 0;
      index = 3;
    }

    return {
      modifier: factor,
      clientsRange: [CLIENTS_LOT, CLIENTS_MID, CLIENTS_LOW, 1],
      factors: [1, 0.9, 0.8, 0.3],
      index,
      clientMax,
      clientMin,
      clients
    }
  }

  getProgrammingSupportCostModifier() {
    return Math.pow(this.getImprovementsAmount(), balance.SUPPORT_COST_MODIFIER);
  }

  getProgrammingSupportCost() {
    return Math.floor(this.getDefaults().support.pp * this.getProgrammingSupportCostModifier());
  }

  getMarketingSupportTechTotalCost() {
    return Math.floor(this.getClients() * this.getMarketingSupportCostPerClientForSupportFeature() / 100 / 5);
  }

  getBaseSupportCost() {
    return 15;
  }

  getMarketingSupportCost() {
    logger.shit('getMarketingSupportCost in prodstore.js is shit: it depends on marketing features enabled');
    // const blogSupportCost = this.getBlogPower(id);

    const supportSupportCost = this.getMarketingSupportTechTotalCost();
    return this.getBaseSupportCost() + supportSupportCost + this.getBlogStatusStructured().supportCost;
  }

  getMarketingFeatureList(idea) {
    return [
      {
        name: 'blog', shortDescription: 'Блог проекта',
        description: 'Регулярное ведение блога снижает отток клиентов на 10%',
        points: { marketing: 150 },
        support: { marketing: 50 }
      },
      {
        name: 'support', shortDescription: 'Техподдержка',
        description: 'Техподдержка снижает отток клиентов на 15%',
        points: { marketing: 50, programming: 100 },
        support: { marketing: 50 }
      },
      {
        name: 'blogII', shortDescription: 'Улучшенный блог проекта',
        description: 'Регулярное ведение блога снижает отток клиентов на 10%',
        points: { marketing: 150 },
        support: { marketing: 150 }
      },
      {
        name: 'supportII', shortDescription: 'Улучшенная техподдержка',
        description: 'Техподдержка снижает отток клиентов на 15%',
        points: { marketing: 50, programming: 100 },
        support: { marketing: 50 }
      },
      {
        name: 'emails', shortDescription: 'Рассылка электронной почты',
        description: 'Рассылка электронной почти снижает отток клиентов на 5%',
        points: { marketing: 50, programming: 100 },
        support: { programming: 20 }
      },
      {
        name: 'blogIII', shortDescription: 'Улучшенный блог проекта II',
        description: 'Регулярное ведение блога снижает отток клиентов на 10%',
        points: { marketing: 150 },
        support: { marketing: 150 }
      },
      {
        name: 'supportIII', shortDescription: 'Улучшенная техподдержка II',
        description: 'Техподдержка снижает отток клиентов на 15%. ',
        points: { marketing: 50, programming: 100 },
        support: { marketing: 50 }
      }
      // { name: 'referralProgram', shortDescription: 'Реферальная программа', description: 'Реферальная программа повышает виральность проекта на 30%',
      //   points: { marketing: 50, programming: 100 }, time: 7 }
    ];
    // ].map(computeFeatureCost(cost));
  };

  getHypothesisAnalyticsFeatures(idea) {
    return [
      { name: 'feedback', shortDescription: 'Форма для комментариев',
        description: 'Общение с вашими клиентами позволяет улучшить ваш продукт. +300XP/мес',
        points: { programming: 50, marketing: 0 }, bonus: 300
      },
      { name: 'webvisor', shortDescription: 'Вебвизор',
        description: 'Позволяет просматривать действия пользователей. +200XP/мес',
        points: { programming: 150, marketing: 0 }, bonus: 200
      },
      { name: 'AB', shortDescription: 'A/B тестирование',
        description: 'Позволяет тестировать несколько вариантов проекта. +400XP/мес',
        points: { programming: 175, marketing: 0 }, bonus: 400
      },
      { name: 'segmenting', shortDescription: 'Автоматическое сегментирование пользователей',
        description: '+500XP/мес',
        points: { programming: 250, marketing: 0 }, bonus: 500
      },
      { name: 'segmentingII', shortDescription: 'Автоматическое сегментирование пользователей II',
        description: '+600XP/мес',
        points: { programming: 500, marketing: 0 }, bonus: 600
      }
    ];
  };

  getAnalyticFeatures(idea) {
    return [
      // { name: 'feedback', shortDescription: 'Форма для комментариев', description: 'Общение с вашими клиентами позволяет вам улучшить ваш продукт. Повышает шансы при проверке гипотез на 10%',
      //   points: { programming: 50, marketing: 0 }
      // },
      // { name: 'webvisor', shortDescription: 'Вебвизор', description: 'Позволяет просматривать действия пользователей. Повышает шансы при проверке гипотез на 30%',
      //   points: { programming: 50, marketing: 0 }
      // },
      // { name: 'segmenting', shortDescription: 'Автоматическое сегментирование пользователей', description: 'Повышает шансы при проверке гипотез на 40%',
      //   points: { programming: 150, marketing: 100 }
      // },

      // { name: 'shareAnalytics', shortDescription: 'Аналитика шеринга', description: 'Открывает метрику "Виральность"',
      //   points: { programming: 50, marketing: 0 }
      // },
      { name: 'paymentAnalytics', shortDescription: 'Аналитика платежей', description: 'Открывает метрику "Платёжеспособность"',
        points: { programming: 50, marketing: 0 }
      }
    ];
    // ].map(computeFeatureCost(cost));
  };

  getPaymentFeatures(idea) {
    const technicalDebtModifier = this.getTechnicalDebtModifier();
    const up = points => Math.ceil(points * technicalDebtModifier);

    return [
      {
        name: 'mockBuying', shortDescription: 'Тестовая покупка',
        description: 'Позволяет узнать платёжеспособность клиентов. Вы не извлекаете никаких доходов с продукта',
        points: { programming: up(50), marketing: 0 }
      },
      {
        name: 'basicPricing', shortDescription: 'Единый тарифный план I',
        description: 'Единая цена для всех клиентов. Мы начинаем извлекать доходы с продукта',
        points: { programming: up(150), marketing: 0 }
      },
      {
        name: 'basicPricing2', shortDescription: 'Единый тарифный план II',
        description: 'Единая цена для всех. Доходы возрастают на 5% от текущего количества',
        points: { programming: up(50), marketing: 0 }
      },
      {
        name: 'basicPricing3', shortDescription: 'Единый тарифный план III',
        description: 'Единая цена для всех. Доходы возрастают ещё на 10%',
        points: { programming: up(50), marketing: 0 }
      },
      {
        name: 'segmentedPricing', shortDescription: 'Несколько тарифных планов I',
        description: 'Несколько ценовых сегментов. Наши доходы возрастают ещё на 30%',
        points: { programming: up(250), marketing: 0 }
      },
      {
        name: 'segmentedPricing2', shortDescription: 'Несколько тарифных планов II',
        description: 'Несколько ценовых сегментов. Наши доходы возрастают ещё на 15%',
        points: { programming: up(150), marketing: 0 }
      },
      {
        name: 'segmentedPricing3', shortDescription: 'Несколько тарифных планов III',
        description: 'Грести деньги лопатами!',
        points: { programming: up(150), marketing: 0 }
      }
    ];
  };


  getTechnicalDebtDescription(debt) {
    if (debt < 10) {
      return `Всё хорошо`;
    } else if (debt < 50) {
      return `Программисты начинают плакать`;
    } else {
      return `Ты мразь и п**ор, программисты ненавидят тебя!! Отрефакторь этот шлак!`;
    }
  };

  getImprovementChances() {
    const analytics = this.features.analytics;

    const picked = word => analytics[word];

    const feedback = analytics.feedback;
    const webvisor = analytics.webvisor;
    const segmenting = analytics.segmenting;

    // const analyticsChance = this.getAnalyticsValueForFeatureCreating(i);
    const clientModifier = this.getClientAnalyticsModifier();
    // const chance = analyticsChance * clientModifier.modifier; // h.baseChance +


    const basicBonus = 100;
    const feedbackBonus = 1000;
    const webvisorBonus = 1500;
    const segmentingBonus = 500;
    const segmentingBonus2 = 500;

    let bonuses = basicBonus;

    this.getHypothesisAnalyticsFeatures()
      .forEach((f) => {
        if (picked(f.name)) bonuses += f.bonus || 0;
      });

    let maxXP = bonuses;

    // maxXP *= clientModifier.modifier;

    return {
      middle: maxXP, // * clientModifier.modifier / 2,
      // min: 0,
      // max: maxXP * clientModifier.modifier,
      maxXPWithoutBonuses: maxXP,
      // webvisorBonus,
      // feedbackBonus,
      // segmentingBonus,
      // basicBonus,

      hasWebvisor: webvisor,
      hasFeedback: feedback,
      hasSegmenting: segmenting,

      clientModifier,
    }
  }

  getProductExpensesStructure() {
    return {
      name: this.getName(),
      blog: this.getProductBlogCost(),
      support: this.getProductSupportCost()
    };
  }

  getXP() {
    return this.XP;
  }

  getHypothesisPoints() {
    const complexityModifier = this.getTechnologyComplexityModifier();

    // logger.debug('getHypothesisPoints', complexityModifier);

    const defaults = this.getDefaults().hypothesis;

    return {
      mp: Math.ceil(defaults.mp * complexityModifier),
      pp: Math.ceil(defaults.pp * complexityModifier)
    }
  }

  getSegments() {
    return this.getDefaults().segments;
  }

  getSegmentById(segId) {
    return this.getSegments()[segId];
  }

  getDescriptionOfProduct() {
    return this.getDefaults().description;
  }

  canShowPayPercentageMetric() {
    return this.getFeatureStatus('payment', 'mockBuying')
  }

  clientsEnoughToFormSegment(segId) {
    return this.getClients(segId) > 100;
  }

  getAvailableSegments() {
    const value = this.getSegments()
      .filter((s, segId) => this.requirementsOKforSegment(segId).valid && this.clientsEnoughToFormSegment(segId));

    // logger.debug('getAvailableSegments', value);

    return value;
  }

  getMarketShare() {
    const clients = this.getClients();
    const marketSize = this.getDefaults().marketSize;

    return {
      share: percentify(clients / marketSize),
      clients,
      marketSize
    }
  }

  getTestsAmount() {
    return this.tests;
  }

  getImprovementsAmount() {
    return this.improvements;
  }

  getTechnologyComplexityModifier() {
    const tests = this.getTestsAmount();
    const improvements = this.getImprovementsAmount();

    logger.shit('here must be technical debt modifier too! getTechnologyComplexityModifier(id)');

    return Math.pow(0.15 * tests + 0.6 * improvements, balance.TECHNOLOGY_COST_MODIFIER);
  }

  getHypeValue() {
    return this.KPI.hype;
  }

  getTechnicalDebtModifier() {
    const improvements = this.getImprovementsAmount();

    return Math.log10(improvements + 10);
    // return Math.pow(balance.TECHNICAL_DEBT_MODIFIER, improvements);
  }

  setProductDefaults(stage, KPI, features, XP) {
    this.stage = stage;
    this.KPI = KPI;
    this.features = features;
    this.XP = XP;
  }

  setCompetitorProductDefaults(stage, XP) {
    this.stage = stage;
    this.XP = XP;
  }

  testHypothesis(p) {
    this.XP += p.value;
    const features = productDescriptions(this.idea).features;

    let max = 0;
    features.forEach(f => {
      max += f.data;
    });

    if (this.XP > max) {
      this.XP = max;
    }

    if (this.tests) {
      this.tests++;
    } else {
      this.tests = 1;
    }
  }

  switchStage(stage) {
    this.stage = stage;
  }

  improveFeature(p) {
    let previous = this.features[p.featureGroup][p.featureName] || 0;
    let sum = previous + p.value;

    const max = p.max;

    this.features[p.featureGroup][p.featureName] = sum > max ? max: sum;
    this.XP -= p.value;

    if (this.improvements) {
      this.improvements++;
    } else {
      this.improvements = 1;
    }
  }

  improveMainFeature(p) {
    const featureId = p.featureId;
    previous = this.features.offer[featureId];

    const sum = previous + p.value;
    const max = p.max;

    this.features.offer[featureId] = sum > max ? max: sum;
    this.XP -= p.value;

    if (this.improvements) {
      this.improvements++;
    } else {
      this.improvements = 1;
    }
  }

  improveFeatureByPoints(p) {
    this.features[p.featureGroup][p.featureName] = 1;
    logger.log('improved feature by points');
  }

  addClients(p) {
// not all users will become our clients. Some of them will vanish
// if you got them from ads, efficiency will be less than 1
    const efficiency = p.efficiency || 1;
    let clients = Math.floor(efficiency * p.clients);

    this.KPI.clients += clients;
    this.KPI.newClients += clients;
  }

  addHype(hype) {
    this.KPI.hype = Math.min(10000, this.KPI.hype + hype);
  }

  addViralClients(p) {
    const clients = p.clients;

    this.KPI.clients += clients;
    this.KPI.newClients = clients;
  }

  removeClients(p) {
    // churn clients
    const clients = p.clients;

    if (this.KPI.clients - clients < 0) {
      this.KPI.clients = 0;
    } else {
      this.KPI.clients -= Math.floor(clients);
    }
  }
}
