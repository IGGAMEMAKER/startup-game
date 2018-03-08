export default () => {
  const up = points => points;

  return [
    {
      name: 'basicPricing', shortDescription: 'Единый тарифный план I',
      description: 'Единая цена для всех клиентов. Наши доходы возрастают на 15%',
      points: { programming: up(150) }
    },
    {
      name: 'basicPricing2', shortDescription: 'Единый тарифный план II',
      description: 'Единая цена для всех. Доходы возрастают на 5% от текущего количества',
      points: { programming: up(50) }
    },
    {
      name: 'basicPricing3', shortDescription: 'Единый тарифный план III',
      description: 'Единая цена для всех. Доходы возрастают ещё на 10%',
      points: { programming: up(50) }
    },
    {
      name: 'segmentedPricing', shortDescription: 'Несколько тарифных планов I',
      description: 'Несколько ценовых сегментов. Наши доходы возрастают ещё на 30%',
      points: { programming: up(250) }
    },
    {
      name: 'segmentedPricing2', shortDescription: 'Несколько тарифных планов II',
      description: 'Несколько ценовых сегментов. Наши доходы возрастают ещё на 15%',
      points: { programming: up(150) }
    },
    {
      name: 'segmentedPricing3', shortDescription: 'Несколько тарифных планов III',
      description: 'Грести деньги лопатами!',
      points: { programming: up(150) }
    }
  ];
}
