import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';
import logger from '../../helpers/logger/logger';
import * as JOB from '../../constants/job';

import UI from '../UI';

import teamHelper from '../../helpers/team/skills';

import actions from '../../actions/player-actions';
import flux from '../../flux';

import Select from '../Shared/Select';

import coloringRange from '../../helpers/coloring-range';

import skillHelper from '../../helpers/team/skills';

import stageHelper from '../../helpers/stages';

type StateType = {
  staff: Array
};

type PropsType = {};

import store from '../../stores/player-store';

export default class Staff extends Component {
  state = {
    staff: [],
    employees: [],
    teamToggle: false,
    employeeToggle: false,
  };

  componentWillMount() {
    this.getStaff();

    store.addChangeListener(this.getStaff);
  }

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
    const motivation = this.getMotivation(p);
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
          <span className="worker-button"><UI.Button onClick={reject} text="Отклонить" /></span>
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

    return (
      <tr className="worker-item" key={key}>
        <td>
          {name}, {specialization}&nbsp;
          {this.renderSkills(p)}
        </td>
        <td>{work}</td>
        <td>{salaryTab}</td>
        <td>{hireButton}</td>
      </tr>
    );
  };

  render(props, { staff, employees, teamToggle, employeeToggle }) {
    const staffList =        staff.map((p, i) => this.renderPerson(p, i, false));
    const employeeList = employees.map((p, i) => this.renderPerson(p, i, true));

    const staffVisible = staff.length && !teamToggle;
    let staffTab;

    if (staffVisible) {
      const mp = staff.filter(teamHelper.isMarketer).map(teamHelper.getMarketingPointsProducedBy).reduce((p, c) => p + c, 0);
      const pp = staff.filter(teamHelper.isProgrammer).map(teamHelper.getProgrammingPointsProducedBy).reduce((p, c) => p + c, 0);

      staffTab = (
        <div>
          <div>Месячная производительность команды: +{mp}MP +{pp}PP </div>
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

    return (
      <div>
        <h4 onClick={this.toggle('teamToggle')}>Команда ({teamToggle ? staff.length : 'Свернуть'})</h4>
        {staffTab}

        <h4 onClick={this.toggle('employeeToggle')}>Соискатели ({employeeToggle ? employees.length : 'Свернуть'})</h4>
        {employeeTab}
      </div>
    );
  }
};
