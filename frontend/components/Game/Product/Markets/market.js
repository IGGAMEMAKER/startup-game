import { h, Component } from 'preact';

import productStore from '../../../../stores/product-store';
import productActions from '../../../../actions/product-actions';

import ColoredRating from '../KPI/colored-rating';

import UI from '../../../UI';

export default class Market extends Component {
  renderIncreaseInfluenceButton(id, marketId, increasingSupportCost, increasedCost) {
    if (!productStore.isCanIncreaseMarketLevel(id, marketId)) return '';

    const canIncreaseInfluence = productStore.getPointModificationStructured(id).marketing().diff >= increasingSupportCost;

    const benefit = productStore.getIncomeIncreaseIfWeIncreaseInfluenceOnMarket(id, marketId);

    return <div>
      <br />
      <UI.Button
        text="Усилить влияние"
        primary
        disabled={!canIncreaseInfluence}
        onClick={() => productActions.increaseInfluenceOnMarket(id, marketId)}
      />
      <div>Стоимость поддержки после улучшения (ежемесячно): {increasedCost}MP</div>
      <div>Мы заработаем на {benefit}$ больше в этом месяце</div>
    </div>
  }

  renderMarketCompetitors(id, marketId, isAvailableToLeaveMarket) {
    const powerList = productStore.getPowerListOnMarket(marketId)
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

        if (c.companyId === id || !isAvailableToLeaveMarket) {
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

    let requirementTab, leaveMarketButton, setAsMainMarketButton;

    const increasedCost = productStore.getNextInfluenceMarketingCost(id, marketId);
    const currentSupportCost = productStore.getCurrentInfluenceMarketingCost(id, marketId);

    const isAvailableToLeaveMarket = productStore.isAvailableToLeaveMarket(id, marketId);


    if (isAvailableToLeaveMarket) {
      const currentRating = <ColoredRating rating={productStore.getRating(id, marketId)} />;
      const income = productStore.getMarketIncome(id, marketId);

      requirementTab = <div>
        <div>Рейтинг: {currentRating}</div>
        <div>Доход: {income}$</div>
        <div>Стоимость поддержки (ежемесячно): {currentSupportCost}MP</div>
      </div>;

      leaveMarketButton = <UI.Button
        cancel
        text="Уйти с рынка"
        onClick={() => productActions.decreaseInfluenceOnMarket(id, marketId)}
      />;

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
    }

    return <div className="content-block">
      <div className="client-market-item">
        <div>Канал №{marketId + 1}: {userOrientedName} {setAsMainMarketButton}</div>
        <div className="offset-mid">
          <div>Объём рынка: {clients * price}$</div>
          <div className="offset-mid">
            <div>{requirementTab}</div>

            <div>
              <div>
                {this.renderIncreaseInfluenceButton(id, marketId, increasedCost - currentSupportCost, increasedCost)}
                <br />
                {leaveMarketButton}
              </div>
            </div>

            <div>{this.renderMarketCompetitors(id, marketId, isAvailableToLeaveMarket)}</div>
          </div>
        </div>
      </div>
    </div>
  }
}
