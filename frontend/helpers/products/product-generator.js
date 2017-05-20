import productDescriptions from '../../constants/products/product-descriptions';
import random from '../math/random';

import logger from '../logger/logger';

const names = ['Alpha-Centaura', 'Sun', 'Magenta', 'Grapes', 'Best Hosting', 'Unnamed'];

export default {
  create(parameters) {
    let { idea, name, isCompetitor } = parameters;

    if (!idea) throw 'no idea in product-generator.js';

    if (!name) {
      const index = Math.floor(random(0, names.length - 1));
      name = names[index];
    }

    const defaults = productDescriptions(idea);
    const defaultFeatures = defaults.features;

    let maxRating = 6;
    if (isCompetitor) maxRating = 8;

    const luck = random(1, maxRating) / 10; // luck in 0.1-0.6

    const offer = {};
    defaultFeatures.forEach(f => {
      offer[f.name] = Math.floor(luck * f.data);
    });

    const features = {
      offer, // features, that are attached to main idea
      development: {}, // backups, more dev servers, e.t.c.

      marketing: {}, // SEO, SMM, mass media, email marketing e.t.c.
      analytics: {}, // simple analytics (main KPIs),
      // middle (segments analytics), mid+ (segments + versions),

      // not only chat with users, but also localisations, content updates
      // and all sort of things, that you need doing constantly
      support: {},
      payment: {}
    };

    const clients = isCompetitor ? Math.ceil(random(100, defaults.marketSize - 1000)) : 10;

    const KPI = {
      debt: 0, // technical debt. Shows, how fast can you implement new features
      clients,
      newClients: clients,

      bugs: 10,

      currentUXBugs: 100,
      foundUXBugs: 0,
      fixedUXBugs: 0
    };

    return {features, KPI, idea, name}
  }
};
