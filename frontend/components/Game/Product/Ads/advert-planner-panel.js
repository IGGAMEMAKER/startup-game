import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';
import stageHelper from '../../../../helpers/stages';
import UI from '../../../UI';

import flux from '../../../../flux';
import logger from '../../../../helpers/logger/logger';

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
      if (ourClients + amountOfUsers > 200 && stageHelper.isFirstAdCampaignMission()) {
        stageHelper.onFirstAdCampaignMissionCompleted();
      }

      flux.productActions.addClients(id, amountOfUsers);
      flux.playerActions.increaseMoney(-cost);

      this.onDrag(0);
    }
  };

  renderAdCampaignGenerator(id, clients, campaignText, money) {
    const costPerClient = flux.productStore.getCostPerClient(id);
    const campaignCost = Math.ceil(clients * costPerClient);

    const market = flux.productStore.getMarketShare(id);

    const marketStats = flux.productStore.getMaxAmountOfPossibleClients(id, money);
    const {
      potentialClients,
      ourClients,
    } = marketStats;



    if (money < campaignCost || clients > market.marketSize || clients > potentialClients) {
      return <div></div>;
      // return <div>Нужно больше золота! На вашем счету: {money}$, а нужно {campaignCost}$</div>
    }

    return (
      <li>
        {campaignText}
        <br />
        <div>Вы получите {clients} клиентов за {campaignCost}$</div>
        <UI.Button
          item={`start-campaign ${clients}`}
          text="Начать рекламную кампанию"
          onClick={this.inviteUsers(id, clients, campaignCost, ourClients)}
          primary
        />
        <br />
      </li>
    )
  }

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

        // <div>Объём рынка: {marketSize} человек</div>
        // <div>Наши клиенты: {ourClients} человек</div>
        // <div>Клиенты, которых мы не можем переманить: {unbeatableClients} человек</div>
        // <div>Наша потенциальная аудитория: {potentialClients}
        //   ({marketSize} - {ourClients} - {unbeatableClients})
        // </div>

    // <UI.Range min={0} max={maxPossibleClients} onDrag={this.onDrag} />
    // <div>
    // <div>Пригласить {possibleClients} клиентов за {campaignCost}$</div>
    // <UI.Button
    // item="start-campaign"
    // text="Начать рекламную кампанию"
    // onClick={this.inviteUsers(id, possibleClients, campaignCost, ourClients)}
    // primary
    // />
    // </div>

    const ads = [
      { clients: 200, text: 'Привести 200 клиентов' },
      { clients: 1000, text: 'Привести 1000 клиентов' },
      { clients: 10000, text: 'Привести 10000 клиентов' },
      { clients: 50000, text: 'Привести 50000 клиентов' },
      { clients: 300000, text: 'Привести 300000 клиентов' }
    ];

    const money = flux.playerStore.getMoney();

    const enoughMoney = a => Math.ceil(a.clients * costPerClient) < money;
    const noClientOverflow = a => a.clients < potentialClients;

    let adList = ads
      .filter(noClientOverflow)
      .filter(enoughMoney);

    let list;

    // if (!ads.filter(enoughMoney))

    if (adList.length) {
      list = adList.map(a => this.renderAdCampaignGenerator(id, a.clients, a.text, money)).reverse();
    } else {
      list = 'no campaigns available';
    }

    return (
      <div>
        <div>Наша потенциальная аудитория: {potentialClients} человек</div>
        <ul>
          {list}
        </ul>
      </div>
    );
  }
};
