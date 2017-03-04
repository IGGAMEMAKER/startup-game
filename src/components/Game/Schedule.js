// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';
import logger from '../../helpers/logger/logger';
import { WORK_SPEED_NORMAL } from '../../constants/work-speed';

import percentify from '../../helpers/math/percentify';
import round from '../../helpers/math/round';

type StateType = {
  tasks: Array
};

type PropsType = {};

import store from '../../stores/schedule-store';

export default class Schedule extends Component {
  state = {
    tasks: [],
    collapse: false
  };

  componentWillMount() {
    this.getTasks();

    store.addChangeListener(() => {
      this.getTasks();
    });
  }

  getTasks = () => {
    this.setState({
      tasks: store.getTasks()
    })
  };

  toggleTasks = () => {
    this.setState({ collapse: !this.state.collapse })
  };


  renderTask = (task, i) => {
    const description = task.description;
    const progress = `${task.progress}/${task.timecost}`;

    const percentage = `${Math.floor(task.progress * 100 / task.timecost)} %`;

    const days = Math.ceil((task.timecost - task.progress) / task.speed);

    let result;
    if (task.inProgress) {
      result = <b>{description} (Ещё {days} дней, {progress}, {percentage})</b>
    } else {
      result = <div>{description} (Ожидает выполнения: {progress}, {percentage})</div>
    }

    return <div key={`task${i}`}>{result}</div>;
  };

  // render(props: PropsType, state: StateType) {
  render() {
    const tasks = this.state.tasks;

    const collapse = this.state.collapse;
    return (
      <div>
        <h4 onClick={this.toggleTasks}>Текущие задачи ({collapse ? tasks.length : '-'})</h4>
        {tasks.length && !collapse ? tasks.map(this.renderTask) : ''}
      </div>
    );
  }
};
