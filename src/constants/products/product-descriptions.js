import * as IDEAS from '../../constants/products/ideas';

export default function (idea) {
  switch (idea) {
    case IDEAS.IDEA_WEB_STUDIO:
      return {
        description: 'Веб студия. Специализируется на разработке веб-сайтов и веб-приложений.',
        features: [
          { name: 'portfolio', influence: 5.5, description: '', time: 30 },
          { name: 'website', influence: 4.5, description: '', time: 14 }
          // { name: 'SM activity', influence: 1, description: '' }
        ],
        utility: 70, // 0 - useless, 100 - more useful, than water in Africa or tablet for AIDs. Influences churn rate and payments
        virality: 1, // virality multiplier. 1-2.5 (2.5 - social-network or some cool games)
      };
      break;
  }
};
