import { h, Component } from 'preact';

type PropsType = {
  productId: Number
};

import Bonus from './index';

import * as BONUSES from '../../../../constants/bonuses';

import logger from '../../../../helpers/logger/logger';

import flux from '../../../../flux';

import UI from '../../../UI';

export default class BonusesList extends Component {
  componentWillMount() {}

  getBonuses(): Array {
    const chain = (root, childs) => {
      root.childs = childs;
    };

    const programmerPerformanceBonus = {
      name: BONUSES.BONUSES_PROGRAMMER_PERFORMANCE_MODIFIER,
      title: 'Улучшение производительности программистов',
      bonus: '+15% PP ежемесячно',
      value: 15,
      description: 'Мы стали лучше понимать, как организовать работу команды программистов',
      costDescription: '500PP',
    };

    const programmerPerformanceBonusII = {
      name: BONUSES.BONUSES_PROGRAMMER_PERFORMANCE_MODIFIER_II,
      title: 'Улучшение производительности программистов II',
      bonus: '+25% PP ежемесячно',
      value: 25,
      description: 'Мы накопили солидный опыт решения технических задач. Новые задачи не кажутся такими уж сложными',
      costDescription: '1500PP',
    };

    chain(programmerPerformanceBonus, [programmerPerformanceBonusII]);

    const marketerPerformanceBonus = {
      name: BONUSES.BONUSES_MARKETER_PERFORMANCE_MODIFIER,
      title: 'Улучшение производительности маркетологов',
      bonus: '+25% MP ежемесячно',
      description: 'Мы стали лучше понимать, как организовать работу команды маркетологов',
      costDescription: '500MP',
    };

    const marketerPerformanceBonusII = {
      name: BONUSES.BONUSES_MARKETER_PERFORMANCE_MODIFIER_II,
      title: 'Улучшение производительности маркетологов II',
      bonus: '+25% MP ежемесячно',
      description: 'Мы провели кучу рекламных кампаний и хорошо знаем, что нужно нашим клиентам',
      costDescription: '1500MP',
    };

    chain(marketerPerformanceBonus, [marketerPerformanceBonusII]);

    return [programmerPerformanceBonus, marketerPerformanceBonus];
  }

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

    const list = this.getBonuses().map(this.renderBonus);

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
