import { h, Component } from 'preact';

import logger from '../../../../helpers/logger/logger';

import productStore from '../../../../stores/product-store';

import UI from '../../../UI';

export default class Competitor extends Component {
  convertXPtoLvl(value) {
    return Math.floor(value / 1000);
  }

  renderFeatureList(c, productId, ourCompany) {
    return c.features.map((f, featureId) => {
      let differencePhrase = '';

      const difference = this.convertXPtoLvl(ourCompany.features.offer[featureId] - c.features[featureId].value);

      if (productStore.isShareableFeature(productId, featureId)) {

        if (difference > 0) {
          // our feature is better than ours
          differencePhrase = (
            <span>
            <span className="positive">{UI.symbols.triangle.up}</span>
            <span>+{difference}lvl</span>
            <UI.Button text="Сдать технологию в аренду" link />
          </span>
          );
        } else if (difference <= -1) {
          differencePhrase = (
            <span>
            <span className="negative">{UI.symbols.triangle.down}</span>
            <span>{difference}lvl</span>
            <UI.Button text="Арендовать технологию" link />
          </span>
          );
        }

        // {difference} {JSON.stringify(c)} |||||||| {JSON.stringify(ourCompany)}
        return <li>{f.description}: {this.convertXPtoLvl(f.value)}lvl {differencePhrase}</li>;
      }

      return '';
    });
  }

  render({ rating, c, i, isCompetitor, onBuyCompany, money }) {
    const ourCompany = productStore.getProduct(0);

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
    //
    return (
      <div className={background}>
        <div className="offset-min">{companyTitle}</div>
        <div className="offset-min">Известность (HYPE): {c.hype} ({hypeChangePhrase} ежемесячно)</div>
        <br />

        <div className="offset-min">Рейтинг: {c.rating}</div>
        <div className="offset-mid">Клиенты: {c.clients} человек</div>
        <div className="offset-mid">Технологии</div>
        <div className="offset-mid"><ul>{this.renderFeatureList(c, i, ourCompany)}</ul></div>
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
