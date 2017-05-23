import { h, Component } from 'preact';

import logger from '../../helpers/logger/logger';
import * as JOB from '../../constants/job';

import UI from '../UI';

import teamHelper from '../../helpers/team/skills';

import actions from '../../actions/player-actions';
import flux from '../../flux';

import coloringRange from '../../helpers/coloring-range';

import skillHelper from '../../helpers/team/skills';

import stageHelper from '../../helpers/stages';

type StateType = {
  staff: Array
};

type PropsType = {};

import store from '../../stores/player-store';

const IS_STAFF = 'IS_STAFF';
const IS_EMPLOYEES = 'IS_EMPLOYEES';

export default class Staff extends Component {
  state = {
    staff: [],
    employees: [],
    teamToggle: false,
    employeeToggle: false,
    switcher: IS_EMPLOYEES
  };

  componentWillMount() {
    // this.getStaff();
    //
    // store.addChangeListener(this.getStaff);
  }

  setStaff = () => { this.setMode(IS_STAFF); };
  setEmployees = () => { this.setMode(IS_EMPLOYEES); };

  setMode = switcher => {
    this.setState({ switcher })
  };

  getStaff = () => {
    this.setState({
      staff: store.getTeam(),
      employees: store.getEmployees(),
    })
  };

  toggle = (name) => () => {
    const obj = {};
    obj[name] = !this.state[name];
    this.setState(obj)
  };


  getMotivation(p) {
    let motivation = '';
    switch (p.jobMotivation) {
      case JOB.JOB_MOTIVATION_BUSINESS_OWNER: motivation = 'Владелец бизнеса'; break;
      case JOB.JOB_MOTIVATION_IDEA_FAN: motivation = 'Фанат проекта'; break;
      case JOB.JOB_MOTIVATION_SALARY: motivation = 'За зарплату'; break;
      case JOB.JOB_MOTIVATION_PERCENTAGE: motivation = 'За долю'; break;
    }

    return motivation;
  }

  getWorkPhrase(p) {
    let work = '';
    let value = '';

    switch (p.task) {
      case JOB.JOB_TASK_MARKETING_POINTS:
        value = skillHelper.getMarketingPointsProducedBy(p);
        work = `Производительность: ${value}MP в месяц`;
        break;
      case JOB.JOB_TASK_PROGRAMMER_POINTS:
        value = skillHelper.getProgrammingPointsProducedBy(p);
        work = `Производительность: ${value}PP в месяц`;
        break;
    }
    return work;
  };

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

  renderPerson = (p, i, isEmployee) => {
    const specialization = teamHelper.getTranslatedSpecialization(p);
    const work = this.getWorkPhrase(p);

    let hireButton = '';

    const hire = () => {
      if (stageHelper.isFirstWorkerMission()) {
        stageHelper.onFirstWorkerMissionCompleted();
      }

      actions.hireWorker(p, i);
    };

    const reject = () => { actions.rejectEmployee(i); };
    const fire = () => { actions.fireWorker(i); };


    if (isEmployee) {
      hireButton = (
        <div className="worker-button-container">
          <span className="worker-button"><UI.Button onClick={hire} text="Нанять" primary /></span>
          {
            !stageHelper.isFirstWorkerMission()
            ?
            <span className="worker-button"><UI.Button onClick={reject} text="Отклонить"/></span>
            :
            ''
          }
        </div>
      );
    } else {
      if (!p.isPlayer) {
        hireButton = (
          <div className="worker-button-container">
            <span className="worker-button"><UI.Button onClick={fire} text="Уволить" link /></span>
          </div>
        );
      }
    }

    let key = isEmployee ? 'employee' : 'person';
    key += i;

    let salaryTab = this.getSalaryTab(p);

    const name = p.isPlayer ? 'Вы' : p.name;

    return <tr className="worker-item" key={key}>
      <td>
        {name}, {specialization}&nbsp;
        {this.renderSkills(p)}
      </td>
      <td>{work}</td>
      <td>{salaryTab}</td>
      <td>{hireButton}</td>
    </tr>
  };

  render({ staff, employees }, { switcher, teamToggle, employeeToggle }) {
    if (!stageHelper.canShowTeamTabs()) return <div></div>;

    const staffList =        staff.map((p, i) => this.renderPerson(p, i, false));
    const employeeList = employees.map((p, i) => this.renderPerson(p, i, true));

    const staffVisible = staff.length && !teamToggle;
    let staffTab;

    if (staffVisible) {
      staffTab = (
        <div>
          <br />
          <table className="table table-striped">
            <tbody>
            {staffList}
            </tbody>
          </table>
        </div>
      )
    }

    let employeeTab;
    if (employees.length && !employeeToggle) {
      employeeTab = (
        <div>
          <table className="table table-striped">
            <tbody>
            {employeeList}
            </tbody>
          </table>
        </div>
      )
    }

    let employeePhrase;
    // if (!employees.length) {
    //   employeePhrase = <h6>Никто не хочет присоединиться к нам :( Перемотайте время и у нас появятся варианты!</h6>
    // } else {
    //   employeePhrase = <h6>К нашей команде хотят присоединиться {employees.length} человек</h6>
    // }

    let teamPhrase;
    const staffLength = staff.length;
    // if (staffLength < 2) {
    //   // teamPhrase = 'Наймите маркетолога';
    // } else {
    //   teamPhrase = ''; // `В нашей команде ${staffLength} человек`;
    // }

    let tab;
    let amount;
    switch (switcher) {
      case IS_EMPLOYEES:
        amount = employees.length ? `(${employees.length})` : '';
        tab = (
          <div>
            <div>
              <h4 className="staff-switcher">Найм сотрудников {amount}</h4>
              <span className="link" onClick={this.setStaff}>Команда</span>
            </div>
            <br />
            {employeeTab}
          </div>
        );
        break;
      case IS_STAFF:
        amount = staffLength ? `(${staffLength})` : '';
            // <UI.Button text="Нанять сотрудника" link onClick={this.setEmployees} />
        tab = (
          <div>
            <div>
              <h4 className="staff-switcher">Команда</h4>
              <span className="link" onClick={this.setEmployees}>Нанять сотрудника</span>
            </div>
            <br />
            {staffTab}
          </div>
        );
        break;
    }

        // <div>Месячная производительность команды: +{mp}MP +{pp}PP </div>

        // <nav aria-label="Page navigation example">
        //   <ul className="pagination justify-content-center">
        //     <li className={`page-item ${switcher === IS_STAFF ? 'active' : ''}`}>
        //       <span onClick={this.setStaff} className="page-link" tabindex="-1">Команда ({staffLength})</span>
        //     </li>
        //     <li className={`page-item ${switcher === IS_EMPLOYEES ? 'active' : ''}`}>
        //       <span onClick={this.setEmployees} className="page-link">Нанять ({employees.length})</span>
        //     </li>
        //   </ul>
        // </nav>
    return (
      <div className="staff-table">
        <br />
        {tab}
      </div>
    );
  }
};
