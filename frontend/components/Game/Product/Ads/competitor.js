import { h, Component } from 'preact';

type PropsType = {}

type StateType = {}

type ResponseType = {}

export default class Competitor extends Component {
  componentWillMount() {}

  render({ rating, c, i }) {
    const needToCompeteRating = c.rating + 1;
    const competeable = needToCompeteRating < rating;
    const canWeCompeteThem = competeable ?
      'Мы можем переманить их клиентов'
      :
      `Добейтесь рейтинга ${needToCompeteRating} и их пользователи выберут наш продукт`;

    let background = 'competitor ';
    if (competeable) {
      background += 'competeable';
    } else {
      background += 'uncompeteable';
    }

    const name = i >= 0 ? `Конкурент №${i + 1} - "${c.name}"` : `"${c.name}"`;
    // <hr width="80%" />

    const features = c.features.map((f, ii) => (<li>{f.name}: {f.value}XP</li>));

    return (
      <div className={background}>
        <div className="offset-min">{name}</div>
        <div className="offset-min">Рейтинг: {c.rating} ({canWeCompeteThem})</div>
        <div className="offset-mid">Клиенты: {c.clients} человек</div>
        <div className="offset-mid">Технологии</div>
        <div className="offset-mid"><ul>{features}</ul></div>
        <div className="offset-mid">
          <hr width="80%" />
        </div>
      </div>
    )
  }
}
