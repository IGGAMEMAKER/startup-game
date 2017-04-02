// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

import playerStore from '../../../stores/player-store';
import playerActions from '../../../actions/player-actions';

import Button from '../../Shared/Button';
import Range from '../../Shared/Range';

import * as JOB from '../../../constants/job';

type PropsType = {};

type StateType = {};

type ResponseType = {};

export default class PointShop extends Component {
  state = {
    pp: 0,
    mp: 0
  };

  componentWillMount() {}

  render(props: PropsType) {
    const { state } = this;

    const minPP = 0;
    const maxPP = playerStore.getMaxPossibleFreelanceProgrammingPoints();

    const minMP = 0;
    const maxMP = playerStore.getMaxPossibleFreelanceMarketingPoints();

    const { pp, mp } = state;

    return (
      <div>

        <span>{minPP}</span>
        <span>
          <Range min={minPP} max={maxPP} onDrag={pp => { this.setState({ pp }) }} />
        </span>
        <span>{maxPP}</span>
        <Button
          text={`Купить ${pp} PP за ${JOB.PRICE_OF_ONE_PP * pp}$`}
          onClick={() => { playerActions.buyProgrammingPoints(pp) }}
        />

        <span>{minMP}</span>
        <span>
          <Range min={minMP} max={maxMP} onDrag={mp => { this.setState({ mp }) }} />
        </span>
        <span>{maxMP}</span>
        <Button
          text={`Купить ${mp} MP за ${JOB.PRICE_OF_ONE_MP * mp}$`}
          onClick={() => { playerActions.buyMarketingPoints(mp) }}
        />
      </div>
    );
  }
}
