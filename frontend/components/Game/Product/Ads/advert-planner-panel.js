import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import stageHelper from '../../../../helpers/stages';
import UI from '../../../UI';

import flux from '../../../../flux';
import logger from '../../../../helpers/logger/logger';

export default class AdvertPlannerPanel extends Component {
  render({ id }) {
    const costPerClient = flux.productStore.getCostPerClient(id);
    const money = flux.productStore.getMoney(id);

    const willGetClientsWithoutAd = flux.productStore.getClientTransformations()[id].increase;

    const ads = [
      { hype: 200, text: 'Заметка в тематическом блоге', mp: 100 },
      { hype: 1000, text: 'Провести конкурс', mp: 500 },
      { hype: 10000, text: 'Вирусное видео', mp: 1750 }
    ].map((c, i) => Object.assign({}, c, { campaignCost: Math.ceil(c.hype * costPerClient) } ));

    const list = ads.map(this.renderAdvert(money, id, willGetClientsWithoutAd)).reverse();

    return (
      <div>
        <ul>
          {list}
        </ul>
      </div>
    );
  }

  renderAdvert = (money, id, currentIncrease) => a => {
    const { hype, text, mp, campaignCost } = a;

    let disabled = true;

    let error;
    if (money < campaignCost) {
      error = `Нужно больше золота! На вашем счету: ${money}$, а нужно ${campaignCost}$`;
    } else if (!flux.productStore.enoughMarketingPoints(mp, id)) {
      error = 'У вас не хватает маркетинговых очков';
    } else {
      disabled = false;
    }

    // const benefit = flux.productStore.getClientTransformations(id, hype)[id].increase - currentIncrease;
    const benefit = JSON.stringify(flux.productStore.getClientTransformations(id, hype)[id]);

    return (
      <li>
        {text} (+{hype}HYPE)
        <br />
        <div>Стоимость: {campaignCost}$ и {mp}MP </div>
        <div>Мы привлечём на {benefit} клиентов больше в следующем месяце</div>
        <div>{JSON.stringify(flux.productStore.getClientTransformations(id, hype)[id])}</div>
        <div>{JSON.stringify(flux.productStore.getClientTransformations()[id])}</div>
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

  startAdCampaign = (id, hype, cost, mp) => {
    if (stageHelper.isFirstAdCampaignMission()) {
      stageHelper.onFirstAdCampaignMissionCompleted();
    }

    flux.productActions.addHype(id, hype);

    flux.productActions.increaseMoney(-cost, id);
    flux.productActions.spendPoints(0, mp);
  };
};
