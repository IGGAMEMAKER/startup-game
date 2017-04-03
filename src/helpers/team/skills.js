const getSkill = skill => Math.floor(skill / 100);
import getSpecialization from './specialization';
import * as JOB from '../../constants/job';


export default {
  plain: (p) => {
    return `${getSkill(p.skills.programming)}/${getSkill(p.skills.marketing)}/${getSkill(p.skills.analyst)}`;
  },
  getSkill,
  getTranslatedSpecialization: (p) => {
    switch (getSpecialization(p)) {
      case JOB.PROFESSION_PROGRAMMER: return 'программист'; break;
      case JOB.PROFESSION_MARKETER: return 'маркетолог'; break;
      case JOB.PROFESSION_ANALYST: return 'аналитик'; break;
      return 'бездельник';
    }
  },
  overall: p => {
    return getSkill(p.skills.programming) + getSkill(p.skills.marketing) + getSkill(p.skills.analyst);
  }
};
