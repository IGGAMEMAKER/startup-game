// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

type PropsType = {};

type StateType = {};

type ResponseType = {};

export default class Game extends Component {
  state = {
    level: 0,
    experience: 1000, // business experience... maybe equal to level

    discipline: 1000,
    charisma: 1000,

    talent: 1000, // is not upgradeable (level of difficulty)
    vision: 1000, // may be done in one parameter firstly

  };

  componentWillMount() {}

  render(props: PropsType) {
    const state = this.state;
    console.log('state is', state);
    return (
      <div>
        {JSON.stringify(state)}
      </div>
    );
  }
}
