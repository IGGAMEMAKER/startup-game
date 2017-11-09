export default {
  compute: () => {
    const SEGMENT_PROGRAMMER = 'Программисты';
    const SEGMENT_STARTUPS = 'Стартапы';
    const SEGMENT_SMALL_BUSINESS = 'Малый бизнес';
    const SEGMENT_CORPORATIONS = 'Корпорации';

    return {
      description: 'Веб хостинг. Позволяет клиентам создавать сайты не заботясь об инфраструктуре',
      features: [
        {
          name: 'scalability',
          influence: 0,
          description: '',
          shortDescription: 'Масштабируемость',
          time: 20,
          development: 70,
          id: 0
        },
        {
          name: 'website',
          influence: 1.5,
          description: '',
          shortDescription: 'Веб-сайт',
          time: 30,
          development: 30,
          id: 1
        },
        {
          name: 'support',
          influence: 1.5,
          description: '',
          shortDescription: 'Техподдержка',
          time: 30,
          development: 100,
          id: 2
        },
        {
          name: 'VPS',
          influence: 3,
          description: '',
          shortDescription: 'Виртуальная машина',
          time: 30,
          shareable: true,
          development: 75,
          id: 3
        },
        {
          name: 'VDS',
          influence: 0,
          description: '',
          shortDescription: 'Выделенный сервер',
          time: 30,
          shareable: true,
          development: 135,
          id: 4
        }
      ],
      utility: 10, // 0 - useless, 100 - more useful, than water in Africa or tablet for AIDs. Influences churn rate and payments
      virality: 0.3, // virality multiplier. 1-2.5 (2.5 - social-network or some cool games)
      price: 10,
      CAC: 1, // customer acquisition cost
      marketSize: 100000,
      mvp: {
        pp: 100,
        mp: 100
      },
      hypothesis: {
        mp: 0,
        pp: 70
      },
      support: {
        pp: 40
      },
      markets: [
        {
          id: 0,
          userOrientedName: 'Программисты. Прототип',
          clients: 9000,
          price: 4,
          rating: [0, 2.5, 1.5, 6, 0],
          maxHype: 1000,
          baseHypeIncrease: 10,
          explorationCost: 0,
          xp: 3
        },
        {
          id: 1,
          userOrientedName: 'Стартапы. Прототип',
          clients: 700,
          price: 25,
          rating: [0, 1.5, 1.5, 6.5, 0.5],
          maxHype: 1000,
          baseHypeIncrease: 10,
          explorationCost: 20,
          xp: 1
        },
        {
          id: 2,
          userOrientedName: 'Малый бизнес. Прототип',
          clients: 300,
          price: 75,
          rating: [0.5, 1.5, 1, 0, 7],
          maxHype: 1000,
          baseHypeIncrease: 10,
          explorationCost: 30,
          xp: 1
        },
        {
          id: 3,
          userOrientedName: 'Программисты',
          clients: 9000,
          price: 4,
          rating: [0, 2.5, 1.5, 6, 0],
          maxHype: 1000,
          baseHypeIncrease: 10,
          explorationCost: 40,
          xp: 0.5
        },
        {
          id: 4,
          userOrientedName: 'Стартапы. Прототип',
          clients: 700,
          price: 25,
          rating: [0, 1.5, 1.5, 6.5, 0.5],
          maxHype: 1000,
          baseHypeIncrease: 10,
          explorationCost: 45,
          xp: 0.5
        },
        {
          id: 5,
          userOrientedName: 'Малый бизнес',
          clients: 3000,
          price: 150,
          rating: [0.5, 1.5, 1, 0, 7],
          maxHype: 1000,
          baseHypeIncrease: 10,
          explorationCost: 55,
          xp: 0.5
        }
      ]
    }
  }
};
