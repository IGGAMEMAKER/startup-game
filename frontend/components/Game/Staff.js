import { h, Component } from 'preact';

import logger from '../../helpers/logger/logger';
import * as JOB from '../../constants/job';

import UI from '../UI';

import teamHelper from '../../helpers/team/skills';

import Worker from './Team/Worker';
import Employee from './Team/Employee';

import flux from '../../flux';

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


  render({ staff, employees }, { switcher, teamToggle, employeeToggle }) {
    if (!stageHelper.canShowTeamTabs()) return <div></div>;

    const staffList =        staff.map((p, i) => <Worker p={p} i={i} />);
    const employeeList = employees.map((p, i) => <Employee p={p} i={i} />);

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
            <tbody>{employeeList}</tbody>
          </table>
        </div>
      )
    }

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
        amount = staff.length ? `(${staff.length})` : '';
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
