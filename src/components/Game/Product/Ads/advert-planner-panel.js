// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

type PropsType = {};

import Button from '../../../Shared/Button';
import Range from '../../../Shared/Range';

import productActions from '../../../../actions/product-actions';
import playerActions from '../../../../actions/player-actions';

import productStore from '../../../../stores/product-store';
import playerStore from '../../../../stores/player-store';

export default class AdvertPlannerPanel extends Component {
  state = {
    possibleClients: 100
  };

  componentWillMount() {}

  render() {
    const { props, state } = this;

    const id = props.id;
    const stream = 100;
    const baseCost = 10;

    const inviteUsers = (id, amountOfUsers, cost) => () => {
      if (playerStore.getMoney() >= cost) {
        productActions.addClients(id, amountOfUsers);
        playerActions.increaseMoney(-cost);
      }
    };

    const renderAdCampaignButton = (users, cost) => {
      return (
        <div>
          <div>Invite {users} users to your website for {cost}$</div>
          <Button
            item="start-campaign"
            text={`Start ad campaign for ${cost}$`}
            onClick={inviteUsers(id, users, cost)}
          />
        </div>
      )
    };

    const onDrag = (possibleClients) => {
      this.setState({ possibleClients })
    };

    const { possibleClients } = state;
    return (
      <div>
        <Range min={stream} max={stream * 1000} onDrag={onDrag} />
        {renderAdCampaignButton(possibleClients, possibleClients * baseCost / stream)}
      </div>
    );
  }
};
