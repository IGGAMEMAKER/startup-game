import { h, Component } from 'preact';

import coloringRange from '../../../helpers/coloring-range';
import teamHelper from '../../../helpers/team/skills';
import * as JOB from '../../../constants/job';

export default class Person extends Component {
  componentWillMount() {}

  render({
    p,
    key,
    name,
    options
  }) {

    const specialization = teamHelper.getTranslatedSpecialization(p);
    const work = this.getWorkPhrase(p);
    const salaryTab = this.getSalaryTab(p);

    return <tr className="worker-item" key={key}>
      <td>
        {name}, {specialization}&nbsp;
        {this.renderSkills(p)}
      </td>
      <td>{work}</td>
      <td>{salaryTab}</td>
      <td>{options}</td>
    </tr>
  }

  renderSkills(p) {
    const renderSkill = (value) => {
      // const value = Math.floor(skill / 100);
      return <span style={{ color: coloringRange.standard(value, 10) }}>{value}</span>
    };

    // return `- ${teamHelper.getBestSkill(p)}lvl`;
    return <span>- {renderSkill(teamHelper.getBestSkill(p))}lvl</span>;
    // return <span>({renderSkill(p.skills.programming)}/{renderSkill(p.skills.marketing)})</span>;
  }

  getSalaryTab(p) {
    switch (p.salary.pricingType) {
      case 0:
        return `Доля в компании: ${p.salary.percent}%`;
        break;

      case 1:
        return `Зарплата: ${p.salary.money}$`;
        break;

      default:
        return JSON.stringify(p.salary);
        break;
    }
  }

  getWorkPhrase(p) {
    let work = '';
    let value = '';

    switch (p.task) {
      case JOB.JOB_TASK_MARKETING_POINTS:
        value = teamHelper.getMarketingPointsProducedBy(p);
        work = `Производительность: ${value}MP в месяц`;
        break;
      case JOB.JOB_TASK_PROGRAMMER_POINTS:
        value = teamHelper.getProgrammingPointsProducedBy(p);
        work = `Производительность: ${value}PP в месяц`;
        break;
    }

    return work;
  };
}
