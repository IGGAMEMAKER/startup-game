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
            <span className="worker-button"><UI.Button onClick={fire} text="Уволить" secondary /></span>
          </div>
        );
      }
    }

    let key = isEmployee ? 'employee' : 'person';
    key += i;

    let salaryTab = this.getSalaryTab(p);

    return <div className="worker-item" key={key}>
      <div>
        {p.isPlayer ? 'Вы' : p.name}, {specialization}&nbsp;
        {this.renderSkills(p)}
      </div>
      <div>{work}</div>
      <div>{salaryTab}</div>
      {hireButton}
    </div>;
  };

  render(props, { staff, employees, teamToggle, employeeToggle }) {
    const staffList =        staff.map((p, i) => this.renderPerson(p, i, false));
    const employeeList = employees.map((p, i) => this.renderPerson(p, i, true));

    return (
      <div>
        <h4 onClick={this.toggle('teamToggle')}>Команда ({teamToggle ? staff.length : '-'})</h4>
        {staff.length && !teamToggle ? staffList : ''}

        <h4 onClick={this.toggle('employeeToggle')}>Соискатели ({employeeToggle ? employees.length : '-'})</h4>
        {employees.length && !employeeToggle ? employeeList : ''}
      </div>
    );
  }
};
