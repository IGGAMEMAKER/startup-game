import flux from '../../flux';
import logger from '../logger/logger';

const monthlyProgrammingPointsDifferenceStructured = () => {
  const id = 0;
  logger.shit('getProgrammingSupportCost with zero index... ' +
    'we need real ID of our product!! /helpers/points/modification.js');

  const increase = flux.playerStore.getMonthlyProgrammerPoints();
  const decrease = flux.productStore.getProgrammingSupportCost(id);

  return {
    increase,
    decrease,
    needToHireWorker: decrease > increase,
    diff: Math.abs(decrease - increase)
  }
};

const monthlyMarketingPointsDifferenceStructured = () => {
  const id = 0;

  const decrease = flux.productStore.getMarketingSupportCost(id);
  const increase = flux.playerStore.getMonthlyMarketerPoints();

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
