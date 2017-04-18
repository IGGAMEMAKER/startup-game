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
    possibleClients: 0,
    toggle: true,
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

  renderCompetitors(competitors, rating) {
    return (
      <div>
        <h6>Конкуренты</h6>
        <div>{competitors.map(this.renderCompetitor(rating))}</div>
      </div>
    )
  }

  renderCompetitor = rating => (c, i) => {
    return (
      <div>
        <div className="offset-min">{c.name}: {c.rating}/10</div>
        <div className="offset-mid">Клиенты: {c.clients} человек</div>
      </div>
    )
  };

  render({ id }, { possibleClients }) {
    const costPerClient = productStore.getCostPerClient(id);
    const competitors = [
      { rating: 7.2, clients: 3000, name: 'WEB HOSTING 1' },
      { rating: 3.5, clients: 500, name: 'WEB HOSTING 2' },
      { rating: 6, clients: 2000, name: 'WEB HOSTING 3' }
    ];

    const marketStats = productStore.getMaxAmountOfPossibleClients(id, playerStore.getMoney(), competitors);
    const {
      potentialClients,
      marketSize,
      ourClients,
      unbeatableClients,
      amount
    } = marketStats;

    const maxPossibleClients = amount; // Math.floor(playerStore.getMoney() / costPerClient);
    const campaignCost = Math.ceil(possibleClients * costPerClient);

    return (
      <div>
        <div>Объём рынка: {marketSize} человек</div>
        <div>Наши клиенты: {ourClients} человек</div>
        <div>Клиенты, которых мы не можем переманить: {unbeatableClients} человек</div>
        <div>{this.renderCompetitors(competitors, productStore.getRating(id))}</div>
        <div>Ваша потенциальная аудитория:
          {potentialClients} ({marketSize} - {ourClients} - {unbeatableClients})
        </div>

        <UI.Range min={0} max={maxPossibleClients} onDrag={this.onDrag} />
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
