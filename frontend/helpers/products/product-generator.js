import productDescriptions from '../../constants/products/product-descriptions';
import random from '../math/random';

import logger from '../logger/logger';

const names = ['Alpha-Centaura', 'Sun', 'Magenta', 'Grapes', 'Best Hosting', 'Unnamed'];

export default {
  create(parameters) {
    let { idea, name } = parameters;

    if (!idea) throw 'no idea in product-generator.js';

    if (!name) {
      name = names[random(0, names.length)];
    }

    const defaultFeatures = productDescriptions(idea).features;

    const luck = random(1, 6) / 10; // luck in 0.1-0.6
    logger.debug(idea, defaultFeatures);

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

    const KPI = {
      debt: 0, // technical debt. Shows, how fast can you implement new features
      clients: 10,
      newClients: 10,

      bugs: 10,

      currentUXBugs: 100,
      foundUXBugs: 0,
      fixedUXBugs: 0
    };

    return {features, KPI, idea, name}
  }
};
