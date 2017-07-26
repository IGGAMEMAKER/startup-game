import { h, Component } from 'preact';
import flux from '../../../../flux';

import ColoredRating from '../KPI/colored-rating';

import UI from '../../../UI';

export default class Market extends Component {
  renderIncreaseInfluenceButton(id, marketId, increasingSupportCost, increasedCost) {
    if (!flux.productStore.isCanIncreaseMarketLevel(id, marketId)) return '';

    const canIncreaseInfluence = flux.productStore.getPointModificationStructured(id).marketing().diff >= increasingSupportCost;

    const benefit = <div>
      Мы заработаем на {flux.productStore.getIncomeIncreaseIfWeIncreaseInfluenceOnMarket(id, marketId)}$ больше в этом месяце
    </div>;

    return <div>
      <br />
      <UI.Button
        text="Усилить влияние"
        primary
        disabled={!canIncreaseInfluence}
        onClick={() => flux.productActions.increaseInfluenceOnMarket(id, marketId)}
      />
      <div>Стоимость поддержки после улучшения (ежемесячно): {increasedCost}MP</div>
      {benefit}
    </div>
  }

  render({ marketId, market, id }) {
    const { name, userOrientedName, clients, price, requirements } = market;

    let requirementTab = '';

    const currentRating = flux.productStore.getRating(id, marketId);


    const currentSupportCost = flux.productStore.getCurrentInfluenceMarketingCost(id, marketId);
    const increasedCost = flux.productStore.getNextInfluenceMarketingCost(id, marketId);

    let leaveMarketButton;
    const isAvailableToLeaveMarket = flux.productStore.isAvailableToLeaveMarket(id, marketId);

    if (isAvailableToLeaveMarket) {
      const income = flux.productStore.getMarketIncome(id, marketId);

      leaveMarketButton = <UI.Button
        text="Уйти с рынка"
        cancel
        onClick={() => flux.productActions.decreaseInfluenceOnMarket(id, marketId)}
      />;

      requirementTab = (
        <div>
          <div>Рейтинг: <ColoredRating rating={currentRating} /></div>
          <div>Доход: {income}$</div>
        </div>
      );
    }

    const paymentTab = <div>
      <div>Стоимость поддержки (ежемесячно): {currentSupportCost}MP</div>
      {this.renderIncreaseInfluenceButton(id, marketId, increasedCost - currentSupportCost, increasedCost)}
      <br />
      {leaveMarketButton}
    </div>;


    let competitorsTab;
    const powerList = flux.productStore.getPowerListOnMarket(marketId);

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
          {powerList.map(c => <tr><td>{c.name}</td><td>{c.power}</td><td>{c.share}</td></tr>)}
          </tbody>
        </table>
      </div>;
    } else {
      competitorsTab = <div className="positive">Рынок свободен, мы можем занять его без особых усилий!</div>
    }

    return <div className="content-block">
      <div className="client-market-item">
        <div>Канал №{marketId + 1}: {userOrientedName}</div>
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
