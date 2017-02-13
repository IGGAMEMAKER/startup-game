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

    return (
      <div>
        <div>Invite {stream} users to your website</div>
        <Button
          item="start-campaign"
          text="Start ad campaign"
          onClick={inviteUsers(id, stream, baseCost)}
        />
        <div>Invite {stream * 5} users to your website</div>
        <Button
          item="start-campaign"
          text="Start ad campaign"
          onClick={inviteUsers(id, stream * 5, baseCost * 4.5)}
        />
        <div>Invite {stream * 25} users to your website</div>
        <Button
          item="start-campaign"
          text="Start ad campaign"
          onClick={inviteUsers(id, stream * 25, baseCost * 20)}
        />
      </div>
    );
  }
};
