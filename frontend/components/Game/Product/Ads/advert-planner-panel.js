import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import stageHelper from '../../../../helpers/stages';
import UI from '../../../UI';

import flux from '../../../../flux';
import logger from '../../../../helpers/logger/logger';

export default class AdvertPlannerPanel extends Component {
  render({ id }) {
    const costPerClient = flux.productStore.getCostPerClient(id);
    const money = flux.productStore.getMoney();

    const ads = [
      { hype: 200, text: 'Заметка в тематическом блоге', mp: 100 },
      { hype: 1000, text: 'Провести конкурс', mp: 500 },
      { hype: 10000, text: 'Вирусное видео', mp: 1750 }
    ].map((c, i) => Object.assign({}, c, { campaignCost: Math.ceil(c.hype * costPerClient) } ));

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
    const { hype, text, mp, campaignCost } = a;

    const disabled = !flux.productStore.enoughMarketingPoints(mp) || money < campaignCost;

    let error;
    if (money < campaignCost) {
      error = `Нужно больше золота! На вашем счету: ${money}$, а нужно ${campaignCost}$`;
    } else if (disabled) {
      error = 'У вас не хватает маркетинговых очков';
    }

    return (
      <li>
        {text} (+{hype}HYPE)
        <br />
        <div>Стоимость: {campaignCost}$ и {mp}MP </div>
        <div>{error}</div>
        <UI.Button
          item={`start-campaign ${hype}`}
          text="Начать рекламную кампанию"
          onClick={() => this.startAdCampaign(id, hype, campaignCost, mp)}
          disabled={disabled}
          primary
        />
        <br />
      </li>
    )
  };

  startAdCampaign = (id, amountOfUsers, cost, mp) => {
    if (flux.productStore.getMoney() >= cost) {
      if (stageHelper.isFirstAdCampaignMission()) {
        stageHelper.onFirstAdCampaignMissionCompleted();
      }

      flux.productActions.addHype(id, amountOfUsers);

      flux.productActions.increaseMoney(-cost);
      flux.productActions.spendPoints(0, mp);
    }
  };
};
