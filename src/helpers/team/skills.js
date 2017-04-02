const getSkill = skill => Math.floor(skill / 100);

export default {
  plain: (p) => {
    return `${getSkill(p.skills.programming)}/${getSkill(p.skills.marketing)}/${getSkill(p.skills.analyst)}`;
  },
  getSkill
};
