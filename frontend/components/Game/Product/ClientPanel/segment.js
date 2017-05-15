import { h, Component } from 'preact';
import flux from '../../../../flux';

export default class Segment extends Component {
  render({ productId, segment, id }) {
    const { name, percentage, price, rating, requirements } = segment;

    let requirementTab = '';
    const requirementsValidator = flux.productStore.requirementsOKforSegment(productId, id);

    if (requirementsValidator.valid) {
      requirementTab = (
        <div>
          <div>Рейтинг: {flux.productStore.getRating(productId, id)}</div>
        </div>
      )
    } else {
      const unmet = requirementsValidator.unmetRequirements
        .map((u, uId) => {
          return <li key={`unmet-${productId}-${uId}`}>{u.name}: Нужно {u.need}XP (на данный момент: {u.now})</li>
        });

      requirementTab = (
        <div>
          <ul>
            {unmet}
            <div>{JSON.stringify(requirementsValidator)}</div>
          </ul>
        </div>
      )
    }

            // <div>Требования: {JSON.stringify(requirements)}</div>
    return (
      <div className="client-segment-item">
        <div>Сегмент №{id}: {name}</div>
        <div className="offset-mid">
          <div>Процент пользователей: {percentage}</div>
          <div className="offset-mid">
            <div>Платёжеспособность: {price}$</div>
            <div>Приоритеты: {JSON.stringify(rating)}</div>
            <div>{requirementTab}</div>
          </div>
        </div>
      </div>
    );
  }
}
