import { h, Component } from 'preact';

type PropsType = {
  productId: Number
};

import Bonus from './index';

import logger from '../../../../helpers/logger/logger';

import flux from '../../../../flux';

import UI from '../../../UI';

export default class BonusesList extends Component {
  componentWillMount() {}

  onPick(productId, bonusName) {
    logger.debug('pick bonus', bonusName);

    flux.productActions.pickBonus(productId, bonusName)
  }

  renderBonus = (b) => {
    const isPicked = flux.productStore.getBonusStatus(this.props.productId, b.name);

    if (isPicked) {
      if (b.childs) return b.childs.map(this.renderBonus);

      return '';
    }

    return (
      <div key={b.name}>
        <Bonus
          title={b.title}
          description={b.description}
          bonus={b.bonus}
          costDescription={b.costDescription}
          canPick
          onPickBonus={() => { this.onPick(this.props.productId, b.name) }}
        />
      </div>
    )
  };

  render(props: PropsType) {
    logger.shit('write boolean checks, for bonus picking availability! you cannot take them all');

    const list = flux.productStore.getBonusesList(props.productId).map(this.renderBonus);

    const names = flux.productStore.getBonuses(props.productId).map(b => <div>{b}</div>);

    return (
      <div>
        <div>Организационные бонусы</div>
        <div>{names}</div>
        <div>{list}</div>
      </div>
    );
  }
}
