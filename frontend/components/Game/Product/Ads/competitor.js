import { h, Component } from 'preact';
import round from '../../../../helpers/math/round';

import logger from '../../../../helpers/logger/logger';

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

    const features = c.features.map((f, ii) => {
      // logger.debug('compet improvs', i, c.improvements, f);
      logger.shit('EXTRA SHIT!!! I=== -1 IS HARDCODED CHECKING FOR OUR COMPANY. REWRITE THIS');

      const difference = c.improvements.filter(d => d.name === f.name);

      let differencePhrase = '';
      if (difference.length) {
        // competitor feature is better than ours

        differencePhrase = (
          <span>
            <span className="positive">{UI.symbols.triangle.up}</span>
            (+{difference[0].difference} XP)
          </span>
        )
      } else {
        differencePhrase = ''; // <span className="negative">{UI.symbols.up}</span>;
      }

      return (
        <li>{f.description}: {f.value}XP {differencePhrase}</li>
      );
    });

    const hasEnoughMoney = money >= c.cost;

    let theyAreBetterPhrase = '';

    const betterFeaturesCount = c.improvements.length;
    if (betterFeaturesCount) {
      theyAreBetterPhrase = (
        <div className="offset-mid">Они лучше нас в {betterFeaturesCount} областях</div>
      )
    }

    const buyingCompanyButtonVisible = i === -1 ? 'hide' : '';

    return (
      <div className={background}>
        <div className="offset-min">{name}</div>
        <div className="offset-min">Рейтинг: {c.rating} ({canWeCompeteThem})</div>
        <div className="offset-mid">Клиенты: {c.clients} человек</div>
        <div className="offset-mid">Технологии</div>
        {theyAreBetterPhrase}
        <div className="offset-mid"><ul>{features}</ul></div>
        <div className="offset-mid">Рыночная стоимость: ${c.cost}$</div>

        <div className={`offset-mid ${buyingCompanyButtonVisible}`}>
          <UI.Button
            text={`Купить компанию "${c.name}"`}
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
