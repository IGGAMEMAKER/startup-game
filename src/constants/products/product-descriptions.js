import * as IDEAS from '../../constants/products/ideas';

export default function (idea) {
  switch (idea) {
    case IDEAS.IDEA_WEB_STUDIO:
      return {
        description: 'Веб студия. Специализируется на разработке веб-сайтов и веб-приложений.',
        features: [
          { name: 'portfolio', influence: 5, description: '' },
          { name: 'website', influence: 4, description: '' },
          { name: 'SM activity', influence: 1, description: '' }
        ],
        utility: 100, // 0 - useless, 100 - more usefull,than water in Africa or tablet from AID
      };
      break;
  }
};
