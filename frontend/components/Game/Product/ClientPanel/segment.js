import { h, Component } from 'preact';
import flux from '../../../../flux';

import ColoredRating from '../KPI/colored-rating';

export default class Segment extends Component {
  render({ productId, segment, id }) {
    const { name, userOrientedName, percentage, price, rating, requirements } = segment;

    let requirementTab = '';
    const requirementsValidator = flux.productStore.requirementsOKforSegment(productId, id);

    const currentRating = flux.productStore.getRating(productId, id);

    if (requirementsValidator.valid) {
      requirementTab = (
        <div>
          <div>Рейтинг: <ColoredRating rating={currentRating} /></div>
        </div>
      )
    } else {
      const unmet = requirementsValidator.unmetRequirements
        .map((u, uId) => {
          return <li key={`unmet-${productId}-${uId}`}>{u.name}: Нужно {u.need}XP (на данный момент: {u.now})</li>
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

    if (clients < 100) return '';

    return (
      <div className="client-segment-item">
        <div>Сегмент №{id + 1}: {userOrientedName}</div>
        <div className="offset-mid">
          <div>Клиенты: {clients} человек</div>
          <div className="offset-mid">
            <div>Платёжеспособность: {price}$</div>
            <div>Приоритеты: {priorities}</div>
            <div>{requirementTab}</div>
          </div>
        </div>
      </div>
    );
  }
}
