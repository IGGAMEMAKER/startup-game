import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import UI from '../../../UI';

import flux from '../../../../flux';


export default class AdvertPlannerPanel extends Component {
  state = {
    possibleClients: 0,
    toggle: true
  };

  componentWillMount() {}

  onDrag = (possibleClients) => {
    this.setState({ possibleClients })
  };

  inviteUsers = (id, amountOfUsers, cost) => () => {
    if (flux.playerStore.getMoney() >= cost) {
      flux.productActions.addClients(id, amountOfUsers);
      flux.playerActions.increaseMoney(-cost);

      this.onDrag(0);
    }
  };

  renderCompetitors(competitors, rating, freeClients) {
    return (
      <div>
        <div className="offset-min competitor competeable">Свободные клиенты: {freeClients}</div>
        <div>{competitors.map(this.renderCompetitor(rating))}</div>
      </div>
    )
  }

  renderCompetitor = rating => (c, i) => {
    const needToCompeteRating = c.rating + 1;
    const competeable = needToCompeteRating < rating;
    const canWeCompeteThem = competeable ?
      'Мы можем переманить их клиентов'
      :
      `Добейтесь рейтинга ${needToCompeteRating} и их пользователи выберут наш продукт`;

    let background = 'competitor ';
    if (competeable) {
      background += 'competeable';
    } else {
      background += 'uncompeteable';
    }
        // <hr width="80%" />
    return (
      <div className={background}>
        <div className="offset-min">Конкурент №{i + 1} - "{c.name}"</div>
        <div className="offset-min">Рейтинг: {c.rating} ({canWeCompeteThem})</div>
        <div className="offset-mid">Клиенты: {c.clients} человек</div>
        <div className="offset-mid">
          <hr width="80%" />
        </div>
      </div>
    )
  };

  render({ id }, { possibleClients }) {
    const costPerClient = flux.productStore.getCostPerClient(id);
    const competitors = [
      { rating: 8.2, clients: 30000, name: 'WEB HOSTING 1' },
      { rating: 3.5, clients: 15000, name: 'WEB HOSTING 2' },
      { rating: 6, clients: 4500, name: 'WEB HOSTING 3' }
    ].sort((a, b) => a.rating > b.rating);

    const marketStats = flux.productStore.getMaxAmountOfPossibleClients(id, flux.playerStore.getMoney(), competitors);
    const {
      potentialClients,
      marketSize,
      ourClients,
      unbeatableClients,
      amount,
      // freeClients,
    } = marketStats;
    const freeClients = marketSize - ourClients - unbeatableClients;

    const maxPossibleClients = amount; // Math.floor(playerStore.getMoney() / costPerClient);
    const campaignCost = Math.ceil(possibleClients * costPerClient);

    return (
      <div>
        <div>Объём рынка: {marketSize} человек</div>
        <div>Наши клиенты: {ourClients} человек</div>
        <div>Клиенты, которых мы не можем переманить: {unbeatableClients} человек</div>
        <div>{this.renderCompetitors(competitors, flux.productStore.getRating(id), freeClients)}</div>
        <div>Наша потенциальная аудитория: {potentialClients}
          ({marketSize} - {ourClients} - {unbeatableClients})
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
