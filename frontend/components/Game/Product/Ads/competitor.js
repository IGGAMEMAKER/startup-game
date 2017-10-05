import { h, Component } from 'preact';

import logger from '../../../../helpers/logger/logger';

import productStore from '../../../../stores/product-store';
import scheduleStore from '../../../../stores/schedule-store';

import productActions from '../../../../actions/product-actions';

import shortenValue from '../../../../helpers/math/shorten-value';


import UI from '../../../UI';

export default class Competitor extends Component {
  convertXPtoLvl(value) {
    return value;
  }

  renderFeatureList(c, productId, rents: Array, ourCompany) {
    const ourCompanyId = 0;

    const getRentPrice = (level, f, featureId) => {
      // logger.debug('getRentPrice', level, f, featureId);

      return Math.ceil(this.convertXPtoLvl(level) * 2000 / 12);
    };

    return c.features.map((f, featureId) => {
      let error;
      let differencePhrase = '';

      const ourLevel = ourCompany.features.offer[featureId];
      const competitorLevel = f.value;

      const difference = this.convertXPtoLvl(ourLevel - competitorLevel);

      if (productStore.isShareableFeature(productId, featureId)) {
        let price;
        let canRentTech = 'hide';

        let sender;
        let acceptor;

        let rentPhrase;
        let symbol;
        let symbolColor;

        let level;

        let rentStatus = {
          canAccept: true,
          canSend: true,
          weCanSend: true,
          weCanAccept: true,
          phrase: ''
        };

        const they = productStore.getRentingStatus(productId, featureId);
        rentStatus.theyCanAccept = they.canAccept;
        rentStatus.theyCanSend = they.canSend;

        const we = productStore.getRentingStatus(ourCompanyId, featureId);
        rentStatus.weCanAccept = we.canAccept;
        rentStatus.weCanSend = we.canSend;

        const weHaveConnectionAlready = productStore.isRentingAlready(productId, ourCompanyId, featureId);

        rents
          .filter(r => r.featureId === featureId && (r.out === productId || r.in === productId))
          .forEach(r => {
            const level = this.convertXPtoLvl(r.value);

            if (r.in === productId) {
              // if company accepts tech, it is frozen for any operations on this feature
              let name = r.out === ourCompanyId ? 'нас' : `"${r.senderName}"`;

              rentStatus.rentFromName = name;
              rentStatus.level = `(${level}lvl)`;

              rentStatus.canAccept = false;
              rentStatus.canSend = false;
            }

            if (r.out === productId) {
              // if company sends tech, it cannot accept anything, but can send this feature
              rentStatus.canAccept = false;
              rentStatus.canSend = true;
              rentStatus.phrase = 'Они сдают эту технологию в аренду';
            }
          });

        if (difference > 0) {
          // our feature is better than competitor's one
          sender = ourCompanyId;
          acceptor = productId;

          symbol = UI.symbols.triangle.up;
          symbolColor = "positive";

          price = getRentPrice(ourLevel, f, featureId);

          rentPhrase = `Сдать технологию в аренду на год (${price}$/мес)`;
          level = `+${difference}`;

          // we have incoming rent contract with another company
          // we have outgoing rent contract with another company

          if (rentStatus.weCanSend) {
            if (rentStatus.theyCanAccept) {
              rentStatus.phrase = ''; // 'Мы можем сдать эту технологию в аренду';
              rentStatus.available = true;
            } else {
              if (weHaveConnectionAlready) {
                rentStatus.phrase = 'Мы уже связаны договором';
              } else {
                rentStatus.phrase = 'Они связаны договором с другой компанией';
              }
            }
          } else {
            rentStatus.phrase = 'Мы уже арендуем эту технологию';
          }
        } else if (difference <= -1) {
          // we are worse than competitors
          acceptor = ourCompanyId;
          sender = productId;

          symbol = UI.symbols.triangle.down;
          symbolColor = "negative";

          price = getRentPrice(competitorLevel, f, featureId);

          rentPhrase = `Арендовать технологию на год (${price}$/мес)`;
          level = difference;

          if (rentStatus.weCanAccept) {
            if (rentStatus.theyCanSend) {
              rentStatus.phrase =''; // 'Мы можем арендовать эту технологию';
              rentStatus.available = true;
            } else {
              rentStatus.phrase = `Они арендуют эту технологию у компании 
              "${rentStatus.rentFromName}" ${rentStatus.level}`;
            }
          } else {
            if (weHaveConnectionAlready) {
              rentStatus.phrase = 'Мы уже связаны договором с этой компанией';
            } else {
              rentStatus.phrase = 'Мы связаны договором с другой компанией';
            }
          }
        }

        // errors
        // we have rent contract already with this company

        if (rentStatus.available) {
          canRentTech = 'show';
        }

        error = '';

        let until = scheduleStore.getNextYear();

        differencePhrase = (
          <span>
            <span className={symbolColor}>{symbol}</span>
            <span>{level}lvl {rentStatus.phrase}</span>
            <div>{error}</div>
            <span className={`${canRentTech}`}>
              <UI.Button
                text={rentPhrase}
                secondary
                onClick={() => productActions.rentTech(sender, acceptor, featureId, price, until)}
              />
            </span>
          </span>
        );

        if (Math.abs(difference) < 1) {
          rentStatus.phrase = '';
          differencePhrase = '';
        }
        differencePhrase = '';

        return <li>{f.description}: {this.convertXPtoLvl(f.value)}lvl {differencePhrase}</li>;
      }

      return '';
    });
  }

  render({ rating, c, i, isCompetitor, onBuyCompany, rents, money }) {
    const ourCompany = productStore.getProduct(0);

    let background = 'competitor competeable';
    let companyTitle = `${c.name} (Это мы)`;
    let buyingCompanyButtonVisible = 'hide';

    if (isCompetitor) {
      background = 'competitor uncompeteable';
      companyTitle = c.name;
      buyingCompanyButtonVisible = 'hide';
    }

    const hasEnoughMoney = money >= c.cost;

    const companyCost = shortenValue(c.cost);
    const companyIncome = shortenValue(c.income);

    return <tr className={background}>
      <td>
        <div>{companyTitle}</div>
        <div className="secondary-text">{c.style}</div>
      </td>
      <td>{companyCost}$</td>
      <td>{companyIncome}$ / мес</td>
      <td><ul>{this.renderFeatureList(c, i, rents, ourCompany)}</ul></td>
      <td>{c.XP}XP</td>
    </tr>;


    return (
      <div className={background}>
        <div className="offset-min">{companyTitle}</div>
        <br />

        <div className="offset-mid">Стиль развития: {c.style}</div>
        <div className="offset-mid">Технологии</div>
        <div className="offset-mid"><ul>{this.renderFeatureList(c, i, rents, ourCompany)}</ul></div>
        <div className="offset-mid">Рыночная стоимость: {c.cost}$</div>
        <div className="offset-mid">Доходы: {c.income}$</div>
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
