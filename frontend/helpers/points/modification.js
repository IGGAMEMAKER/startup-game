import flux from '../../flux';
import logger from '../logger/logger';

const monthlyProgrammingPointsDifferenceStructured = (id = 0) => {
  logger.shit('getProgrammingSupportCost with zero index... ' +
    'we need real ID of our product!! /helpers/points/modification.js');

  const decrease = flux.productStore.getProgrammingSupportCost(id);
  const increase = flux.productStore.getMonthlyProgrammerPoints(id);

  return {
    increase,
    decrease,
    needToHireWorker: decrease > increase,
    diff: Math.abs(decrease - increase)
  }
};

const monthlyMarketingPointsDifferenceStructured = (id = 0) => {
  const decrease = flux.productStore.getMarketingSupportCost(id);
  const increase = flux.productStore.getMonthlyMarketerPoints(id);

  return {
    increase,
    decrease,
    detailed: {
      blog: flux.productStore.getBlogStatusStructured(id).supportCost,
      support: flux.productStore.getMarketingSupportTechTotalCost(id),
      base: flux.productStore.getBaseSupportCost()
    },
    needToHireWorker: decrease > increase,
    diff: Math.abs(decrease - increase)
  }
};

export default {
  programming: monthlyProgrammingPointsDifferenceStructured,
  marketing: monthlyMarketingPointsDifferenceStructured
};
