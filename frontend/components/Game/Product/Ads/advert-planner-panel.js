import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';
import stageHelper from '../../../../helpers/stages';
import UI from '../../../UI';

import flux from '../../../../flux';
import logger from '../../../../helpers/logger/logger';

import Competitors from './competitors';


export default class AdvertPlannerPanel extends Component {
  state = {
    possibleClients: 0,
    toggle: true
  };

  componentWillMount() {}

  onDrag = possibleClients => {
    this.setState({ possibleClients })
  };

  inviteUsers = (id, amountOfUsers, cost, ourClients) => () => {
    if (flux.playerStore.getMoney() >= cost) {
      logger.debug('inviteUsers', ourClients, amountOfUsers, stageHelper.isFirstAdCampaignMission());
      if (ourClients + amountOfUsers > 200 && stageHelper.isFirstAdCampaignMission()) {
        stageHelper.onFirstAdCampaignMissionCompleted();
      }

      flux.productActions.addClients(id, amountOfUsers);
      flux.playerActions.increaseMoney(-cost);

      this.onDrag(0);
    }
  };

  render({ id }, { possibleClients }) {
    const costPerClient = flux.productStore.getCostPerClient(id);
    const marketStats = flux.productStore.getMaxAmountOfPossibleClients(id, flux.playerStore.getMoney());
    const {
      potentialClients,
      marketSize,
      ourClients,
      unbeatableClients,
      amount,
      // freeClients,
    } = marketStats;

    const maxPossibleClients = amount; // Math.floor(playerStore.getMoney() / costPerClient);
    const campaignCost = Math.ceil(possibleClients * costPerClient);

    return (
      <div>
        <div>Объём рынка: {marketSize} человек</div>
        <div>Наши клиенты: {ourClients} человек</div>
        <div>Клиенты, которых мы не можем переманить: {unbeatableClients} человек</div>
        <Competitors id={id} />
        <div>Наша потенциальная аудитория: {potentialClients}
          ({marketSize} - {ourClients} - {unbeatableClients})
        </div>

        <UI.Range min={0} max={maxPossibleClients} onDrag={this.onDrag} />
        <div>
          <div>Пригласить {possibleClients} клиентов за {campaignCost}$</div>
          <UI.Button
            item="start-campaign"
            text="Начать рекламную кампанию"
            onClick={this.inviteUsers(id, possibleClients, campaignCost, ourClients)}
            primary
          />
        </div>
      </div>
    );
  }
};
