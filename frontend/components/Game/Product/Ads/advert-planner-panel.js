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

  inviteUsers = (id, amountOfUsers, cost, mp, ourClients) => () => {
    if (flux.playerStore.getMoney() >= cost) {
      if (ourClients + amountOfUsers > 200 && stageHelper.isFirstAdCampaignMission()) {
        stageHelper.onFirstAdCampaignMissionCompleted();
      }

      flux.productActions.addClients(id, amountOfUsers);
      flux.playerActions.increaseMoney(-cost);
      flux.playerActions.spendPoints(0, mp);

      this.onDrag(0);
    }
  };

  renderAdCampaignGenerator(id, clients, campaignText, mp, money) {
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

    const disabled = !flux.playerStore.enoughMarketingPoints(mp);

    return (
      <li>
        {campaignText}
        <br />
        <div>Стоимость рекламной кампании: {campaignCost}$ и {mp}MP </div>
        <div>{disabled ? 'У вас не хватает маркетинговых очков' : ''}</div>
        <UI.Button
          item={`start-campaign ${clients}`}
          text="Начать рекламную кампанию"
          onClick={this.inviteUsers(id, clients, campaignCost, mp, ourClients)}
          disabled={disabled}
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
    } = marketStats;

    const ads = [
      { clients: 200, text: 'Привести 200 клиентов', mp: 10 },
      { clients: 1000, text: 'Привести 1000 клиентов', mp: 10 },
      { clients: 10000, text: 'Привести 10000 клиентов', mp: 50 },
      { clients: 50000, text: 'Привести 50000 клиентов', mp: 75 },
      { clients: 300000, text: 'Привести 300000 клиентов', mp: 150 }
    ];

    const money = flux.playerStore.getMoney();

    const enoughMoney = a => Math.ceil(a.clients * costPerClient) < money;
    const noClientOverflow = a => a.clients < potentialClients;
    const enoughPoints = a => flux.playerStore.enoughMarketingPoints(a.mp);

    let adList = ads
      .filter(noClientOverflow)
      .filter(enoughMoney)
      .filter(enoughPoints);

    let list;

    // if (!ads.filter(enoughMoney))

    if (adList.length) {
      list = adList.map(a => this.renderAdCampaignGenerator(id, a.clients, a.text, a.mp, money)).reverse();
    } else {
      if (!ads.filter(noClientOverflow).length) {
        list = 'Мы привлекли всех клиентов, которых могли. Улучшайте рейтинг, чтобы увеличить потенциальную аудиторию';
      }

      if (!ads.filter(enoughMoney).length) {
        list = 'нет доступных рекламных кампаний. Нужно больше золота!';
      }

      if (!ads.filter(enoughPoints).length) {
        list = 'Недостаточно Маркетинговых очков (MP). Минимум: 15MP';
      }
    }

        // <div>Наша потенциальная аудитория: {potentialClients} человек</div>
    return (
      <div>
        <ul>
          {list}
        </ul>
      </div>
    );
  }
};
