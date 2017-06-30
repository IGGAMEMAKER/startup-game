import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import stageHelper from '../../../../helpers/stages';
import UI from '../../../UI';

import flux from '../../../../flux';
import logger from '../../../../helpers/logger/logger';

export default class AdvertPlannerPanel extends Component {
  render({ id }) {
    const costPerClient = flux.productStore.getCostPerClient(id);
    const money = flux.playerStore.getMoney();

    const ads = [
      { clients: 200, text: 'Повысить HYPE на 200 очков', mp: 100 },
      { clients: 1000, text: 'Повысить HYPE на 1000 очков', mp: 500 },
      { clients: 10000, text: 'Повысить HYPE на 10000 очков', mp: 1750 }
    ].map((c, i) => Object.assign({}, c, { campaignCost: Math.ceil(c.clients * costPerClient) } ));

    const list = ads.map(this.renderAdvert(money, id)).reverse();

    return (
      <div>
        <ul>
          {list}
        </ul>
      </div>
    );
  }

  renderAdvert = (money, id) => a => {
    const { clients, text, mp, campaignCost } = a;

    const disabled = !flux.playerStore.enoughMarketingPoints(mp) || money < campaignCost;

    let error;
    if (money < campaignCost) {
      error = `Нужно больше золота! На вашем счету: ${money}$, а нужно ${campaignCost}$`;
    } else if (disabled) {
      error = 'У вас не хватает маркетинговых очков';
    }

    return (
      <li>
        {text}
        <br />
        <div>Стоимость рекламной кампании: {campaignCost}$ и {mp}MP </div>
        <div>{error}</div>
        <UI.Button
          item={`start-campaign ${clients}`}
          text="Начать рекламную кампанию"
          onClick={() => this.startAdCampaign(id, clients, campaignCost, mp)}
          disabled={disabled}
          primary
        />
        <br />
      </li>
    )
  };

  startAdCampaign = (id, amountOfUsers, cost, mp) => {
    if (flux.playerStore.getMoney() >= cost) {
      if (stageHelper.isFirstAdCampaignMission()) {
        stageHelper.onFirstAdCampaignMissionCompleted();
      }

      flux.productActions.addHype(id, amountOfUsers);

      flux.playerActions.increaseMoney(-cost);
      flux.playerActions.spendPoints(0, mp);
    }
  };
};
