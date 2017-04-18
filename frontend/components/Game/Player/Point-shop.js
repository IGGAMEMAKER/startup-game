import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import playerStore from '../../../stores/player-store';
import playerActions from '../../../actions/player-actions';

import UI from '../../UI';

import * as JOB from '../../../constants/job';

type PropsType = {};

type StateType = {};

type ResponseType = {};

export default class PointShop extends Component {
  state = {
    pp: 0,
    mp: 0
  };

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
          <UI.Range min={minPP} max={maxPP} onDrag={pp => { this.setState({ pp }) }} />
        </span>
        <span>{maxPP}</span>
        <UI.Button
          text={`Купить ${pp} PP за ${JOB.PRICE_OF_ONE_PP * pp}$`}
          onClick={() => { playerActions.buyProgrammingPoints(pp) }}
        />
        <br />
        <span>{minMP}</span>
        <span>
          <UI.Range min={minMP} max={maxMP} onDrag={mp => { this.setState({ mp }) }} />
        </span>
        <span>{maxMP}</span>
        <UI.Button
          text={`Купить ${mp} MP за ${JOB.PRICE_OF_ONE_MP * mp}$`}
          onClick={() => { playerActions.buyMarketingPoints(mp) }}
        />
      </div>
    );
  }
}
