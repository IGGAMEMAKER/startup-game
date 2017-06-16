import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';
import stageHelper from '../../../../helpers/stages';
import UI from '../../../UI';

import flux from '../../../../flux';
import logger from '../../../../helpers/logger/logger';

export default class AdvertPlannerPanel extends Component {
  state = {
    toggle: true
  };

  componentWillMount() {}

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

    const market = flux.productStore.getMarketShare(id);

    const marketStats = flux.productStore.getMaxAmountOfPossibleClients(id, money);
    const {
      potentialClients,
      ourClients,
    } = marketStats;

    let error;

    const disabled = !flux.playerStore.enoughMarketingPoints(mp);

    if (money < campaignCost || clients > market.marketSize || clients > potentialClients) {
      error = `Нужно больше золота! На вашем счету: ${money}$, а нужно ${campaignCost}$`;
      // return <div>Нужно больше золота! На вашем счету: {money}$, а нужно {campaignCost}$</div>
      // return <div></div>;
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
    const marketStats = flux.productStore.getMaxAmountOfPossibleClients(id, flux.playerStore.getMoney());

    const { potentialClients } = marketStats;

    const ads = [
      { clients: 200, text: 'Повысить HYPE на 200 очков', mp: 100 },
      { clients: 1000, text: 'Повысить HYPE на 1000 очков', mp: 500 },
      { clients: 10000, text: 'Повысить HYPE на 10000 очков', mp: 1750 },
      { clients: 50000, text: 'Повысить HYPE на 50000 очков', mp: 5500 },
      // { clients: 300000, text: 'Привести 300000 клиентов', mp: 150 }
    ].map((c, i) => Object.assign({}, c, { cost: c.clients * costPerClient } ));

    const money = flux.playerStore.getMoney();

    const enoughMoney = a => Math.ceil(a.clients * costPerClient) < money;
    const noClientOverflow = a => a.clients < potentialClients;
    const enoughPoints = a => flux.playerStore.enoughMarketingPoints(a.mp);

    let error;
    const cheapAd = ads[0];

    if (money < cheapAd.cost) {
      error = `Для проведения рекламной кампании нужно ${cheapAd.cost}$`;
    }

    if (!enoughPoints({ mp: cheapAd.mp })) {
      error = `Для проведения рекламной кампании нужно ${cheapAd.mp}MP`;
    }


    let adList = ads
      // .filter(noClientOverflow)
      // .filter(enoughMoney)
      // .filter(enoughPoints);

    let list;

    // if (!ads.filter(enoughMoney))

    if (adList.length) {
      list = adList.map(a => this.renderAdCampaignGenerator(id, a.clients, a.text, a.mp, money)).reverse();
    } else {
      list = <div>{error}</div>;
      // if (!ads.filter(noClientOverflow).length) {
      //   list = <div>
      //     Мы привлекли всех клиентов, которых могли.
      //     Улучшайте рейтинг, чтобы увеличить потенциальную аудиторию
      //   </div>
      // }
      //
      // if (!ads.filter(enoughMoney).length) {
      //   list = 'нет доступных рекламных кампаний. Нужно больше золота!';
      // }
      //
      // if (!ads.filter(enoughPoints).length) {
      //   list = 'Недостаточно Маркетинговых очков (MP). Минимум: 15MP';
      // }
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
