const AD_TG_POST = 0;
const AD_OWN_BLOG = 1;
const AD_SOCIAL_NETWORK = 2;
const AD_TARGETING = 3;
const AD_SEO = 4;

const tgPost = {
  id: AD_TG_POST,
  name: 'Пост в телеграме',
  cost: { money: 0, mp: 2 },
  hype: 5,
  openedOn: 0
};

const ownBlogPost = {
  id: AD_OWN_BLOG,
  name: 'Пост в собственном блоге',
  cost: { money: 0, mp: 2 },
  hype: 11,
  openedOn: 10
};

const socialNetworks = {
  id: AD_SOCIAL_NETWORK,
  name: 'Пост в соцсетях',
  cost: { money: 50, mp: 3 },
  hype: 22,
  openedOn: 30
};

const targeting = {
  id: AD_TARGETING,
  name: 'Таргетинг в соцсетях',
  cost: { money: 150, mp: 4 },
  hype: 50,
  openedOn: 30
};

const SEO = {
  id: AD_SEO,
  name: 'SEO-траффик',
  cost: { money: 150, mp: 4 },
  hype: 50,
  openedOn: 30
};

const SEGMENT_PROGRAMMER = 'Программисты';
const SEGMENT_STARTUP = 'Стартапы';
const SEGMENT_SMALL_BUSINESS = 'Малый бизнес';
const SEGMENT_CORPORATIONS = 'Корпорации';

export default {
  description: 'Веб хостинг. Позволяет клиентам создавать сайты не заботясь об инфраструктуре',
  resources: {
    
  },
  features: [
    {
      name: 'VPS',
      description: '',
      shortDescription: 'Виртуальная машина',
      shareable: true,
      development: 75,
      id: 0
    },
    {
      name: 'website',
      description: '',
      shortDescription: 'Веб-сайт',
      development: 30,
      id: 1
    },
    {
      name: 'support',
      description: '',
      shortDescription: 'Техподдержка',
      development: 100,
      id: 2
    },
    {
      name: 'VDS',
      description: '',
      shortDescription: 'Выделенный сервер',
      shareable: true,
      development: 135,
      id: 3
    },
    {
      name: 'scalability',
      description: '',
      shortDescription: 'Масштабируемость',
      development: 70,
      id: 4
    }
  ],
  ads: [
    tgPost,
    ownBlogPost,
    socialNetworks,
    targeting
  ],
  markets: [
    {
      id: 0,
      clientType: SEGMENT_PROGRAMMER,
      rating: [6, 2.5, 1.5, 0, 0],
      explorationCost: 0,
      price: 5,
      clients: 38000
    },
    {
      id: 1,
      clientType: SEGMENT_STARTUP,
      rating: [6.5, 1.5, 1.5, 0.5, 0],
      explorationCost: 50,
      price: 15,
      clients: 10000
    },
    {
      id: 2,
      clientType: SEGMENT_SMALL_BUSINESS,
      rating: [0, 1.5, 1, 7, 0.5],
      explorationCost: 100,
      price: 100,
      clients: 1000
    },
    {
      id: 3,
      rating: [0, 0, 3, 5, 2],
      clientType: SEGMENT_CORPORATIONS,
      explorationCost: 150,
      price: 1500,
      clients: 500
    }
  ]
};
