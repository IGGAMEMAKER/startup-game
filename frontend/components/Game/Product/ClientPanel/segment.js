import { h, Component } from 'preact';

export default class Segment extends Component {
  render({ productId, segment, id }) {
    const { name, percentage, price, rating, requirements } = segment;

    return (
      <div className="client-segment-item">
        <div>Сегмент №{id}: {name}</div>
        <div className="offset-mid">
          <div>Процент пользователей: {percentage}</div>
          <div className="offset-mid">
            <div>Платёжеспособность: {price}$</div>
            <div>Приоритеты: {JSON.stringify(rating)}</div>
          </div>
        </div>
      </div>
    );
  }
}
