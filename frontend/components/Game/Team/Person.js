import { h, Component } from 'preact';


export default class Person extends Component {
  componentWillMount() {}

  render({ }) {
    return <tr className="worker-item" key={key}>
      <td>
        {name}, {specialization}&nbsp;
        {this.renderSkills(p)}
      </td>
      <td>{work}</td>
      <td>{salaryTab}</td>
      <td>{hireButton}</td>
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
}
