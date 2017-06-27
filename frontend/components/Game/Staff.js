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
  };

  componentWillMount() {
    this.getStaff();

    store.addChangeListener(this.getStaff);
  }

  getStaff = () => {
    this.setState({
      staff: store.getTeam(),
      employees: store.getEmployees(),

      pps: store.getMonthlyProgrammerPoints(),
      mps: store.getMonthlyMarketerPoints(),
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


  render(props, { staff, teamToggle, pps, mps }) {
    if (!stageHelper.canShowTeamTabs()) return <div></div>;

    const staffList = staff.map((p, i) => <Worker p={p} i={i} />);

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

    return (
      <div className="staff-table">
        <br />
        <div>
          <h4 className="staff-switcher">Команда</h4>
          <div>Наши программисты производят +{pps} программистских очков (PP) в месяц</div>
          <div>Наши маркетологи производят +{mps} программистских очков (MP) в месяц</div>
          <br />
          {staffTab}
        </div>
      </div>
    );
  }
};
