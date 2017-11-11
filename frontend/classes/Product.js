import productDescriptions from '../helpers/products/product-descriptions';
import random from '../helpers/math/random';

import logger from '../helpers/logger/logger';

import { DefaultDescription } from '../constants/products/types/product-description';

import * as balance from '../constants/balance';
import * as BONUSES from '../constants/bonuses';
import * as MANAGEMENT_STYLES from '../constants/company-styles';

import companyCostComputer from '../helpers/products/compute-company-cost';


const names = [
  'Alpha', 'Proxima', 'Sun', 'Magenta', 'Grapes',
  'Best Hosting', 'Tech Labs', 'Ginger bird', 'Mercury', 'Phantom',
  'Modern', 'Future Labs', 'Pineaple', 'Storm Technologies',
  'Unnamed'
];



export default class Product {
  constructor(data, createFromObject) {
    // if (createFromObject) {
    //   this.companyId = data.companyId;
    //   this.features = data.features;
    //   this.featuresOnCreate = data.featuresOnCreate;
    //   this.idea = data.idea;
    //   this.name = data.name;
    //
    //   this.XP = data.XP;
    //
    //   this.bonuses = data.bonuses;
    //
    //   this.tests = data.tests;
    //   this.improvements = data.improvements;
    //
    //   this.owner = data.owner;
    //   this.style = data.style;
    //
    //   this._points = data._points;
    //   this._money = data._money;
    //
    //   return this;
    // }
  }

  createCompany(data): Product {
    let { idea, name, isCompetitor, companyId } = data;
    // logger.log('product constructor', data);

    if (!idea) throw 'no idea in classes/Product.js';

    if (companyId === null || companyId === undefined) throw 'no companyId in classes/Product.js';

    const defaultFeatures = productDescriptions(idea).features;

    if (!name) {
      const index = Math.floor(random(0, names.length - 1));

      name = names[index];
    }

    let minRating = 1;
    let maxRating = 6;

    if (isCompetitor) {
      minRating = 4;
      maxRating = 8;
    }

    const offer = defaultFeatures.map((f, i) => Math.floor(random(minRating, maxRating)));

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

    this.companyId = companyId;
    this.features = features;
    this.featuresOnCreate = Object.assign({}, features);
    this.idea = idea;
    this.name = name;

    this.bonuses = 1;

    this._points = { programming: 4500, marketing: 500 };
    this._money = 45000;


    this.XP = 10;

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

    return this;
  }

  loadFromObject(obj) {
    for (let index in obj) {
      this[index] = obj[index];
    }

    return this;
  }

  isOurProduct() {
    return this.owner;
  }

  getIdea() {
    return this.idea;
  }

  getName() {
    return this.name;
  }

  getStage() {
    return this.stage;
  }

  getXP() {
    return this.XP;
  }

  getTestsAmount() {
    return this.tests;
  }

  getImprovementsAmount() {
    return this.improvements;
  }


  getPaymentModifier() {
    return 1;
  }

  getProductExpenses() {
    return this.getProductSupportCost();
  }


  getFeatures(featureGroup) {
    return this.features[featureGroup];
  }

  getMainFeatureQualityByFeatureId(featureId) {
    return this.features.offer[featureId];
  }

  getMarketingFeatures() {
    return this.features.marketing;
  }

  getFeatureStatus(featureGroup, featureName) {
    return this.features[featureGroup][featureName] > 0;
  }

  picked = (value) => {
    return this.features.bonuses[value]
  };

  getCompanyCost() {
    return companyCostComputer.compute(this);
  }

  getCompanyCostStructured() {
    return companyCostComputer.structured(this);
  }

  getDefaults(): DefaultDescription {
    return productDescriptions(this.idea);
  }

  getMainFeatures() {
    return this.getDefaults().features;
  }

  getPrettyFeatureNameByFeatureId(featureId){
    return this.getDefaults().features[featureId].shortDescription;
  }

  getMaxMainFeatureQuality(featureId) {
    return this.getDefaults().features[featureId].data;
  }

  getBaseFeatureDevelopmentCost(featureId) {
    return this.getDefaults().features[featureId].development;
  }

  isShareableFeature(featureId) {
    return this.getDefaults().features[featureId].shareable;
  }

  getDescriptionOfProduct() {
    return this.getDefaults().description;
  }

  getProductSupportCost() {
    const base = this.getDefaults().support.pp;

    const modifier = Math.pow(this.getImprovementsAmount(), balance.SUPPORT_COST_MODIFIER);

    return Math.ceil(base * modifier);
  }


  getSpecificFeatureDevelopmentCostModifier(featureId) {
    let value = 0;

    if (this.picked(`lowerDevelopmentCostOfFeature${featureId}`)) {
      value = 50;
    }

    return value;
  }

  getAvailableBonuses(): Array {
    const list = this.getBonusesList();

    const newList = [];

    const checkBonus = (b) => {
      if (this.picked(b.name)) {
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

  getHypothesisAnalyticsFeatures() {
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

  getPaymentFeatures() {
    const up = points => points;

    return [
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
    return {
      middle: 5
    }
  }




  // modify
  switchStage(stage) {
    this.stage = stage;
  }

  setProductDefaults(stage, features, XP) {
    throw 'setProductDefaults';
    this.stage = stage;
    this.features = features;
    this.XP = XP;
  }

  testHypothesis(p) {
    this.XP += p.value;

    if (this.tests) {
      this.tests++;
    } else {
      this.tests = 1;
    }
  }

  decreaseXP(xp) {
    logger.log('decreaseXP', xp, this.XP);
    this.XP -= xp;
    logger.log('decreaseXP', 'now', this.XP);
  }

  improveFeature(p) {
    let previous = this.features[p.featureGroup][p.featureName] || 0;

    this.features[p.featureGroup][p.featureName] = previous + p.value;

    if (this.improvements) {
      this.improvements++;
    } else {
      this.improvements = 1;
    }

    this.XP -= p.XP;
  }

  improveFeatureByPoints(p) {
    this.features[p.featureGroup][p.featureName] = 1;

    if (p.featureGroup === 'bonuses') {
      this.bonuses--;
    }
  }
}
