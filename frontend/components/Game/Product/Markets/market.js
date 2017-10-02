import { h, Component } from 'preact';

import productStore from '../../../../stores/product-store';
import productActions from '../../../../actions/product-actions';
import shortenValue from '../../../../helpers/math/shorten-value';

import ColoredRating from '../KPI/colored-rating';

import UI from '../../../UI';

export default class Market extends Component {
  renderMarketCompetitors(id, marketId) {
    const powerList = productStore.getPowerListWithCompanyNames(marketId)
      .map(c => {
        let companyClass;
        let switchPartnershipStatusButton;

        const hasPartnershipWithUs = productStore.isPartneredOnMarket(id, c.companyId, marketId);

        if (c.companyId === id) {
          companyClass = 'our-company';
        }

        if (hasPartnershipWithUs) {
          companyClass = 'partner-company';
        }

        if (c.companyId === id) {
        } else if (hasPartnershipWithUs) {
          switchPartnershipStatusButton = <div className="partnership-button-area revoke">
            <UI.Button
              default
              text="Разорвать партнёрство"
              onClick={() => { productActions.revokePartnership(id, c.companyId, marketId) }}
            />
          </div>;
        } else {
          switchPartnershipStatusButton = <div className="partnership-button-area">
            <UI.Button
              link
              text="Стать партнёрами"
              onClick={() => { productActions.offerPartnership(id, c.companyId, marketId) }}
            />
          </div>;
        }

        return <tr className={companyClass}>
          <td>{c.name} {switchPartnershipStatusButton}</td>
          <td>{c.power}</td>
          <td>{c.share}</td>
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
