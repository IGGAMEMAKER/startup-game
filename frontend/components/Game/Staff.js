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

type StateType = {
  staff: Array
};

type PropsType = {};

import store from '../../stores/player-store';

export default class Staff extends Component {
  state = {
    staff: [],
    employees: [],
    collapse: false
  };

  componentWillMount() {
    this.getStaff();

    store.addChangeListener(() => {
      this.getStaff();
    });
  }

  getStaff = () => {
    this.setState({
      staff: store.getTeam(),
      employees: store.getEmployees(),
    })
  };

  toggleStaff = () => {
    this.setState({ collapse: !this.state.collapse })
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
    const renderSkill = (skill) => {
      const value = Math.floor(skill / 100);
      return <span style={{ color: coloringRange.standard(value, 10) }}>{value}</span>
    };

    return <span>({renderSkill(p.skills.programming)}/{renderSkill(p.skills.marketing)})</span>;
  }

  renderEmployee = (p, i) => {
    return this.renderPerson(p, i, true);
    // return <div>{JSON.stringify(p)}</div>
    const specialization = teamHelper.getTranslatedSpecialization(p);

    const motivation = this.getMotivation(p);

    const work = this.getWorkPhrase(p);

    const hire = () => {
      actions.hireWorker(p, i);
    };

    return <div key={`employee${i}`}>
      <div>
        {p.name}&nbsp;
        {this.renderSkills(p)}
      </div>
      <div>Специальность: {specialization}</div>
      <div>{work}</div>
      <div>Мотивация: {motivation}</div>
      <div>{JSON.stringify(p.salary)}</div>
      <UI.Button onClick={hire} text="Нанять" />
      <br />
    </div>;
  };

  renderPerson = (p, i, isEmployee) => {
    const specialization = teamHelper.getTranslatedSpecialization(p);
    const motivation = this.getMotivation(p);
    const work = this.getWorkPhrase(p);

    const tasks = [
      { text: 'Программирование', value: JOB.JOB_TASK_PROGRAMMER_POINTS },
      { text: 'Маркетинг', value: JOB.JOB_TASK_MARKETING_POINTS },
    ];

    let taskSettingTab;
    let hireButton = '';
    if (isEmployee) {
      const hire = () => {
        actions.hireWorker(p, i);
      };
      hireButton = <UI.Button onClick={hire} text="Нанять" />;
      taskSettingTab = '';
    } else {
      taskSettingTab = (
        <div>
          <span>Задача: </span>
        <span>
          <Select
            onChange={(value) => { actions.setTaskForPerson(value, i); }}
            options={tasks}
            value={p.task}
          />
        </span>
        </div>
      );
    }

    const key = isEmployee ? 'employee' : 'person';

    let salaryTab = JSON.stringify(p.salary);
    switch (p.salary.pricingType) {
      case 0:
        salaryTab = `Доля в компании: ${p.salary.percent}%`;
        break;

      case 1:
        salaryTab = `Зарплата: ${p.salary.money}$`;
        break;
    }
    // <div>Мотивация: {motivation}</div>
    return <div key={`${key}${i}`}>
      <div>
        {p.isPlayer ? 'Вы' : p.name},{specialization}&nbsp;
        {this.renderSkills(p)}
      </div>
      <div>Специальность: {specialization}</div>
      {taskSettingTab}
      <div>{work}</div>
      <div>{salaryTab}</div>
      {hireButton}
      <br />
    </div>;
  };

  // render(props: PropsType, state: StateType) {
  render(props, { staff, employees, collapse }) {
    // return <div>MOCK</div>;
    // const  = this.state;

    // const collapse = this.state.collapse;

    const staffList = staff.map((p, i) => this.renderPerson(p, i, false));
    const employeeList = employees.map(this.renderEmployee);

    return (
      <div>
        <h4 onClick={this.toggleStaff}>Команда ({collapse ? staff.length : '-'})</h4>
        {staff.length && !collapse ? staffList : ''}

        <h4 onClick={this.toggleStaff}>Соискатели ({collapse ? employees.length : '-'})</h4>
        {employees.length && !collapse ? employeeList : ''}
      </div>
    );
  }
};
