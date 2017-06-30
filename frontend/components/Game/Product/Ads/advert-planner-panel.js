import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import stageHelper from '../../../../helpers/stages';
import UI from '../../../UI';

import flux from '../../../../flux';
import logger from '../../../../helpers/logger/logger';

export default class AdvertPlannerPanel extends Component {
  inviteUsers = (id, amountOfUsers, cost, mp, ourClients) => () => {
    if (flux.playerStore.getMoney() >= cost) {
      if (ourClients + amountOfUsers > 200 && stageHelper.isFirstAdCampaignMission()) {
        stageHelper.onFirstAdCampaignMissionCompleted();
      }

      // flux.productActions.addClients(id, amountOfUsers);
      flux.productActions.addHype(id, amountOfUsers);

      flux.playerActions.increaseMoney(-cost);
      flux.playerActions.spendPoints(0, mp);
    }
  };

  renderAdCampaignGenerator(id, clients, campaignText, mp, money) {
    const costPerClient = flux.productStore.getCostPerClient(id);
    const campaignCost = Math.ceil(clients * costPerClient);

    const {
      ourClients,
    } = flux.productStore.getMaxAmountOfPossibleClients(id, money);

    let error;

    const disabled = !flux.playerStore.enoughMarketingPoints(mp);

    if (money < campaignCost) {
      error = `Нужно больше золота! На вашем счету: ${money}$, а нужно ${campaignCost}$`;
    } else if (disabled) {
      error = 'У вас не хватает маркетинговых очков';
    }

    return (
      <li>
        {campaignText}
        <br />
        <div>Стоимость рекламной кампании: {campaignCost}$ и {mp}MP </div>
        <div>{error}</div>
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

  render({ id }) {
    const costPerClient = flux.productStore.getCostPerClient(id);
    const money = flux.playerStore.getMoney();
    const enoughPoints = a => flux.playerStore.enoughMarketingPoints(a.mp);

    let error;
    const ads = [
      { clients: 200, text: 'Повысить HYPE на 200 очков', mp: 100 },
      { clients: 1000, text: 'Повысить HYPE на 1000 очков', mp: 500 },
      { clients: 10000, text: 'Повысить HYPE на 10000 очков', mp: 1750 }
    ].map((c, i) => Object.assign({}, c, { cost: c.clients * costPerClient } ));

    const cheapAd = ads[0];

    if (money < cheapAd.cost) {
      error = `Для проведения рекламной кампании нужно ${cheapAd.cost}$`;
    }

    if (!enoughPoints({ mp: cheapAd.mp })) {
      error = `Для проведения рекламной кампании нужно ${cheapAd.mp}MP`;
    }

    let list;
    if (ads.length) {
      list = ads.map(a => this.renderAdCampaignGenerator(id, a.clients, a.text, a.mp, money)).reverse();
    } else {
      list = <div>{error}</div>;
    }

    return (
      <div>
        <ul>
          {list}
        </ul>
      </div>
    );
  }
};
