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


  // can show some tabs region
  canShowHypothesisTab() {
    return getStage() >= gameStages.GAME_STAGE_HIRED_FIRST_WORKER;
  },

  canShowMetricsTab() {
    return getStage() >= gameStages.GAME_STAGE_TESTED_FIRST_HYPOTHESIS;
  },

  canShowMainFeatureTab() {
    return getStage() >= gameStages.GAME_STAGE_TESTED_FIRST_HYPOTHESIS;
  },

};
