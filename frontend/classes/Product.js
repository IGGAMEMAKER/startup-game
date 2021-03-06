import productDescriptions from '../helpers/products/product-descriptions';
import random from '../helpers/math/random';

import logger from '../helpers/logger/logger';

import percentify from '../helpers/math/percentify';

import computeRating from '../helpers/products/compute-rating';

import { DefaultDescription } from '../constants/products/types/product-description';


import companyCostComputer from '../helpers/products/compute-company-cost';

import * as balance from '../constants/balance';

import round from '../helpers/math/round';


import * as BONUSES from '../constants/bonuses';
import * as MANAGEMENT_STYLES from '../constants/company-styles';

const names = [
  'Alpha-Centaura', 'Sun', 'Magenta', 'Grapes',
  'Best Hosting', 'Tech Labs', 'Gingerbeard', 'Mercury', 'Phantom',
  'Modern', 'Future Labs', 'Pineaple', 'Storm Technologies', '',
  'Unnamed'
];

export default class Product {
  constructor(data, createFromObject) {
    if (createFromObject) {
      this.features = data.features;
      this.featuresOnCreate = data.featuresOnCreate;
      this.KPI = data.KPI;
      this.idea = data.idea;
      this.name = data.name;

      this.XP = data.XP;

      this.bonuses = data.bonuses;

      this.tests = data.tests;
      this.improvements = data.improvements;

      this.owner = data.owner;
      this.style = data.style;

      this.defaultFeatures = data.defaultFeatures;

      this._points = data._points;
      this._money = data._money;

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

    const clients = 200;

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

    this.bonuses = 1;

    this._points = { programming: 4500, marketing: 500 };
    this._money = 45000;


    this.XP = 1900;

    this.tests = 1;
    this.improvements = 1;

    this.owner = !isCompetitor;

    let styleFactor = random(0, 1);
    if (styleFactor < 0.6) {
      this.style = MANAGEMENT_STYLES.COMPANY_STYLE_FEATURE_ORIENTED;
    } else {
      this.style = MANAGEMENT_STYLES.COMPANY_STYLE_BALANCED;
    }

    if (!isCompetitor) this.style = MANAGEMENT_STYLES.COMPANY_STYLE_BALANCED;

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

  static getRating(p: Product, features, marketId, improvement = null) {
    if (!marketId) marketId = 0;

    const maxValues = p.defaultFeatures;
    const marketInfluences = p.getMarketInfoById(marketId).rating;

    if (improvement) {
      features[improvement.featureId] += 1000;
    }

    return round(computeRating(features, maxValues, marketInfluences));
  }

  getMainFeatureQualityByFeatureId(featureId) {
    return this.features.offer[featureId];
  }

  getPrettyFeatureNameByFeatureId(featureId){
    return this.getDefaults().features[featureId].shortDescription;
  }

  getMaxMainFeatureQuality(featureId) {
    return this.getDefaults().features[featureId].data;
  }

  getDefaults(): DefaultDescription {
    return productDescriptions(this.idea);
  }

  getPaymentModifier() {
    return 1;
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

    // if (payments.mockBuying) {
    //   return 1;
    // }

    return 0.1;
  }

  getFeatures(featureGroup) {
    return this.features[featureGroup];
  }

  getIdea() {
    return this.idea;
  }

  getMarketingFeatures() {
    return this.features.marketing;
  }

  getSupportPower() {
    const marketing = this.getMarketingFeatures();

    if (marketing.supportIII) return 1;
    if (marketing.supportII)  return 0.5;
    if (marketing.support)    return 0.25;

    return 0;
  }

  getProductExpenses() {
    return 0;
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

  getProgrammingSupportCostModifier() {
    return Math.pow(this.getImprovementsAmount(), balance.SUPPORT_COST_MODIFIER);
  }

  getProgrammingSupportCost() {
    const bonus = 1 - this.getBonusModifiers().programmingSupportCost / 100;

    return Math.ceil(this.getDefaults().support.pp * this.getProgrammingSupportCostModifier() * bonus);
  }

  getBaseSupportCost() {
    return 0;
  }

  getMarketingSupportCost() {
    return this.getBonusModifiers().marketingSupportCost;
  }

  getAvailableBonuses(): Array {
    const list = this.getBonusesList();

    const newList = [];

    const checkBonus = (b) => {
      const isPicked = this.getFeatureStatus('bonuses', b.name);

      if (isPicked) {
        if (b.childs) {
          b.childs.forEach(checkBonus);
        }

        return;
      }

      newList.push(b);
    };

    list.forEach(checkBonus);

    return newList;
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
    // const amountOfFeatures = this.defaultFeatures.length;

    // for (let i = 0; i < amountOfFeatures; i++) {
    //   let featureName = this.getDefaults().features[i].shortDescription;
    //
    //   array.push({
    //     name: `lowerDevelopmentCostOfFeature${i}`,
    //     type: 'lowerDevelopmentCostOfFeature',
    //     featureId: i,
    //     title: `Наша сила в технологии "${featureName}"`,
    //     bonus: `Снижение стоимости улучшения технологии "${featureName}" на 50%`,
    //     description: `Как известно, ключ всех побед состоит в правильной
    //     фокусировке на чём-то одном. В нашем случае, это технология "${featureName}".
    //     У нас есть все шансы стать лидерами в этой технологии и сдавать её в аренду другим компаниям`,
    //   })
    // }

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
        description: 'Регулярное ведение блога снижает отток клиентов на 3%' +
        ' и на 25% повышает скачок известности, в случае лидерства в технологии',
        points: { marketing: 25 },
        support: { marketing: 25 }
      },
      {
        name: 'support', shortDescription: 'Техподдержка',
        description: 'Техподдержка снижает отток клиентов на 8%',
        points: { marketing: 50, programming: 100 },
        support: { marketing: 35 }
      },
      {
        name: 'blogII', shortDescription: 'Улучшенный блог проекта',
        description: 'Регулярное ведение блога снижает отток клиентов на 3%' +
        ' и на 25% повышает скачок известности, в случае лидерства в технологии',
        points: { marketing: 150 },
        support: { marketing: 75 }
      },
      {
        name: 'supportII', shortDescription: 'Улучшенная техподдержка',
        description: 'Техподдержка снижает отток клиентов на 8%',
        points: { marketing: 50, programming: 100 },
        support: { marketing: 50 }
      },
      {
        name: 'email', shortDescription: 'Рассылка электронной почты',
        description: 'Рассылка электронной почти снижает отток клиентов на 5%',
        points: { marketing: 50, programming: 100 },
        support: { programming: 20 }
      },
      {
        name: 'blogIII', shortDescription: 'Улучшенный блог проекта II',
        description: 'Регулярное ведение блога снижает отток клиентов на 6%' +
        ' и на 50% повышает скачок известности, в случае лидерства в технологии',
        points: { marketing: 250 },
        support: { marketing: 250 }
      },
      {
        name: 'supportIII', shortDescription: 'Улучшенная техподдержка II',
        description: 'Техподдержка снижает отток клиентов на 16%',
        points: { marketing: 50, programming: 100 },
        support: { marketing: 75 }
      },
      {
        name: 'emailII', shortDescription: 'Улучшенная рассылка электронной почты',
        description: 'Рассылка электронной почти снижает отток клиентов на 5%',
        points: { marketing: 150, programming: 100 },
        support: { programming: 70 }
      },
      {
        name: 'emailIII', shortDescription: 'Улучшенная рассылка электронной почты II',
        description: 'Рассылка электронной почти снижает отток клиентов на 10%',
        points: { marketing: 150, programming: 100 },
        support: { programming: 95 }
      }
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

  getPaymentFeatures(idea) {
    const up = points => points; // Math.ceil(points * technicalDebtModifier);

    return [
      // {
      //   name: 'mockBuying', shortDescription: 'Тестовая покупка',
      //   description: 'Позволяет узнать платёжеспособность клиентов. Вы не извлекаете никаких доходов с продукта',
      //   points: { programming: up(50), marketing: 0 }
      // },
      {
        name: 'basicPricing', shortDescription: 'Единый тарифный план I',
        description: 'Единая цена для всех клиентов. Наши доходы возрастают на 15%',
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

  getImprovementChances() {
    const analytics = this.features.analytics;

    const picked = word => analytics[word];

    const feedback = analytics.feedback;
    const webvisor = analytics.webvisor;
    const segmenting = analytics.segmenting;


    const basicBonus = 100;

    let bonuses = basicBonus;

    this.getHypothesisAnalyticsFeatures()
      .forEach((f) => {
        if (picked(f.name)) bonuses += f.bonus || 0;
      });

    let maxXP = bonuses;

    return {
      middle: maxXP,
      maxXPWithoutBonuses: maxXP,

      hasWebvisor: webvisor,
      hasFeedback: feedback,
      hasSegmenting: segmenting
    }
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

  getMarkets() {
    return this.getDefaults().markets;
  }

  getMarketByMarketId(marketId) {
    return this.getMarkets()[marketId];
  }

  getMarketInfoById(marketId) {
    return this.getMarkets()[marketId];
  }

  getDescriptionOfProduct() {
    return this.getDefaults().description;
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

    this.features[p.featureGroup][p.featureName] = previous + p.value;

    if (this.improvements) {
      this.improvements++;
    } else {
      this.improvements = 1;
    }
  }

  improveFeatureByPoints(p) {
    this.features[p.featureGroup][p.featureName] = 1;

    if (p.featureGroup === 'bonuses') {
      this.bonuses--;
    }
  }
}
