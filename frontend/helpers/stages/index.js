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

const isTestMode = true;

logger.shit('need to send stats on game phase change');

const isTest = (target, property, descriptor) => {
  logger.debug('isTest ?11', property);
  if (isTestMode) {
    // descriptor.get = function () {
    //   return true;
    // };

    descriptor.value = () => true;
    descriptor.enumerable = false;
    descriptor.configurable = true;
    descriptor.writable = true;

    // descriptor.value = () => true;
  }
};

const proceed = (stage) => (target, property, descriptor) => {
  if (getStage() >= stage || isTestMode) {
    // descriptor.value = () => true;
    descriptor.value = () => true;
    descriptor.enumerable = false;
    descriptor.configurable = true;
    descriptor.writable = true;
  }
};


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

  @isTest
  canShowHypothesisTab() {
    return getStage() >= gameStages.GAME_STAGE_INVITED_FIRST_CLIENTS;
  },
  @isTest
  canShowUpperTabInMenu() {
    return getStage() >= gameStages.GAME_STAGE_IMPROVED_ANALYTICS;
  },
  @isTest
  canShowMetricsTab() {
    return getStage() >= gameStages.GAME_STAGE_TESTED_FIRST_HYPOTHESIS;
  },
  @isTest
  canShowMainFeatureTab() {
    return getStage() >= gameStages.GAME_STAGE_TESTED_FIRST_HYPOTHESIS;
  },

  @isTest
  canShowPaymentsTab() {
    return getStage() >= gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS;
  },

  @isTest
  canShowCompetitorsTab() {
    return getStage() >= gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS;
  },

  @isTest
  canShowClientsTab() {
    return false;
    // return getStage() >= gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS;
  },

  @isTest
  @proceed(gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS)
  canShowBonusesTab() {
    return false;
  },

  @isTest
  canShowTeamTabs() {
    const s = getStage();

    if (s === gameStages.GAME_STAGE_GAME_STARTED) return true;

    if (s > gameStages.GAME_STAGE_GAME_STARTED && s < gameStages.GAME_STAGE_IMPROVED_FIRST_FEATURE) return false;

    return true;
  },

  @isTest
  canShowAdTab() {
    return getStage() >= gameStages.GAME_STAGE_HIRED_FIRST_WORKER;
  },

  @isTest
  canShowSegments() {
    return getStage() >= gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS
  },

  @isTest
  canShowChurnFeatures() {
    return getStage() >= gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS
  }
};
