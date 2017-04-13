import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

type PropsType = {};

import UI from '../../../UI';

import productActions from '../../../../actions/product-actions';
import playerActions from '../../../../actions/player-actions';

import productStore from '../../../../stores/product-store';
import playerStore from '../../../../stores/player-store';

export default class AdvertPlannerPanel extends Component {
  state = {
    possibleClients: 0
  };

  componentWillMount() {}

  onDrag = (possibleClients) => {
    this.setState({ possibleClients })
  };

  inviteUsers = (id, amountOfUsers, cost) => () => {
    if (playerStore.getMoney() >= cost) {
      productActions.addClients(id, amountOfUsers);
      playerActions.increaseMoney(-cost);

      this.onDrag(0);
    }
  };

  render() {
    const { props, state } = this;

    const id = props.id;
    const costPerClient = productStore.getCostPerClient(id);
    const competitors = [
      { rating: 7.2, clients: 3000 },
      { rating: 3.5, clients: 500 },
      { rating: 6, clients: 2000 }
    ];

    const marketStats = productStore.getMaxAmountOfPossibleClients(id, playerStore.getMoney(), competitors);
    const maxAvailableClients = marketStats.amount;

    const { possibleClients } = state;

    const maxPossibleClients = maxAvailableClients; // Math.floor(playerStore.getMoney() / costPerClient);
    const campaignCost = Math.ceil(possibleClients * costPerClient);

    return (
      <div>
        <UI.Range min={0} max={maxPossibleClients} onDrag={this.onDrag} />
        <div>market size: {marketStats.marketSize}</div>
        <div>av cli: {marketStats.potentialClients}</div>
        <div>
          <div>Пригласить {possibleClients} клиентов за {campaignCost}$</div>
          <UI.Button
            item="start-campaign"
            text="Начать рекламную кампанию"
            onClick={this.inviteUsers(id, possibleClients, campaignCost)}
            primary
          />
        </div>
      </div>
    );
  }
};
