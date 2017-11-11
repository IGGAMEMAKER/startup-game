import { h, Component } from 'preact';

import productStore from '../../../../stores/product-store';
import productActions from '../../../../actions/product-actions';
import shortenValue from '../../../../helpers/math/shorten-value';

import ColoredRating from '../KPI/colored-rating';

import UI from '../../../UI';

import logger from '../../../../helpers/logger/logger';

import coloringRange from '../../../../helpers/coloring-range';

export default class Market extends Component {
  state = {
    showCompetitors: false
  };

  toggleCompetitors = () => {
    this.setState({
      showCompetitors: !this.state.showCompetitors
    })
  };

  shortenCompanyName = (name: String) => {
    const length = 11;
    if (name.length > length) {
      if (name.length < length + 3) {
        return name;
      }
      return name.substr(0, length) + '...';
    }

    return name;
  };

  renderMarketCompetitors(id, marketId, showCompetitors) {
    // id is ourCompanyId

    const powerList = productStore.getPowerListOnMarket(marketId)
      .map(c => {
        const companyId = c.companyId;
        const name = productStore.getName(companyId);

        let companyClass;

        if (companyId === id) {
          companyClass = 'our-company';
        }

        const share = Math.floor(c.share * 100);

        return <tr className={companyClass}>
          <td>{this.shortenCompanyName(name)}</td>
          <td>{c.power}</td>
          <td>{share}</td>
        </tr>
      });


    if (powerList.length) {
      // return <div></div>;
      return <div>
        <br />
        <div onClick={this.toggleCompetitors}>Участники рынка (свернуть/развернуть)</div>
        <table className="table bordered-table" style={{ display: showCompetitors ? 'block' : 'none' }}>
          <thead>
          <th>Компания</th>
          <th>Известность</th>
          <th>Доля, %</th>
          </thead>
          <tbody>
          {powerList}
          </tbody>
        </table>
      </div>;
    }

    return <div className="positive">Рынок свободен, мы можем занять его без особых усилий!</div>
  }

  renderSetMainMarketButton = (id, marketId) => {
    return <div></div>;
    return <div>
      <UI.Button
        link
        text="Сделать этот рынок приоритетным"
        onClick={() => productActions.setAsMainMarket(id, marketId)}
      />
      <span className="offset-mid">Это усилит наше влияние на 20%</span>
    </div>
  };

  renderBestFeatureButton(id, marketId) {
    const cost = productStore.getFeatureIncreaseXPCost(id);

    const XP = productStore.getXP(id);

    const upgrade = productStore.getBestFeatureUpgradeVariantOnMarket(id, marketId);

    const name = productStore.getPrettyFeatureNameByFeatureId(id, upgrade.featureId);

    const maxBenefit = productStore.getProductIncomeIncreaseIfWeUpgradeFeature(id, upgrade.featureId, 1);
    const income =  shortenValue(maxBenefit);


    const isFullyUpgraded = income === 0;
    const noXP = XP < cost;

    const disabled = isFullyUpgraded || noXP;

    if (isFullyUpgraded) {
      return <div>Ваш продукт идеален!</div>
    }

    const text = <div>
      <div>Улучшить технологию</div>
      <div>"{name}"</div>
    </div>;

    let button = <UI.Button
      onClick={() => this.improveFeature(id, upgrade.featureId, cost)}
      text={text}
      primary
      disabled={disabled}
    />;

    if (noXP) {
      button = <div>Нужно XP: {cost}</div>;
    }

      // <div className="segment-attribute">{name} >>> {upgrade.level} LVL</div>
    return <div>
      {button}
      <div className="segment-value">Доход: +${income}</div>
    </div>;
  }

  improveFeature(id, featureId, xp) {
    productActions.improveFeature(id, 'offer', featureId, 1, xp);
  }

