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

  render({ marketId, market, id }) {
    const { userOrientedName, clients, price } = market;

    let requirementTab, setAsMainMarketButton;

    const currentRating = <ColoredRating rating={productStore.getRating(id, marketId)} />;
    const income = productStore.getMarketIncome(id, marketId);

    requirementTab = <div>
      <div>Рейтинг: {currentRating}</div>
      <div>Доход: {shortenValue(income)}$</div>
    </div>;

    if (!productStore.isMainMarket(id, marketId)) {
      setAsMainMarketButton = <div>
        <div>
          <UI.Button
            link
            text="Сделать этот рынок приоритетным"
            onClick={() => productActions.setAsMainMarket(id, marketId)}
          />
        </div>
        <span className="offset-mid">Это усилит наше влияние на 20%</span>
      </div>;
    }


    const marketSize = shortenValue(clients * price);

    return <div className="content-block">
      <div className="client-market-item">
        <div>Канал №{marketId + 1}: {userOrientedName} {setAsMainMarketButton}</div>
        <div className="offset-mid">
          <div>Объём рынка: {marketSize}$</div>
          <div className="offset-mid">
            <div>{requirementTab}</div>
            <div>{this.renderMarketCompetitors(id, marketId)}</div>
          </div>
        </div>
      </div>
    </div>
  }
}
