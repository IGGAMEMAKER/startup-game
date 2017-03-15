// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';
import logger from '../../helpers/logger/logger';
import * as JOB from '../../constants/job';

import percentify from '../../helpers/math/percentify';
import round from '../../helpers/math/round';

import Select from '../Shared/Select';

type StateType = {
  staff: Array
};

type PropsType = {};

import store from '../../stores/player-store';

export default class Staff extends Component {
  state = {
    staff: [],
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
      staff: store.getTeam()
    })
  };

  toggleStaff = () => {
    this.setState({ collapse: !this.state.collapse })
  };

  getSpecialization = p => {
    const skills = [
      { s: 'programming', value: p.skills.programming },
      { s: 'analytics', value: p.skills.analyst },
      { s: 'marketing', value: p.skills.marketing },
    ];

    return skills.sort((a, b) => a.value < b.value)[0].s;
  };

  renderPerson = (p, i) => {
    let specialization;
    switch (this.getSpecialization(p)) {
      case 'programming': specialization = 'программист'; break;
      case 'marketing': specialization = 'маркетолог'; break;
      case 'analytics': specialization = 'аналитик'; break;
    }

    let motivation = '';
    switch (p.jobMotivation) {
      case JOB.JOB_MOTIVATION_BUSINESS_OWNER: motivation = 'Владелец бизнеса'; break;
      case JOB.JOB_MOTIVATION_IDEA_FAN: motivation = 'Фанат проекта'; break;
      case JOB.JOB_MOTIVATION_SALARY: motivation = 'За зарплату'; break;
      case JOB.JOB_MOTIVATION_PERCENTAGE: motivation = 'За долю'; break;
    }

    let work = '';


    const tasks = [
      { text: 'Программирование', value: JOB.JOB_TASK_PROGRAMMER_POINTS },
      { text: 'Маркетинг', value: JOB.JOB_TASK_MARKETING_POINTS },
    ];

    return <div key={`person${i}`}>
      <div>Специальность: {specialization}</div>
      <div>
        <span>Задача: </span>
        <span><Select options={tasks} value={p.task} /></span>
      </div>
      <div>{work}</div>
      <div>Мотивация: {motivation}</div>
      <br />
    </div>;
  };

  // render(props: PropsType, state: StateType) {
  render() {
    // return <div>MOCK</div>;
    const staff = this.state.staff;

    const collapse = this.state.collapse;
    return (
      <div>
        <h4 onClick={this.toggleStaff}>Персонал ({collapse ? staff.length : '-'})</h4>
        {staff.length && !collapse ? staff.map(this.renderPerson) : ''}
      </div>
    );
  }
};
