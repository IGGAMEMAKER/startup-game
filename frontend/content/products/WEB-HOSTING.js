export default {
  description: 'Веб хостинг. Позволяет клиентам создавать сайты не заботясь об инфраструктуре',
  features: [
    { name: 'scalability', influence: 0, description: '', shortDescription: 'Масштабируемость', data: 5000, time: 20 },
    { name: 'website', influence: 1.5, description: '', shortDescription: 'Веб-сайт', data: 15000, time: 30 },
    // { name: 'admin-panel', influence: 1, description: '', shortDescription: 'Админка', data: 5000, time: 30 },
    // { name: 'reliability', influence: 3, description: '', shortDescription: 'Надёжность', data: 5000, time: 30 },
    { name: 'support', influence: 1.5, description: '', shortDescription: 'Техподдержка', data: 5000, time: 30 },
    { name: 'VPS', influence: 3, description: '', shortDescription: 'Виртуальная машина', data: 7000, time: 30 },
    { name: 'VDS', influence: 0, description: '', shortDescription: 'Выделенный сервер', data: 15000, time: 30 },
  ],
  utility: 10, // 0 - useless, 100 - more useful, than water in Africa or tablet for AIDs. Influences churn rate and payments
  virality: 0.3, // virality multiplier. 1-2.5 (2.5 - social-network or some cool games)
  price: 10,
  CAC: 1,
  marketSize: 50000,
  mvp: {
    pp: 300,
    mp: 100
  },
  hypothesis: {
    mp: 60,
    pp: 70
  },
  segments: [
    {
      name: 'solo developer',
      userOrientedName: 'Программисты',
      percentage: 80,
      price: 8,
      rating: [0, 2.5, 1.5, 6, 0],
      requirements: [0, 0, 0, 0, 0]
    },
    {
      name: 'small startups',
      userOrientedName: 'Стартапы',
      percentage: 10,
      price: 50,
      rating: [0, 1.5, 1.5, 6.5, 0.5],
      requirements: [0, 0, 0, 80, 0]
    },
    {
      name: 'middle business',
      userOrientedName: 'Малый бизнес',
      percentage: 5,
      price: 250,
      rating: [0.5, 1.5, 1, 0, 7],
      requirements: [75, 0, 0, 0, 95]
    }
  ]
};

