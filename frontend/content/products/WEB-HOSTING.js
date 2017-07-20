// import scheduleStore from '../../stores/schedule-store';

const timeModifier = (value) => {
  return value;
};

const marketModifier = () => {
  return 1;
  const day = scheduleStore.getDay();
  const month = Math.ceil(day / 30);

  if (month > 144) {
    return 1;
  } else if (month > 60) {
    return 3.25;
  } else if (month > 45) {
    return 3.7;
  } else if (month > 35) {
    return 3;
  } else if (month > 20) {
    return 2.5;
  } else {
    return 1;
  }
};

const cacModifier = () => {
  return marketModifier()
};

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
          data: timeModifier(5000),
          time: 20,
          development: 70
        },
        {
          name: 'website',
          influence: 1.5,
          description: '',
          shortDescription: 'Веб-сайт',
          data: timeModifier(15000),
          time: 30,
          development: 30
        },
        // { name: 'admin-panel', influence: 1, description: '', shortDescription: 'Админка', data: 5000, time: 30 },
        // { name: 'reliability', influence: 3, description: '', shortDescription: 'Надёжность', data: 5000, time: 30 },
        {
          name: 'support',
          influence: 1.5,
          description: '',
          shortDescription: 'Техподдержка',
          data: timeModifier(5000),
          time: 30,
          development: 100
        },
        {
          name: 'VPS',
          influence: 3,
          description: '',
          shortDescription: 'Виртуальная машина',
          data: timeModifier(7000),
          time: 30,
          shareable: true,
          development: 75
        },
        {
          name: 'VDS',
          influence: 0,
          description: '',
          shortDescription: 'Выделенный сервер',
          data: timeModifier(15000),
          time: 30,
          shareable: true,
          development: 135
        }
      ],
      utility: 10, // 0 - useless, 100 - more useful, than water in Africa or tablet for AIDs. Influences churn rate and payments
      virality: 0.3, // virality multiplier. 1-2.5 (2.5 - social-network or some cool games)
      price: 10,
      CAC: 1 * cacModifier(), // customer acquisition cost
      marketSize: 100000 * marketModifier(),
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
          name: 'solo developer',
          userOrientedName: 'Программисты',
          clients: 90000,
          price: 8,
          rating: [0, 2.5, 1.5, 6, 0],
          requirements: [0, 0, 0, 0, 0],
          marketingBaseCost: 1000,
          marketingActivityBaseCost: 50,
          levelsOfInfluence: 7
        },
        {
          name: 'small startups',
          userOrientedName: 'Стартапы',
          clients: 7000,
          price: 50,
          rating: [0, 1.5, 1.5, 6.5, 0.5],
          requirements: [0, 0, 0, 80, 0],
          marketingBaseCost: 100,
          marketingActivityBaseCost: 50,
          levelsOfInfluence: 7
        },
        {
          name: 'middle business',
          userOrientedName: 'Малый бизнес',
          clients: 3000,
          price: 150,
          rating: [0.5, 1.5, 1, 0, 7],
          requirements: [75, 0, 0, 0, 95],
          marketingBaseCost: 10,
          marketingActivityBaseCost: 50,
          levelsOfInfluence: 7
        }
      ]
    }
  }
};
