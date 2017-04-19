const getSkill = skill => Math.floor(skill / 100);
import getSpecialization from './specialization';
import * as JOB from '../../constants/job';


export default {
  plain(p) {
    return `${getSkill(p.skills.programming)}/${getSkill(p.skills.marketing)}/${getSkill(p.skills.analyst)}`;
  },
  getSkill,
  getTranslatedSpecialization(p) {
    switch (getSpecialization(p)) {
      case JOB.PROFESSION_PROGRAMMER: return 'программист'; break;
      case JOB.PROFESSION_MARKETER: return 'маркетолог'; break;
      case JOB.PROFESSION_ANALYST: return 'аналитик'; break;
      return 'бездельник';
    }
  },
  isProgrammer(p) {
    return getSpecialization(p) === JOB.PROFESSION_PROGRAMMER;
  },
  isMarketer(p) {
    return getSpecialization(p) === JOB.PROFESSION_MARKETER;
  },
  getMaxEfficiencyPhrase(p) {
    switch (getSpecialization(p)) {
      case JOB.PROFESSION_PROGRAMMER:
        return `${this.getProgrammingPointsProducedBy(p)} PP`;
        break;

      case JOB.PROFESSION_MARKETER:
        return `${this.getMarketingPointsProducedBy(p)} MP`;
        break;

      case JOB.PROFESSION_ANALYST:
        return 'аналитик';
        break;

      default:
        return 'бездельник';
        break;
    }
  },
  getMarketingPointsProducedBy(p) {
    const marketingEfficiency = 5;
    const modifier = Math.floor(Math.pow(getSkill(p.skills.marketing), 1.43));

    return modifier * marketingEfficiency;
  },

  getProgrammingPointsProducedBy(p) {
    const programmingEfficiency = 5;
    const modifier = Math.floor(Math.pow(getSkill(p.skills.programming), 1.43));

    return modifier * programmingEfficiency;
  },
  overall: p => {
    return getSkill(p.skills.programming) + getSkill(p.skills.marketing) + getSkill(p.skills.analyst);
  }
};
