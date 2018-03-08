export default (): Array => {
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
