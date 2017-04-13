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

  getSkill = skill => {
    const value = Math.floor(skill / 100);
    return <span style={{ color: coloringRange.standard(value, 10) }}>{value}</span>
  };

  renderEmployee = (p, i) => {
    return this.renderPerson(p, i, true);
  };

  renderPerson = (p, i, isEmployee) => {
    let specialization = teamHelper.getTranslatedSpecialization(p);

    let motivation = '';
    switch (p.jobMotivation) {
      case JOB.JOB_MOTIVATION_BUSINESS_OWNER: motivation = 'Владелец бизнеса'; break;
      case JOB.JOB_MOTIVATION_IDEA_FAN: motivation = 'Фанат проекта'; break;
      case JOB.JOB_MOTIVATION_SALARY: motivation = 'За зарплату'; break;
      case JOB.JOB_MOTIVATION_PERCENTAGE: motivation = 'За долю'; break;
    }

    let work = '';
    let value = '';

    const produces = isEmployee ? 'Может производить' : 'Производит';

    switch (p.task) {
      case JOB.JOB_TASK_MARKETING_POINTS:
        value = store.getMarketingPointsProducedBy(p);
        work = `${produces} ${value}MP (Marketing Points) / month`;
        break;
      case JOB.JOB_TASK_PROGRAMMER_POINTS:
        value = store.getProgrammingPointsProducedBy(p);
        work = `${produces} ${value}PP (Programming Points) / month`;
        break;
    }

    const tasks = [
      { text: 'Программирование', value: JOB.JOB_TASK_PROGRAMMER_POINTS },
      { text: 'Маркетинг', value: JOB.JOB_TASK_MARKETING_POINTS },
    ];

    let hireButton = '';
    if (isEmployee) {
      const hire = () => {
        actions.hireWorker(p, i);
      };
      hireButton = <UI.Button onClick={hire} text="Нанять" />;
    }

    return <div key={`person${i}`}>
      <div>
        {p.isPlayer ? 'Вы' : p.name}&nbsp;
        (
        {this.getSkill(p.skills.programming)}/
        {this.getSkill(p.skills.marketing)}
        )
      </div>
      <div>Специальность: {specialization}</div>
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
      <div>{work}</div>
      <div>Мотивация: {motivation}</div>
      <div>{JSON.stringify(p.salary)}</div>
      {hireButton}
      <br />
    </div>;
  };

  // render(props: PropsType, state: StateType) {
  render() {
    // return <div>MOCK</div>;
    const { staff, employees } = this.state;

    const collapse = this.state.collapse;
    return (
      <div>
        <h4 onClick={this.toggleStaff}>Команда ({collapse ? staff.length : '-'})</h4>
        {staff.length && !collapse ? staff.map((p, i) => this.renderPerson(p, i, false)) : ''}
        <h4 onClick={this.toggleStaff}>Соискатели ({collapse ? staff.length : '-'})</h4>
        {employees.length && !collapse ? employees.map(this.renderEmployee) : ''}
      </div>
    );
  }
};
