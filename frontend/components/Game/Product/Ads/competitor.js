import { h, Component } from 'preact';

import logger from '../../../../helpers/logger/logger';

import productStore from '../../../../stores/product-store';

import productActions from '../../../../actions/product-actions';

import UI from '../../../UI';

export default class Competitor extends Component {
  convertXPtoLvl(value) {
    return Math.floor(value / 1000);
  }

  renderFeatureList(c, productId, rents, ourCompany) {
    const ourCompanyId = 0;

    return c.features.map((f, featureId) => {
      let error;
      let differencePhrase = '';

      const difference = this.convertXPtoLvl(ourCompany.features.offer[featureId] - c.features[featureId].value);

      if (productStore.isShareableFeature(productId, featureId)) {

        if (difference > 0) {
          let canRentTech = 'hide';

          if (productStore.canRentTechFromAtoB(ourCompanyId, productId, featureId)) {
            canRentTech = 'show';
          } else {
            if (productStore.isRentingAlready(ourCompanyId, productId, featureId)) {
              error = 'Договор аренды уже был заключён между нашими компаниями';
            } else {
              error = 'Они связаны договором аренды с другой компанией';
            }
          }

          // our feature is better than competitor's one
          differencePhrase = (
            <span>
              <span className="positive">{UI.symbols.triangle.up}</span>
              <span>+{difference}lvl {error}</span>
              <span>{error}</span>
              <span className={`${canRentTech}`}>
                <UI.Button
                  text="Сдать технологию в аренду"
                  link
                  onClick={() => productActions.rentTech(ourCompanyId, productId, featureId)}
                />
              </span>
            </span>
          );
        } else if (difference <= -1) {
          let canRentTech = 'hide';

          if (productStore.canRentTechFromAtoB(productId, ourCompanyId, featureId)) {
            canRentTech = 'show';
          } else {
            if (productStore.isRentingAlready(productId, ourCompanyId, featureId)) {
              error = '(Договор аренды уже был заключён между нашими компаниями)';
            } else {
              error = '(Они связаны договором аренды с другой компанией)';
            }
          }

          differencePhrase = (
            <span>
            <span className="negative">{UI.symbols.triangle.down}</span>
            <span>{difference}lvl {error}</span>
            <span className={`${canRentTech}`}>
              <UI.Button
                text="Арендовать технологию на 1 годg"
                link
                onClick={() => productActions.rentTech(productId, ourCompanyId, featureId)}
              />
            </span>
          </span>
          );
        }

        return <li>{f.description}: {this.convertXPtoLvl(f.value)}lvl {differencePhrase}</li>;
      }

      return '';
    });
  }

  render({ rating, c, i, isCompetitor, onBuyCompany, rents, money }) {
    const ourCompany = productStore.getProduct(0);

    let background = 'competitor competeable';
    let companyTitle = `"${c.name}"`;
    let buyingCompanyButtonVisible = 'hide';

    if (isCompetitor) {
      background = 'competitor uncompeteable';
      companyTitle = `Компания №${i + 1} - "${c.name}"`;
      buyingCompanyButtonVisible = 'hide';
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
        <div className="offset-mid"><ul>{this.renderFeatureList(c, i, rents, ourCompany)}</ul></div>
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
