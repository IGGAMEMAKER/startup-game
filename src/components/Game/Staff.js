// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';
import logger from '../../helpers/logger/logger';
import * as JOB from '../../constants/job';

import percentify from '../../helpers/math/percentify';
import round from '../../helpers/math/round';

import getSpecialization from '../../helpers/team/specialization';
import teamHelper from '../../helpers/team/skills';

import actions from '../../actions/player-actions';

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

  getSkill = skill => Math.floor(skill / 100);

  renderPerson = (p, i) => {
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

    switch (p.task) {
      case JOB.JOB_TASK_MARKETING_POINTS:
        value = store.getMarketingPointsProducedBy(p);
        work = `Производит ${value} marketing points / month`;
        break;
      case JOB.JOB_TASK_PROGRAMMER_POINTS:
        value = store.getProgrammingPointsProducedBy(p);
        work = `Производит ${value} programming points / month`;
        break;
    }

    const tasks = [
      { text: 'Программирование', value: JOB.JOB_TASK_PROGRAMMER_POINTS },
      { text: 'Маркетинг', value: JOB.JOB_TASK_MARKETING_POINTS },
    ];

    return <div key={`person${i}`}>
      <div>
        {p.isPlayer ? 'Вы' : p.name}&nbsp;
        (
        {this.getSkill(p.skills.programming)}/
        {this.getSkill(p.skills.marketing)}/
        {this.getSkill(p.skills.analyst)}
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
        <h4 onClick={this.toggleStaff}>Команда ({collapse ? staff.length : '-'})</h4>
        {staff.length && !collapse ? staff.map(this.renderPerson) : ''}
      </div>
    );
  }
};
