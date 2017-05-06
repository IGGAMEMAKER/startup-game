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

    // <hr width="80%" />
    return (
      <div className={background}>
        <div className="offset-min">Конкурент №{i + 1} - "{c.name}"</div>
        <div className="offset-min">Рейтинг: {c.rating} ({canWeCompeteThem})</div>
        <div className="offset-mid">Клиенты: {c.clients} человек</div>
        <div className="offset-mid">
          <hr width="80%" />
        </div>
      </div>
    )
  }
}
