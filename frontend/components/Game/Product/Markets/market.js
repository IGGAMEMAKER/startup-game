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

        logger.log('competitor in renderMarketCompetitors', c, name, companyClass);

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

    let body, setAsMainMarketButton;

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

    const progressBar = <div>
      <UI.Bar min={0} max={100} current={50} />
      <div>{setAsMainMarketButton}</div>
    </div>
    body = <div>
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
