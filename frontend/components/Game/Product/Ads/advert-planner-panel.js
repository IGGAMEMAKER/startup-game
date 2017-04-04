import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

type PropsType = {};

import Button from '../../../Shared/Button';
import Range from '../../../Shared/Range';

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


    const { possibleClients } = state;

    const maxPossibleClients = Math.floor(playerStore.getMoney() / costPerClient);
    const campaignCost = Math.ceil(possibleClients * costPerClient);

    return (
      <div>
        <Range min={0} max={maxPossibleClients} onDrag={this.onDrag} />
        <div>
          <div>Invite {possibleClients} users to your website for {campaignCost}$</div>
          <Button
            item="start-campaign"
            text={`Start ad campaign for ${campaignCost}$`}
            onClick={this.inviteUsers(id, possibleClients, campaignCost)}
            primary
          />
        </div>
      </div>
    );
  }
};
