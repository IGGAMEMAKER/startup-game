export default {
  description: 'Веб студия. Специализируется на разработке веб-сайтов и веб-приложений.',
  features: [
    { name: 'portfolio', influence: 5.5, description: '', time: 30 },
    { name: 'website', influence: 4.5, description: '', time: 14 }
  ],
  utility: 10, // 0 - useless, 100 - more useful, than water in Africa or tablet for AIDs. Influences churn rate and payments
  virality: 0.5, // virality multiplier. 1-2.5 (2.5 - social-network or some cool games)
  price: 1,
  CAC: 0.018,
  marketSize: 1000000,
  mvp: {
    pp: 100,
    mp: 100
  }
};

