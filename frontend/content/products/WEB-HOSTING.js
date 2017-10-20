export default {
  compute: () => {
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
          name: 'solo developer',
          userOrientedName: 'Программисты',
          clients: 90000,
          price: 8,
          rating: [0, 2.5, 1.5, 6, 0],
          // requirements: [0, 0, 0, 0, 0],
          // levels: [1000, 1500, 2250],
          maxHype: 1000,
          baseHypeIncrease: 10,
          explorationCost: 50,
        },
        {
          id: 1,
          name: 'small startups',
          userOrientedName: 'Стартапы',
          clients: 7000,
          price: 50,
          rating: [0, 1.5, 1.5, 6.5, 0.5],
          // requirements: [0, 0, 0, 80, 0],
          // levels: [100, 250, 450],
          maxHype: 1000,
          baseHypeIncrease: 10,
          explorationCost: 150,
        },
        {
          id: 2,
          name: 'middle business',
          userOrientedName: 'Малый бизнес',
          clients: 3000,
          price: 150,
          rating: [0.5, 1.5, 1, 0, 7],
          // requirements: [75, 0, 0, 0, 95],
          // levels: [10, 25, 45],
          maxHype: 1000,
          baseHypeIncrease: 10,
          explorationCost: 250
        }
      ]
    }
  }
};
