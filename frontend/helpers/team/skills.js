import getSpecialization from './specialization';
import * as JOB from '../../../shared/constants/job';

const getSkill = skill => Math.floor(skill / 100);

export default {
  plain(p) {
    return `${getSkill(p.skills.programming)}/${getSkill(p.skills.marketing)}/${getSkill(p.skills.analyst)}`;
  },
  getSkill,
  getBestSkill(p) {
    const { programming, marketing, analyst } = p.skills;
    switch (getSpecialization(p)) {
      case JOB.PROFESSION_PROGRAMMER: return getSkill(programming); break;
      case JOB.PROFESSION_MARKETER: return getSkill(marketing); break;
      case JOB.PROFESSION_ANALYST: return getSkill(analyst); break;
        return 0;
    }
  },
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
  isAnalyst(p) {
    return getSpecialization(p) === JOB.PROFESSION_ANALYST;
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
