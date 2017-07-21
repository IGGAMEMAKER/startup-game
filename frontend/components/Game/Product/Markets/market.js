import { h, Component } from 'preact';
import flux from '../../../../flux';

import ColoredRating from '../KPI/colored-rating';

import UI from '../../../UI';

import pointModification from '../../../../helpers/points/modification';

export default class Market extends Component {
  renderIncreaseInfluenceButton(id, marketId, marketingBaseCost) {
    if (!flux.productStore.isCanIncreaseMarketLevel(id, marketId)) return '';

    const canIncreaseInfluence = pointModification.marketing().diff >= marketingBaseCost;

    return <UI.Button
      text="Усилить влияние"
      primary
      disabled={!canIncreaseInfluence}
      onClick={() => flux.productActions.increaseInfluenceOnMarket(id, marketId)}
    />
  }

  render({ marketId, market, id }) {
    const { name, userOrientedName, clients, price, requirements } = market;

    let requirementTab = '';
    const requirementsValidator = flux.productStore.requirementsOKforMarket(id, marketId);

    const currentRating = flux.productStore.getRating(id, marketId);

    if (requirementsValidator.valid) {
      const income = flux.productStore.getMarketIncome(id, marketId);

      requirementTab = (
        <div>
          <div>Рейтинг: <ColoredRating rating={currentRating} /></div>
          <div>Доход: {income}$</div>
        </div>
      )
    } else {
      const unmet = requirementsValidator.unmetRequirements
        .map((u, uId) => {
          return <li key={`unmet-${id}-${uId}`}>
            {u.name}: {Math.ceil(u.need / 1000)}lvl
          </li>
        });

      requirementTab = (
        <div>
          <div>! Требования</div>
          <ul>
            {unmet}
          </ul>
        </div>
      )
    }

    const marketingBaseCost = 10;

    let leaveMarketButton;
    const isAvailableToLeaveMarket = flux.productStore.isAvailableToLeaveMarket(id, marketId);

    if (isAvailableToLeaveMarket) {
      leaveMarketButton = <UI.Button
        text="Уйти с рынка"
        cancel
        onClick={() => flux.productActions.decreaseInfluenceOnMarket(id, marketId)}
      />
    }

    const paymentTab = <div>
      <div>Стоимость поддержки (ежемесячно): {marketingBaseCost}MP</div>
      {this.renderIncreaseInfluenceButton(id, marketId, marketingBaseCost)}
      <br />
      {leaveMarketButton}
    </div>;

    // return <div>{marketId}</div>


    let competitorsTab;
    const powerList = flux.productStore.getPowerListOnMarket(marketId);

    if (powerList.length) {
      // competitorsTab = JSON.stringify(powerList);
      competitorsTab = <div>
        <table>
          <thead>
            <th>Компания</th>
            <th>Влияние</th>
          </thead>
          <tbody>
            {powerList.map(c =>
              <tr>
                <td>{c.name}</td>
                <td>{c.power}</td>
              </tr>
            )}
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
