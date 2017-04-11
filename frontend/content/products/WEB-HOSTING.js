export default {
  description: 'Веб хостинг. Позволяет клиентам создавать сайты не заботясь об инфраструктуре',
  features: [
    { name: 'scalability', influence: 2.5, description: '', shortDescription: 'Масштабируемость', data: 5000, time: 20 },
    { name: 'website', influence: 7.5, description: '', shortDescription: 'Веб-сайт', data: 15000, time: 30 }
  ],
  utility: 10, // 0 - useless, 100 - more useful, than water in Africa or tablet for AIDs. Influences churn rate and payments
  virality: 0.3, // virality multiplier. 1-2.5 (2.5 - social-network or some cool games)
  price: 50,
  CAC: 1,
  marketSize: 50000,
  mvp: {
    pp: 300,
    mp: 100
  },
  hypothesis: {
    mp: 100,
    pp: 50
  }
};

