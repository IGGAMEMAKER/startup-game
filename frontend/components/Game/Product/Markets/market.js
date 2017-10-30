import { h, Component } from 'preact';

import productStore from '../../../../stores/product-store';
import productActions from '../../../../actions/product-actions';
import shortenValue from '../../../../helpers/math/shorten-value';

import ColoredRating from '../KPI/colored-rating';

import UI from '../../../UI';

import logger from '../../../../helpers/logger/logger';

export default class Market extends Component {
  renderMarketCompetitors(id, marketId) {
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
      return <div>
        <br />
        <div>Участники рынка</div>
        <table className="table bordered-table">
          <thead>
          <th>Компания</th>
          <th>Влияние</th>
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

  render({ marketId, market, id, explored }) {
    const { userOrientedName, clients, price } = market;

    let setAsMainMarketButton;

    const marketInfo = productStore.getCurrentMarketInfo(id, marketId);

    const currentRating = <ColoredRating rating={productStore.getRating(id, marketId)} />;
    const income = productStore.getMarketIncome(id, marketId);

    if (!productStore.isMainMarket(id, marketId)) {
      setAsMainMarketButton = <div>
        <div>
          <UI.Button
            secondary
            text="Сделать этот рынок приоритетным"
            onClick={() => productActions.setAsMainMarket(id, marketId)}
          />
        </div>
        <span className="offset-mid">Это усилит наше влияние на 20%</span>
      </div>;
    }

    const buttons = [{
      hype: 10, cost: 1000, name: 'Пост в соцсети'
    }, {
      hype: 15, cost: 5000, name: 'Таргетинг'
    }, {
      hype: 20, cost: 10000, name: 'Вирусное видео'
    }];

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

    const progressBar = <div>
      <div>{setAsMainMarketButton}</div>
      <br />
      <div>Известность: {marketInfo.value} из {marketInfo.max}</div>
      <UI.Bar min={marketInfo.min} max={marketInfo.max} data={marketInfo.value} />
      <br />
      <div>{improveInfluenceButtons}</div>
    </div>;

    const body = <div>
      <div>Рейтинг: {currentRating}</div>
      <div>Доход: {shortenValue(income)}$</div>
      <br />
      <div style={{ width: '60%', marginLeft: 'auto', marginRight: 'auto' }}>{progressBar}</div>
      <div>{this.renderMarketCompetitors(id, marketId)}</div>
    </div>;

    const marketSize = shortenValue(clients * price);

    // if (!explored) return <div>UNEXPLORED</div>

    return <div className="content-block">
      <div className="client-market-item">
        <div>Рынок: {userOrientedName} (Объём: {marketSize}$)</div>
        <div className="offset-mid">
          <div className="offset-mid">
            <div>{body}</div>
          </div>
        </div>
      </div>
    </div>
  }
}
