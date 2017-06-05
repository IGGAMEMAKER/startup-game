import { h, Component } from 'preact';
import flux from '../../../../flux';

import ColoredRating from '../KPI/colored-rating';

export default class Segment extends Component {
  renderSegment(id, userOrientedName, clients, price, requirementTab) {
    return (
      <div className="client-segment-item">
        <div>Группа №{id + 1}: {userOrientedName}</div>
        <div className="offset-mid">
          <div>Клиенты: {clients} человек</div>
          <div className="offset-mid">
            <div>Платёжеспособность: {price}$</div>
            <div>{requirementTab}</div>
          </div>
        </div>
      </div>
    );
  }

  render({ productId, segment, id }) {
    const { name, userOrientedName, percentage, price, rating, requirements } = segment;

    let requirementTab = '';
    const requirementsValidator = flux.productStore.requirementsOKforSegment(productId, id);

    const currentRating = flux.productStore.getRating(productId, id);

    if (requirementsValidator.valid) {
      const income = Math.floor(flux.productStore.getSegmentIncome(productId, id));
      requirementTab = (
        <div>
          <div>Рейтинг: <ColoredRating rating={currentRating} /></div>
          <div>Доход: {income}$</div>
        </div>
      )
    } else {
      const unmet = requirementsValidator.unmetRequirements
        .map((u, uId) => {
          return <li key={`unmet-${productId}-${uId}`}>
            {u.name}: Нужно {u.need}XP (на данный момент: {u.now})
          </li>
        });

      // <div>{JSON.stringify(requirementsValidator)}</div>

      requirementTab = (
        <div>
          <div>! Требования</div>
          <ul>
            {unmet}
          </ul>
        </div>
      )
    }

            // <div>Требования: {JSON.stringify(requirements)}</div>
            // <div>Приоритеты: {JSON.stringify(rating)}</div>
    const clients = flux.productStore.getClients(productId, id);
    const priorities = flux.productStore.getSegmentedPriorities(productId, id)
      .filter(s => s.rating > 0)
      .map(s => s.feature)
      .join(', ');

    if (clients < 100) return this.renderSegment(id, userOrientedName, '???', '???', 'Приведите больше клиентов, чтобы открыть эту группу');

    return this.renderSegment(id, userOrientedName, clients, price, requirementTab);
  }
}
