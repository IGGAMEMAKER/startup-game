import * as JOB from '../../constants/job';

export default p => {
  const skills = [
    { s: 'programming', value: p.skills.programming },
    { s: 'analytics', value: p.skills.analyst },
    { s: 'marketing', value: p.skills.marketing },
  ];

  const specialisation = skills.sort((a, b) => a.value < b.value)[0].s;
  if (specialisation === 'programming') return JOB.PROFESSION_PROGRAMMER;
  if (specialisation === 'analytics') return JOB.PROFESSION_ANALYST;
  if (specialisation === 'marketing') return JOB.PROFESSION_MARKETER;

  return '';
};
