export default {
  description: 'Веб хостинг. Позволяет клиентам создавать сайты не заботясь об инфраструктуре',
  features: [
    { name: 'scalability', influence: 0, description: '', shortDescription: 'Масштабируемость', data: 5000, time: 20 },
    { name: 'website', influence: 1.5, description: '', shortDescription: 'Веб-сайт', data: 15000, time: 30 },
    { name: 'admin-panel', influence: 1, description: '', shortDescription: 'Админка', data: 5000, time: 30 },
    { name: 'reliability', influence: 6, description: '', shortDescription: 'Надёжность', data: 5000, time: 30 },
    { name: 'support', influence: 1.5, description: '', shortDescription: 'Техподдержка', data: 5000, time: 30 },
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
    mp: 100,
    pp: 50
  },
  segments: [
    {
      name: 'solo developer',
      percentage: 65,
      price: 8,
      rating: [0, 1.5, 1, 6, 1.5],
      requirements: [0, 0, 0, 0, 0]
    },
    {
      name: 'small startups',
      percentage: 20,
      price: 50,
      rating: [0, 1.5, 1, 6, 1.5],
      requirements: [0, 0, 0, 0, 0]
    },
    {
      name: 'mid business',
      percentage: 250,
      price: 50,
      rating: [0.5, 0.5, 1, 7, 1],
      requirements: [75, 0, 0, 9, 0]
    }
  ]
};

