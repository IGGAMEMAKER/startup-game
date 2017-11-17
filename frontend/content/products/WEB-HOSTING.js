const tgPost = {
  id: 0,
  name: 'Пост в телеграм канале',
  cost: { money: 0, xp: 1 },
  hype: 5
};

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
          description: '',
          shortDescription: 'Масштабируемость',
          development: 70,
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
          name: 'VPS',
          description: '',
          shortDescription: 'Виртуальная машина',
          shareable: true,
          development: 75,
          id: 3
        },
        {
          name: 'VDS',
          description: '',
          shortDescription: 'Выделенный сервер',
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
          clientType: SEGMENT_PROGRAMMER,
          rating: [0, 2.5, 1.5, 6, 0],
          explorationCost: 0,
          price: 1,
          clients: 38000,
          ads: [
            tgPost
          ],
          levels: [
            {
              userOrientedName: 'Прототип #1',
              maxHype: 1000,
              baseHypeIncrease: 10,
              explorationCost: 0,
              xp: 3
            },
            {
              userOrientedName: 'VK',
              maxHype: 1000,
              explorationCost: 40,
              xp: 0.5
            }
          ]
        },
        {
          id: 1,
          clientType: SEGMENT_STARTUPS,
          rating: [0, 1.5, 1.5, 6.5, 0.5],
          explorationCost: 50,
          price: 1,
          clients: 55000,
          levels: [
            {
              userOrientedName: 'Прототип #2',
              clients: 15000,
              maxHype: 1000,
              baseHypeIncrease: 10,
              explorationCost: 0,
              xp: 1
            },
            {
              userOrientedName: 'FB',
              clients: 55000,
              maxHype: 1000,
              baseHypeIncrease: 10,
              explorationCost: 45,
              xp: 0.5
            }
          ]
        },
        {
          id: 2,
          clientType: SEGMENT_SMALL_BUSINESS,
          rating: [0.5, 1.5, 1, 0, 7],
          explorationCost: 150,
          price: 1,
          clients: 85000,
          levels: [
            {
              userOrientedName: 'Прототип #3',
              clients: 26000,
              maxHype: 1000,
              baseHypeIncrease: 10,
              explorationCost: 30,
              xp: 1
            },
            {
              userOrientedName: 'SEO-траффик',
              clients: 85000,
              maxHype: 1000,
              baseHypeIncrease: 10,
              explorationCost: 55,
              xp: 0.5
            }
          ]
        },
        {
          id: 3,
          rating: [2, 0, 3, 0, 5],
          clientType: SEGMENT_CORPORATIONS,
          explorationCost: 200,
          price: 1500,
          clients: 500,
          levels: [
            {
              userOrientedName: 'SEO-траффик',
              clients: 500,
              maxHype: 1000,
              baseHypeIncrease: 10,
              explorationCost: 0,
              xp: 0.5
            }
          ]
        }
      ]
    }
  }
};