  renderUnexploredMarket = (marketId, market, id) => {
    const { userOrientedName, clients, price } = market;

    const marketSize = shortenValue(clients * price);

    const explorationCost = productStore.getMarketExplorationCost(id, marketId);

    // style={{ display: 'none' }}

    const disabled = productStore.getXP(id) < explorationCost;

    const joinMarket = () => {
      productActions.joinMarket(id, marketId, explorationCost);
    };

    return <div>
      <div>UNEXPLORED {marketId}</div>

      <div className="segment-block">
        <div className="content-block">
          <div className="client-market-item">
            <div className="segment-title">{userOrientedName}</div>
            <hr color="white"/>

            <div className="segment-attribute">Объём рынка</div>
            <div className="segment-value">${marketSize}</div>
            <hr color="white"/>

            <div>
              <div className="segment-attribute">Стоимость исследования</div>
              <div className="segment-value">{explorationCost}XP</div>
              <UI.Button
                text="Исследовать рынок"
                secondary={!disabled}
                alert={disabled}
                disabled={disabled}
                onClick={joinMarket}
              />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>;
  };

  render({ marketId, market, id, explored }) {
    if (!explored) return this.renderUnexploredMarket(marketId, market, id);


    const { userOrientedName, clients, price } = market;

    let setAsMainMarketButton;

    const marketInfo = productStore.getCurrentMarketInfo(id, marketId);

    const rating = productStore.getRating(id, marketId);

    const currentRating = <ColoredRating rating={rating} />;
    const income = productStore.getMarketIncome(id, marketId);

    if (!productStore.isMainMarket(id, marketId)) {
      setAsMainMarketButton = <div>
        <div>
          {this.renderSetMainMarketButton(id, marketId)}
        </div>
      </div>;
    }

    const buttons = [
      {
        hype: 10, cost: 1000, name: 'Пост в соцсети'
      },
      // {
      //   hype: 15, cost: 5000, name: 'Таргетинг'
      // },
      // {
      //   hype: 20, cost: 10000, name: 'Вирусное видео'
      // }
    ];

    const improveInfluenceButtons = buttons.map(b => {
      const upgradeable = productStore.getMoney(id) >= b.cost;
      const text = b.name; // (+${b.hype})`;

      return (
        <div className="influence-button">
          <UI.Button
            disabled={!upgradeable}
            secondary={upgradeable}
            gray={!upgradeable}
            text={text}
            onClick={() => productActions.addHype(id, marketId, b.hype, b.cost)}
          />
          <div>Стоимость: {b.cost}$</div>
        </div>
      )
    });

    const currentHype = marketInfo.value;
    const nextMonthHype = Math.floor(0.9 * currentHype);

    // const barData = [
    //   {
    //     value: nextMonthHype,
    //     style: ''
    //   }, {
    //     value: currentHype - nextMonthHype,
    //     style: 'progress-bar-striped progress-bar-animated bg-danger'
    //   }
    // ];

    const barData = [
      {
        value: productStore.getXP(id),
        style: ''
      }, {
        value: 5,
        style: 'progress-bar-striped progress-bar-animated bg-danger'
      }
    ];

    const progressBar = <div>
      <UI.Bar min={0} max={250} data={barData} renderValues real />
      <br />
    </div>;

    const marketSize = shortenValue(clients * price);

    const bestFeatureButton = this.renderBestFeatureButton(id, marketId);

    const fame = marketInfo.value;
    const maxFame = marketInfo.max;
    const fameColor = coloringRange.standard(fame, 100);

    return (
      <div className="segment-block">
        <div className="content-block">
          <div className="client-market-item">
            <div className="segment-title">{userOrientedName}</div>
            <hr color="white" />

            <div className="segment-attribute">Доход</div>
            <div className="segment-value">$<UI.Changeable value={shortenValue(income)} /> / ${marketSize}</div>
            <hr color="white" />

            <div style={{ display: 'none' }}>
              <div className="segment-attribute">Известность</div>
              <div className="segment-value"><span style={{ color: fameColor }}>{fame}</span></div>
              <div>{improveInfluenceButtons}</div>
              <hr color="white" />
            </div>

            <div className="segment-attribute">Рейтинг</div>
            <div className="segment-value">{currentRating}</div>
            <div className="segment-value">{bestFeatureButton}</div>
            <hr color="white" />

            <div style={{ display: 'none' }}>
              <div className="segment-attribute">Следующий уровень</div>
              <div className="segment-value">Локальный рынок</div>
              <div className="segment-value">Объём рынка увеличивается на 150K$</div>
              <div>{progressBar}</div>
              <br />
            </div>

            <div>{this.renderMarketCompetitors(id, marketId, this.state.showCompetitors)}</div>
          </div>
        </div>
      </div>
    );
  }
}
