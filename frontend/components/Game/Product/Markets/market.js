import { h, Component } from 'preact';

import productStore from '../../../../stores/product-store';
import productActions from '../../../../actions/product-actions';
import shortenValue from '../../../../helpers/math/shorten-value';

import ColoredRating from '../KPI/colored-rating';

import UI from '../../../UI';

import logger from '../../../../helpers/logger/logger';

import MainFeature from '../MainFeature';

export default class Market extends Component {
  state = {
    showCompetitors: false
  };

  toggleCompetitors = () => {
    this.setState({
      showCompetitors: !this.state.showCompetitors
    })
  };

  renderMarketCompetitors(id, marketId, showCompetitors) {
    // id is ourCompanyId
    logger.log(marketId, id, 'renderMarketCompetitors', productStore.getCompetitorsList());

    const powerList = productStore.getPowerListOnMarket(marketId)
      .map(c => {
        const companyId = c.companyId;
        const name = productStore.getName(companyId);

        let companyClass;

        if (companyId === id) {
          companyClass = 'our-company';
        }

        const share = Math.floor(c.share * 100);

        return <tr className={companyClass}>
          <td>{name}</td>
          <td>{c.power}</td>
          <td>{share}</td>
        </tr>
      });


    if (powerList.length) {
      // return <div></div>;
      return <div>
        <br />
        <div onClick={this.toggleCompetitors}>Участники рынка (свернуть/развернуть)</div>
        <table className="table bordered-table" style={{ display: showCompetitors ? 'block' : 'none' }}>
          <thead>
          <th>Компания</th>
          <th>Известность</th>
          <th>Доля, %</th>
          </thead>
          <tbody>
          {powerList}
          </tbody>
        </table>
      </div>;
    }

    return <div className="positive">Рынок свободен, мы можем занять его без особых усилий!</div>
  }

  renderSetMainMarketButton = (id, marketId) => {
    return <div></div>;
    return <div>
      <UI.Button
        link
        text="Сделать этот рынок приоритетным"
        onClick={() => productActions.setAsMainMarket(id, marketId)}
      />
      <span className="offset-mid">Это усилит наше влияние на 20%</span>
    </div>
  };

  renderBestFeatureButton(id, marketId) {
    const upgrade = productStore.getBestFeatureUpgradeVariantOnMarket(id, marketId);

    logger.log('renderBFB', upgrade);
    // <MainFeature />

    return <div>
      <div>{JSON.stringify(upgrade)}</div>
    </div>;
  }

  render({ marketId, market, id, explored }) {
    const { userOrientedName, clients, price } = market;

    let setAsMainMarketButton;

    const marketInfo = productStore.getCurrentMarketInfo(id, marketId);

    const currentRating = <ColoredRating rating={productStore.getRating(id, marketId)} />;
    const income = productStore.getMarketIncome(id, marketId);

    if (!productStore.isMainMarket(id, marketId)) {
      setAsMainMarketButton = <div>
        <div>
          {this.renderSetMainMarketButton(id, marketId)}
        </div>
      </div>;
    }

    const buttons = [
      {
        hype: 10, cost: 1000, name: 'Пост в соцсети'
      },
      // {
      //   hype: 15, cost: 5000, name: 'Таргетинг'
      // },
      // {
      //   hype: 20, cost: 10000, name: 'Вирусное видео'
      // }
    ];

    const improveInfluenceButtons = buttons.map(b => {
      const upgradeable = productStore.getMoney(id) >= b.cost;
      const text = `${b.name} (+${b.hype})`;

      return (
        <div className="influence-button">
          <UI.Button
            disabled={!upgradeable}
            secondary={upgradeable}
            gray={!upgradeable}
            text={text}
            onClick={() => productActions.addHype(id, marketId, b.hype, b.cost)}
          />
          <div>Стоимость: {b.cost}$</div>
        </div>
      )
    });

    const currentHype = marketInfo.value;
    const nextMonthHype = Math.floor(0.9 * currentHype);
    const barData = [
      {
        value: nextMonthHype,
        style: ''
      }, {
        value: currentHype - nextMonthHype,
        style: 'progress-bar-striped progress-bar-animated bg-danger'
      }
    ];

    // <div>Известность: {currentHype} из {marketInfo.max} ({nextMonthHype} в следующем месяце)</div>
    //   <div>Известность снизится на {currentHype - nextMonthHype}</div>
    const progressBar = <div>
      <UI.Bar min={marketInfo.min} max={marketInfo.max} data={barData} renderValues />
      <br />
      <div>{improveInfluenceButtons}</div>
    </div>;

    const marketSize = shortenValue(clients * price);

    const bestFeatureButton = this.renderBestFeatureButton(id, marketId);

    // if (!explored) return <div>UNEXPLORED</div>

    return (
      <div className="segment-block"  style={{  }}>
        <div className="content-block">
          <div className="client-market-item">
            <div className="segment-title">{userOrientedName}</div>
            <div className="segment-attribute">Доход</div>
            <div className="segment-value">{shortenValue(income)} / {marketSize}$</div>
            <div className="segment-attribute">Рейтинг</div>
            <div className="segment-value">{currentRating}</div>
            <div className="segment-value">{bestFeatureButton}</div>
            <br />
            <div>Известность: {marketInfo.value} из {marketInfo.max}</div>
            <div style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
              {progressBar}
            </div>
            <br />
            <div>{this.renderMarketCompetitors(id, marketId, this.state.showCompetitors)}</div>
          </div>
        </div>
      </div>
    );
  }
}
