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
    tasks: []
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

  // render(props: PropsType, state: StateType) {
  render() {
    const tasks = this.state.tasks;
    const renderTask = (task, i) => {
      const description = task.description;
      const progress = `${task.progress}/${task.timecost}`;
      let result;

      const percentage = `${Math.floor(task.progress * 100 / task.timecost)} %`;

      const days = Math.ceil((task.timecost - task.progress) / task.speed);
      if (task.inProgress) {
        result = <b>{description} (Ещё {days} дней, {percentage})</b>
      } else {
        result = <div>{description} (Ожидает выполнения: {progress}, {percentage})</div>
      }

          // {JSON.stringify(task)}
      return (
        <div key={`task${i}`}>
          {result}
        </div>
      );
    };

    // let tasks1 = [10, 11, 1, 3, 2]; // p.tasks.sort((a, b) => a - b);
    // logger.log(tasks1, tasks1.map(m => m).sort((a, b) => b - a));

    return (
      <div>
        <h4>Текущие задачи</h4>
        {tasks.length ? tasks.map(renderTask) : ''}
      </div>
    );
  }
};
