import productDescriptions from '../helpers/products/product-descriptions';
import random from '../helpers/math/random';

import logger from '../helpers/logger/logger';

import percentify from '../helpers/math/percentify';

import computeRating from '../helpers/products/compute-rating';

import companyCostComputer from '../helpers/products/compute-company-cost';

import * as balance from '../constants/balance';

import round from '../helpers/math/round';

const names = ['Alpha-Centaura', 'Sun', 'Magenta', 'Grapes',
  'Best Hosting', 'Tech-Labs', 'Gingerbeard', 'Mercury', 'Phantom', 'Modern', 'Unnamed'];

import * as BONUSES from '../constants/bonuses';

export default class Product {
  constructor(data, createFromObject) {
    if (createFromObject) {
      this.features = data.features;
      this.featuresOnCreate = data.featuresOnCreate;
      this.KPI = data.KPI;
      this.idea = data.idea;
      this.name = data.name;

      this.XP = data.XP;

      this.tests = data.tests;
      this.improvements = data.improvements;

      this.owner = data.owner;

      this.defaultFeatures = data.defaultFeatures;

      // this.rentedFeatures = data.rentedFeatures;

      return;
    }

    let { idea, name, isCompetitor, defaultFeatures } = data;

    if (!idea) throw 'no idea in classes/Product.js';

    if (!name) {
      const index = Math.floor(random(0, names.length - 1));
      name = names[index];
    }

    const defaults = productDescriptions(idea);

    // logger.log('new Product constructor', defaultFeatures);
    // const defaultFeatures = defaults.features;

    if (!defaultFeatures) {
      logger.error(idea, name, isCompetitor);
      throw 'no default features!!!';
    }

    let maxRating = 6;
    if (isCompetitor) {
      maxRating = 8;
    }

    const luck = random(1, maxRating) / 10; // luck in 0.1-0.6

    const offer = defaultFeatures.map((f, i) => Math.floor(luck * f));

    const features = {
      offer, // features, that are attached to main idea
      development: {}, // backups, more dev servers, e.t.c.

      marketing: {}, // SEO, SMM, mass media, email marketing e.t.c.
      analytics: {}, // simple analytics (main KPIs),
      // middle (segments analytics), mid+ (segments + versions),

      // not only chat with users, but also localisations, content updates
      // and all sort of things, that you need doing constantly
      support: {},
      payment: {},

      bonuses: {}
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
    this.featuresOnCreate = Object.assign({}, features);
    this.KPI = KPI;
    this.idea = idea;
    this.name = name;

    this.XP = 1900;

    this.tests = 1;
    this.improvements = 1;

    this.owner = !isCompetitor;

    this.defaultFeatures = defaultFeatures;
    // this.rentedFeatures = [].fill(null, defaultFeatures.length); //
  }

  setMainFeatureDefaults(upgradedDefaults) {
    this.defaultFeatures = upgradedDefaults;
  }

  isOurProduct() {
    return this.owner;
  }

  getCompanyCost() {
    return companyCostComputer.compute(this);
  }

  getCompanyCostStructured() {
    return companyCostComputer.structured(this);
  }

  static getRating(p: Product, features, segmentId) {
    if (!segmentId) segmentId = 0;

    const maxValues = p.defaultFeatures;
    const segmentalInfluences = p.getSegmentById(segmentId).rating;


    return round(computeRating(features, maxValues, segmentalInfluences));
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

  getSegmentedPriorities(segId) {
    const segment = this.getSegmentBySegmentId(segId);
    const features = this.getDefaults().features;

    return segment.rating.map((r, index) => {
      return {
        rating: r,
        feature: features[index].shortDescription
      }
    }).sort((s1, s2) => s2.rating - s1.rating);
  }

  getNewClients() {
    return this.KPI.newClients;
  }

  getMainFeatureQualityByFeatureId(featureId) {
    const value = this.features.offer[featureId];

    return value; // round(value / feature.data);
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

  getIdea() {
    return this.idea;
  }

  getMarketingFeatures() {
    return this.features.marketing;
  }

  getBlogPower() {
    return this.getBlogStatusStructured().power;
  }

  getBlogHypeModifier() {
    return this.getBlogPower();
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

  static getChurnRate(rating, p: Product) {
    // return answer in partitions 0-1

    if (rating < 3) {
      rating = 3;
    }

    const ratingModifier = Math.min(Math.pow(12 - rating, 3.65), 100);

    const blog = p.getBlogPower();
    const emails = p.getEmailPower();
    const support = p.getSupportPower();
    const k = 0.6; // поправочный коэффициент

    const marketingModifier = 1 - 0.15 * blog + 0.25 * emails + 0.4 * support; // max total sum = 1

    // 15: r7
    // bad 10-15+
    // good 1-5
    const churn = ratingModifier * marketingModifier / 100;

    return {
      raw: churn, // 0 - 1
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
    const bonus = 1 - this.getBonusModifiers().programmingSupportCost / 100;

    return Math.ceil(this.getDefaults().support.pp * this.getProgrammingSupportCostModifier() * bonus);
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

    const bonus = 1 - this.getBonusModifiers().marketingSupportCost / 100;

    const flatCost = this.getBaseSupportCost() + supportSupportCost + this.getBlogStatusStructured().supportCost;

    return Math.ceil(flatCost * bonus);
  }

  getBonusesList(): Array {
    const chain = (root, childs) => {
      root.childs = childs;
    };

    const programmerPerformanceBonus = {
      name: BONUSES.BONUSES_PROGRAMMER_PERFORMANCE_MODIFIER,
      title: 'Улучшение производительности программистов',
      bonus: '+15% PP ежемесячно',
      value: 1.15,
      description: 'Мы стали лучше понимать, как организовать работу команды программистов',
      costDescription: '500PP',
    };

    const programmerPerformanceBonusII = {
      name: BONUSES.BONUSES_PROGRAMMER_PERFORMANCE_MODIFIER_II,
      title: 'Улучшение производительности программистов II',
      bonus: '+25% PP ежемесячно',
      value: 1.4,
      description: 'Мы накопили солидный опыт решения технических задач. Новые задачи не кажутся такими уж сложными',
      costDescription: '1500PP',
    };

    chain(programmerPerformanceBonus, [programmerPerformanceBonusII]);

    const marketerPerformanceBonus = {
      name: BONUSES.BONUSES_MARKETER_PERFORMANCE_MODIFIER,
      title: 'Улучшение производительности маркетологов',
      bonus: '+15% MP ежемесячно',
      description: 'Мы стали лучше понимать, как организовать работу команды маркетологов',
      costDescription: '500MP',
    };

    const marketerPerformanceBonusII = {
      name: BONUSES.BONUSES_MARKETER_PERFORMANCE_MODIFIER_II,
      title: 'Улучшение производительности маркетологов II',
      bonus: '+25% MP ежемесячно',
      description: 'Мы провели кучу рекламных кампаний и хорошо знаем, что нужно нашим клиентам',
      costDescription: '1500MP',
    };

    const programmingSupportCostBonus = {
      name: BONUSES.BONUSES_PROGRAMMER_SUPPORT_COST_MODIFIER,
      title: 'Снижение программистских затрат на поддержку',
      bonus: '-30% ежемесячно',
      description: 'Благодаря принятым стандартам разработки, наши программисты автоматизируют всё,' +
      ' что только возможно, что приводит к снижению стоимости поддержки',
      costDescription: 'бесплатно',
    };

    const marketingSupportCostBonus = {
      name: BONUSES.BONUSES_MARKETER_SUPPORT_COST_MODIFIER,
      title: 'Снижение маркетинговых затрат на поддержку',
      bonus: '-30% ежемесячно',
      description: 'Наши маркетологи стали лучше понимать нашу аудиторию и им проще работать с нашими клиентами,' +
      ' что приводит к снижению стоимости поддержки',
      costDescription: 'бесплатно',
    };

    chain(marketerPerformanceBonus, [marketerPerformanceBonusII]);


    const techBreakthroughBonus = {
      name: BONUSES.BONUSES_TECHNOLOGY_LEADER_MODIFIER,
      title: 'Наше кредо: быть первыми во всём!',
      bonus: '-80% к штрафу за технологический прорыв',
      description: 'Культивируя тягу к инновациям и лояльно относясь к экспериментам, ' +
      'нашей команде стало проще задавать тренды',
      costDescription: 'бесплатно',
    };

    const followerBonus = {
      name: BONUSES.BONUSES_TECHNOLOGY_FOLLOWER_MODIFIER,
      title: 'Великие художники копируют, гениальные - воруют',
      bonus: '-15% к штрафу при технологическом отставании. +150% к штрафу за технологический прорыв',
      description: 'Наша команда не считает зазорным подглядывать за конкурентами;' +
      ' мы копируем лучшие решения одними из первых, но сами не способны придумать что-либо новое',
      costDescription: 'бесплатно',
    };

    const array = [
      programmerPerformanceBonus,
      marketerPerformanceBonus,

      programmingSupportCostBonus,
      marketingSupportCostBonus,

      techBreakthroughBonus,
      followerBonus
    ];

    // lowerDevelopmentCostOfFeature
    const amountOfFeatures = this.defaultFeatures.length;

    for (let i = 0; i < amountOfFeatures; i++) {
      let featureName = this.getDefaults().features[i].shortDescription;

      array.push({
        name: `lowerDevelopmentCostOfFeature${i}`,
        title: `Наша сила в технологии "${featureName}"`,
        bonus: `Снижение стоимости улучшения технологии "${featureName}" на 50%`,
        description: `Как известно, ключ всех побед состоит в правильной 
        фокусировке на чём-то одном. В нашем случае, это технология "${featureName}". 
        У нас есть все шансы стать лидерами в этой технологии и сдавать её в аренду другим компаниям`,
      })
    }

    // improvedPaymentsOfSegment
    const amountOfSegments = this.getSegments().length;

    for (let i = 0; i < amountOfSegments; i++) {
      let segmentName = this.getSegmentBySegmentId(i).userOrientedName;

      array.push({
        name: `improvedPaymentsOfSegment${i}`,
        title: `Наша главные клиенты: "${segmentName}"`,
        bonus: `Доход от группы "${segmentName}" увеличивается в 1.5 раза`,
        description: `Мы, как никто другие, понимаем, что именно нужно нашим 
        главным клиентам. ${segmentName} точно знают, что мы их не подведём.`,
      })
    }

    return array
  }

  picked = (value) => {
    return this.features.bonuses[value]
  };

  getBonusModifiers() {
    // write all values in percents!!!

    const picked = this.picked;

    let programmingEfficiency = 0;
    if (picked(BONUSES.BONUSES_PROGRAMMER_PERFORMANCE_MODIFIER)) programmingEfficiency = 15;
    if (picked(BONUSES.BONUSES_PROGRAMMER_PERFORMANCE_MODIFIER_II)) programmingEfficiency = 40;

    let marketingEfficiency = 0;
    if (picked(BONUSES.BONUSES_MARKETER_PERFORMANCE_MODIFIER)) marketingEfficiency = 15;
    if (picked(BONUSES.BONUSES_MARKETER_PERFORMANCE_MODIFIER_II)) marketingEfficiency = 40;

    let programmingSupportCost = 0;
    if (picked(BONUSES.BONUSES_PROGRAMMER_SUPPORT_COST_MODIFIER)) programmingSupportCost = 30;

    let marketingSupportCost = 0;
    if (picked(BONUSES.BONUSES_MARKETER_SUPPORT_COST_MODIFIER)) marketingSupportCost = 30;

    let techBreakthroughDiscount = 0;
    if (picked(BONUSES.BONUSES_TECHNOLOGY_LEADER_MODIFIER)) techBreakthroughDiscount = 80;
    if (picked(BONUSES.BONUSES_TECHNOLOGY_FOLLOWER_MODIFIER)) techBreakthroughDiscount = -150;

    let followerDiscount = 0;
    if (picked(BONUSES.BONUSES_TECHNOLOGY_FOLLOWER_MODIFIER)) followerDiscount = 15;

    return {
      programmingEfficiency,
      marketingEfficiency,

      programmingSupportCost,
      marketingSupportCost,

      techBreakthroughDiscount,
      followerDiscount
    };
  }

  getSegmentPaymentBonus(segmentId) {
    let value = 0;

    if (this.picked(`improvedPaymentsOfSegment${segmentId}`)) {
      value = 50;
    }

    return value;
  }

  getSpecificFeatureDevelopmentCostModifier(featureId) {
    let value = 0;

    if (this.picked(`lowerDevelopmentCostOfFeature${featureId}`)) {
      value = 50;
    }

    return value;
  }

  getMarketingFeatureList() {
    return [
      {
        name: 'blog', shortDescription: 'Блог проекта',
        description: 'Регулярное ведение блога снижает отток клиентов на 10%' +
        'и на 25% повышает скачок известности, в случае лидерства в технологии',
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
        description: 'Регулярное ведение блога снижает отток клиентов на 10%' +
        'и на 25% повышает скачок известности, в случае лидерства в технологии',
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
        description: 'Регулярное ведение блога снижает отток клиентов на 10%' +
        'и на 50% повышает скачок известности, в случае лидерства в технологии',
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

    let bonuses = basicBonus;

    this.getHypothesisAnalyticsFeatures()
      .forEach((f) => {
        if (picked(f.name)) bonuses += f.bonus || 0;
      });

    let maxXP = bonuses;

    // maxXP *= clientModifier.modifier;

    return {
      middle: maxXP,
      maxXPWithoutBonuses: maxXP,

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

  getTechBreakthroughModifierForHype() {
    return Math.ceil(Math.pow(this.getClients(), 0.5) * this.getBlogPower());
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

  getNumberOfTechnologiesWhereWeMadeBreakthrough() {
    return this.defaultFeatures
      .filter((f, i) => this.getMainFeatureQualityByFeatureId(i) === f).length;
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

    this.features[p.featureGroup][p.featureName] = sum; // > max ? max : sum;

    if (sum > max) {
      logger.shit('need game message, that we became tech leaders! classes/product.js');
    }

    // this.XP -= p.value;

    if (this.improvements) {
      this.improvements++;
    } else {
      this.improvements = 1;
    }
  }

  improveFeatureByPoints(p) {
    this.features[p.featureGroup][p.featureName] = 1;
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
    const max = productDescriptions(this.idea).marketSize * 10;

    this.KPI.hype = Math.min(max, this.KPI.hype + hype);
  }

  loseMonthlyHype(value = -100) {
    this.KPI.hype += value;

    logger.shit('made shitty code here. There was a bug, when on hype = 0 client calculations fail for all users');
    if (this.KPI.hype === 0) this.KPI.hype = 1;
  }

  removeClients(p) {
    // churn clients
    const clients = p.clients;

    if (this.KPI.clients - clients < 0) {
      this.KPI.clients = 0;
    } else {
      this.KPI.clients -= clients;
    }
  }
}

