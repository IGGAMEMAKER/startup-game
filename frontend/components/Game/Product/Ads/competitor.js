import { h, Component } from 'preact';
import round from '../../../../helpers/math/round';

import UI from '../../../UI';

type PropsType = {};

type StateType = {};

type ResponseType = {};

export default class Competitor extends Component {
  render({ rating, c, i, onBuyCompany, money }) {
    const needToCompeteRating = c.rating + 1;
    const competeable = needToCompeteRating < rating;
    const canWeCompeteThem = competeable ?
      'Мы можем переманить их клиентов'
      :
      `Добейтесь рейтинга ${round(needToCompeteRating)} и их пользователи выберут наш продукт`;

    let background = 'competitor ';
    if (competeable) {
      background += 'competeable';
    } else {
      background += 'uncompeteable';
    }

    const name = i >= 0 ? `Конкурент №${i + 1} - "${c.name}"` : `"${c.name}"`;
    // <hr width="80%" />

    const features = c.features.map((f, ii) => (<li>{f.name}: {f.value}XP</li>));

    const hasEnoughMoney = money >= c.cost;

    const improvements = JSON.stringify(c.improvements);

    return (
      <div className={background}>
        <div className="offset-min">{name}</div>
        <div className="offset-min">Рейтинг: {c.rating} ({canWeCompeteThem})</div>
        <div className="offset-mid">Клиенты: {c.clients} человек</div>
        <div className="offset-mid">Технологии</div>
        <div className="offset-mid"><ul>{features}</ul></div>
        <div className="offset-mid">Рыночная стоимость: ${c.cost}$</div>
        <div className="offset-mid">Улучшения: ${improvements}$</div>

        <div className={`offset-mid ${i === -1 ? 'hide' : ''}`}>
          <UI.Button
            text={`Купить компанию за ${c.cost}$`}
            primary={hasEnoughMoney}
            disabled={!hasEnoughMoney}
            onClick={onBuyCompany ? onBuyCompany : () => {}}
          />
        </div>


        <div className="offset-mid">
          <hr width="80%" />
        </div>
      </div>
    )
  }
}
