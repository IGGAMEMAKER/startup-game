import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import productStore from '../../../stores/product-store';
import productActions from '../../../actions/product-actions';

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
    const maxPP = productStore.getMaxPossibleFreelanceProgrammingPoints();

    const minMP = 0;
    const maxMP = productStore.getMaxPossibleFreelanceMarketingPoints();

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
          onClick={() => { productActions.buyProgrammingPoints(pp) }}
        />
        <br />
        <span>{minMP}</span>
        <span>
          <UI.Range min={minMP} max={maxMP} onDrag={mp => { this.setState({ mp }) }} />
        </span>
        <span>{maxMP}</span>
        <UI.Button
          text={`Купить ${mp} MP за ${JOB.PRICE_OF_ONE_MP * mp}$`}
          onClick={() => { productActions.buyMarketingPoints(mp) }}
        />
      </div>
    );
  }
}
