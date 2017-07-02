import { h, Component } from 'preact';

import logger from '../../../../helpers/logger/logger';

import UI from '../../../UI';

export default class Competitor extends Component {
  convertXPtoLvl(value) {
    return Math.floor(value / 1000);
  }

  renderFeatureList(c) {
    return c.features.map(f => {
      const difference = c.improvements.filter(d => d.name === f.name);

      let differencePhrase = '';
      if (difference.length) {
        const featureDifference = this.convertXPtoLvl(difference[0].difference);

        if (featureDifference) {
          // competitor feature is better than ours
          differencePhrase = (
            <span>
              <span className="positive">{UI.symbols.triangle.up}</span>
              <span>+{featureDifference}lvl</span>
            </span>
          )
        }
      }

      return <li>{f.description}: {this.convertXPtoLvl(f.value)}lvl {differencePhrase}</li>;
    });
  }

  render({ rating, c, i, isCompetitor, onBuyCompany, money }) {
    let background = 'competitor competeable';
    let companyTitle = `"${c.name}"`;
    let buyingCompanyButtonVisible = 'hide';

    if (isCompetitor) {
      background = 'competitor uncompeteable';
      companyTitle = `Компания №${i + 1} - "${c.name}"`;
      buyingCompanyButtonVisible = '';
    }

    const hasEnoughMoney = money >= c.cost;

    const hypeChangePhrase = c.hypeDamping < 0 ? c.hypeDamping : `+${c.hypeDamping}`;

    return (
      <div className={background}>
        <div className="offset-min">{companyTitle}</div>
        <div className="offset-min">Известность (HYPE): {c.hype} ({hypeChangePhrase} ежемесячно)</div>
        <br />
        <div className="offset-min">Рейтинг: {c.rating}</div>
        <div className="offset-mid">Клиенты: {c.clients} человек</div>
        <div className="offset-mid">Технологии</div>
        <div className="offset-mid"><ul>{this.renderFeatureList(c)}</ul></div>
        <div className="offset-mid">Рыночная стоимость: {c.cost}$</div>

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
