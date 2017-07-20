import { h, Component } from 'preact';
import flux from '../../../../flux';

import ColoredRating from '../KPI/colored-rating';

import UI from '../../../UI';

import pointModification from '../../../../helpers/points/modification';

export default class Market extends Component {
  render({ marketId, market, id }) {
    const { name, userOrientedName, clients, price, requirements, marketingBaseCost,
      levelsOfInfluence, marketingActivityBaseCost } = market;

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

    const canIncreaseInfluence = pointModification.marketing().diff >= marketingBaseCost;

    const isAvailableToLeaveMarket = flux.productStore.getMarketInfluenceOfCompany(id, marketId);

    const levels = flux.productStore.getMarketLevels(id, marketId);

    const reachedHighestLevel = levels.current === levels.max;

    const paymentTab = <div>
      <div>Стоимость поддержки (ежемесячно): {marketingBaseCost}MP</div>
      {
        reachedHighestLevel ? ''
          :
          <UI.Button
            text="Усилить влияние"
            primary
            disabled={!canIncreaseInfluence}
            onClick={() => flux.productActions.increaseInfluenceOnMarket(id, marketId)}
          />

      }
      <br />
      {
        isAvailableToLeaveMarket
          ?
          <UI.Button
            text="Уйти с рынка"
            cancel
            onClick={() => flux.productActions.decreaseInfluenceOnMarket(id, marketId)}
          />
          :
          ''
      }
    </div>;

    return <div className="content-block">
      <div className="client-market-item">
        <div>Канал №{marketId + 1}: {userOrientedName}</div>
        <div className="offset-mid">
          <div>Объём рынка: {clients * price}$</div>
          <div className="offset-mid">
            {
              isAvailableToLeaveMarket
                ?
                <div>Текущее влияние: {levels.current}/{levels.max}</div>
                :
                <div></div>
            }
            <div>{requirementTab}</div>
            <div>{paymentTab}</div>
          </div>
        </div>
      </div>
    </div>
  }
}
