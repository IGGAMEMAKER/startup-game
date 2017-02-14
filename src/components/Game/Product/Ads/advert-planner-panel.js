// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

type PropsType = {};

import Button from '../../../Shared/Button';

import productActions from '../../../../actions/product-actions';
import playerActions from '../../../../actions/player-actions';

import productStore from '../../../../stores/product-store';
import playerStore from '../../../../stores/player-store';

export default class AdvertPlannerPanel extends Component {
  state = {};

  componentWillMount() {}

  render() {
    const { props } = this;

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

    return (
      <div>
        {renderAdCampaignButton(stream, baseCost)}
        {renderAdCampaignButton(stream * 5, baseCost * 4.5)}
        {renderAdCampaignButton(stream * 25, baseCost * 20)}
        {renderAdCampaignButton(stream * 100, baseCost * 80)}
        {renderAdCampaignButton(stream * 1000, baseCost * 750)}
      </div>
    );
  }
};
