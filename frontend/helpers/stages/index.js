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

function isTest() {
  // if (isTestMode) return (target, property, descriptor) => true;

  return (target, property, descriptor) => {
    console.log('executed', target, property, descriptor);

    if (isTestMode) {
      descriptor.value = () => true;
      // descriptor.writable = false;
      // descriptor.get = () => true;
    }
    // descriptor = {
    //   configurable: false, // or true
    //   enumerable: false, // or true
    //   value: undefined, // or any other value
    //   writable: false, // or true
    //   get: function () { /* return some value here */ },
    //   set: function (newValue) { /* set the new value of the property */ }
    // };

    // if (isTestMode) {
      // console.log('is test mode');
      // return true;
    // }
  }
}

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
    return getStage() >= gameStages.GAME_STAGE_INVITED_FIRST_CLIENTS || isTestMode;
  },

  canShowUpperTabInMenu() {
    return getStage() >= gameStages.GAME_STAGE_IMPROVED_ANALYTICS || isTestMode;
  },

  canShowMetricsTab() {
    return getStage() >= gameStages.GAME_STAGE_TESTED_FIRST_HYPOTHESIS || isTestMode;
  },

  canShowMainFeatureTab() {
    return getStage() >= gameStages.GAME_STAGE_TESTED_FIRST_HYPOTHESIS || isTestMode;
  },

  canShowPaymentsTab() {
    return getStage() >= gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS || isTestMode;
  },

  canShowCompetitorsTab() {
    return getStage() >= gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS || isTestMode;
  },

  canShowClientsTab() {
    return getStage() >= gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS || isTestMode;
  },

  @isTest()
  canShowBonusesTab() {
    return getStage() >= gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS; // || isTestMode;
  },

  canShowTeamTabs() {
    if (isTestMode) return true;

    const s = getStage();

    if (s === gameStages.GAME_STAGE_GAME_STARTED) return true;

    if (s > gameStages.GAME_STAGE_GAME_STARTED && s < gameStages.GAME_STAGE_IMPROVED_FIRST_FEATURE) return false;

    return true;
  },

  canShowAdTab() {
    return getStage() >= gameStages.GAME_STAGE_HIRED_FIRST_WORKER || isTestMode;
  },

  canShowSegments() {
    return this.canShowCompetitorsTab();
  },

  canShowChurnFeatures() {
    return this.canShowCompetitorsTab();
  }
};
