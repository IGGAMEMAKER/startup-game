import flux from '../../flux';
import c from '../../constants';
import logger from '../logger/logger';
import * as gameStages from '../../constants/game-stages';

const getStage = () => {
  return flux.scheduleStore.getGamePhase();
};

const setStage = (stage) => {
  flux.scheduleActions.setGamePhase(stage);
};

logger.shit('need to send stats on game phase change');

export default {
  // on mission completed
  onFirstWorkerMissionCompleted() {
    setStage(gameStages.GAME_STAGE_HIRED_FIRST_WORKER);
  },

  onInstallPrimitiveAnalyticsMissionCompleted() {
    setStage(gameStages.GAME_STAGE_IMPROVED_ANALYTICS)
  },

  onFirstHypothesisMissionCompleted() {
    setStage(gameStages.GAME_STAGE_TESTED_FIRST_HYPOTHESIS);
  },

  onFirstAdCampaignMissionCompleted() {
    setStage(gameStages.GAME_STAGE_INVITED_FIRST_CLIENTS);
  },

  onFirstFeatureUpgradeMissionCompleted() {
    setStage(gameStages.GAME_STAGE_IMPROVED_FIRST_FEATURE);
  },

  onPaymentRatingMissionCompleted() {
    setStage(gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS);
  },

  onInstallPaymentModuleMissionCompleted() {
    setStage(gameStages.GAME_STAGE_PAYMENTS_INSTALLED);
  },


  // mission checker
  isFirstWorkerMission() {
    return getStage() === gameStages.GAME_STAGE_GAME_STARTED;
  },

  isInstallPrimitiveAnalyticsMission() {
    return getStage() === gameStages.GAME_STAGE_INVITED_FIRST_CLIENTS;
  },

  isFirstHypothesisMission() {
    return getStage() === gameStages.GAME_STAGE_IMPROVED_ANALYTICS;
    // return getStage() === gameStages.GAME_STAGE_LEARNED_SPEEDER;
  },

  isFirstAdCampaignMission() {
    return getStage() === gameStages.GAME_STAGE_HIRED_FIRST_WORKER;
  },

  isFirstFeatureMission() {
    return getStage() === gameStages.GAME_STAGE_TESTED_FIRST_HYPOTHESIS;
  },

  isPaymentRatingMission() {
    return getStage() === gameStages.GAME_STAGE_IMPROVED_FIRST_FEATURE;
  },

  isInstallPaymentModuleMission() {
    return getStage() === gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS;
  },


  // can show some tabs region
  canShowHypothesisTab() {
    return getStage() >= gameStages.GAME_STAGE_INVITED_FIRST_CLIENTS;
  },

  canShowUpperTabInMenu() {
    return getStage() >= gameStages.GAME_STAGE_IMPROVED_ANALYTICS;
  },

  canShowMetricsTab() {
    return getStage() >= gameStages.GAME_STAGE_TESTED_FIRST_HYPOTHESIS;
  },

  canShowMainFeatureTab() {
    return getStage() >= gameStages.GAME_STAGE_TESTED_FIRST_HYPOTHESIS;
  },

  canShowPaymentsTab() {
    return getStage() >= gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS;
  },

  canShowCompetitorsTab() {
    return getStage() >= gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS;
  },

  canShowClientsTab() {
    return getStage() >= gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS;
  },

  canShowBonusesTab() {
    return getStage() >= gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS;
  }
};
