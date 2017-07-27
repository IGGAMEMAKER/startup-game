import { h, Component } from 'preact';

import productStore from '../../../../stores/product-store';
import productActions from '../../../../actions/product-actions';

import ColoredRating from '../KPI/colored-rating';

import UI from '../../../UI';

export default class Market extends Component {
  renderIncreaseInfluenceButton(id, marketId, increasingSupportCost, increasedCost) {
    if (!productStore.isCanIncreaseMarketLevel(id, marketId)) return '';

    const canIncreaseInfluence = productStore.getPointModificationStructured(id).marketing().diff >= increasingSupportCost;

    const benefit = <div>
      Мы заработаем на {productStore.getIncomeIncreaseIfWeIncreaseInfluenceOnMarket(id, marketId)}$ больше в этом месяце
    </div>;

    return <div>
      <br />
      <UI.Button
        text="Усилить влияние"
        primary
        disabled={!canIncreaseInfluence}
        onClick={() => productActions.increaseInfluenceOnMarket(id, marketId)}
      />
      <div>Стоимость поддержки после улучшения (ежемесячно): {increasedCost}MP</div>
      {benefit}
    </div>
  }

  render({ marketId, market, id }) {
    const { name, userOrientedName, clients, price, requirements } = market;

    let requirementTab = '';

    const currentRating = productStore.getRating(id, marketId);


    const currentSupportCost = productStore.getCurrentInfluenceMarketingCost(id, marketId);
    const increasedCost = productStore.getNextInfluenceMarketingCost(id, marketId);

    let leaveMarketButton;
    const isAvailableToLeaveMarket = productStore.isAvailableToLeaveMarket(id, marketId);

    if (isAvailableToLeaveMarket) {
      const income = productStore.getMarketIncome(id, marketId);

      leaveMarketButton = <UI.Button
        text="Уйти с рынка"
        cancel
        onClick={() => productActions.decreaseInfluenceOnMarket(id, marketId)}
      />;

      requirementTab = (
        <div>
          <div>Рейтинг: <ColoredRating rating={currentRating} /></div>
          <div>Доход: {income}$</div>
          <div>Стоимость поддержки (ежемесячно): {currentSupportCost}MP</div>
        </div>
      );
    }

    const paymentTab = <div>
      {this.renderIncreaseInfluenceButton(id, marketId, increasedCost - currentSupportCost, increasedCost)}
      <br />
      {leaveMarketButton}
    </div>;


    let competitorsTab;
    const powerList = productStore.getPowerListOnMarket(marketId)
      .map(c => {
        let companyClass;

        if (c.companyId === id) {
          companyClass = 'our-company';
        }

        let sendPartnershipButton = <div className="partnership-button-area">
          <UI.Button
            link
            text="Стать партнёрами"
            onClick={() => {productActions.offerPartnership(id, c.companyId, marketId)}}
          />
        </div>;

        const hasPartnershipWithUs = productStore.isPartneredOnMarket(id, c.companyId, marketId);

        if (hasPartnershipWithUs) {
          companyClass = 'partner-company';
        }

        if (c.companyId === id || !isAvailableToLeaveMarket) {
          sendPartnershipButton = '';
        } else if (hasPartnershipWithUs) {
          sendPartnershipButton = <div className="partnership-button-area">
            <UI.Button
              link
              text="Разорвать партнёрство"
              onClick={() => {productActions.revokePartnership(id, c.companyId, marketId)}}
            />
          </div>;
        }

        return <tr className={companyClass}>
          <td>{c.name} {sendPartnershipButton}</td>
          <td>{c.power}</td>
          <td>{c.share}</td>
        </tr>
      });

    if (powerList.length) {
      // competitorsTab = JSON.stringify(powerList);
      competitorsTab = <div>
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
    } else {
      competitorsTab = <div className="positive">Рынок свободен, мы можем занять его без особых усилий!</div>
    }

    const isMainMarket = productStore.isMainMarket(id, marketId);

    let setAsMainMarketButton;
    if (isAvailableToLeaveMarket && !isMainMarket) {
      setAsMainMarketButton = <div>
        <div><UI.Button link text="Сделать этот рынок приоритетным" onClick={() => productActions.setAsMainMarket(id, marketId)} /></div>
        <span className="offset-mid">Это усилит наше влияние на 20%</span>
      </div>;
    }

    return <div className="content-block">
      <div className="client-market-item">
        <div>Канал №{marketId + 1}: {userOrientedName} {setAsMainMarketButton}</div>
        <div className="offset-mid">
          <div>Объём рынка: {clients * price}$</div>
          <div className="offset-mid">
            <div>{requirementTab}</div>
            <div>{paymentTab}</div>

            <div>{competitorsTab}</div>
          </div>
        </div>
      </div>
    </div>
  }
}
