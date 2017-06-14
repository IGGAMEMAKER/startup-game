import flux from '../../flux';
import logger from '../logger/logger';

const monthlyProgrammingPointsDifferenceStructured = () => {
  const id = 0;
  logger.shit('getProgrammingSupportCost with zero index... ' +
    'we need real ID of our product!! /helpers/points/modification.js');

  return {
    increase: flux.playerStore.getMonthlyProgrammerPoints(),
    decrease: flux.productStore.getProgrammingSupportCost(id)
  }
};

const monthlyMarketingPointsDifferenceStructured = () => {
  const id = 0;

  return {
    increase: flux.playerStore.getMonthlyMarketerPoints(),
    decrease: flux.productStore.getMarketingSupportCost(id),
    detailed: {
      blog: flux.productStore.getBlogStatusStructured(id)
    }
  }
};

export default {
  programming: monthlyProgrammingPointsDifferenceStructured,
  marketing: monthlyMarketingPointsDifferenceStructured
};
