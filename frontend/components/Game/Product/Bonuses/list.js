import { h, Component } from 'preact';

type PropsType = {
  productId: Number
};

import Bonus from './index';

import * as BONUSES from '../../../../constants/bonuses';

import logger from '../../../../helpers/logger/logger';

export default class BonusesList extends Component {
  componentWillMount() {}

  getBonuses(): Array {
    const chain = (root, childs) => {
      root.childs = childs;
    };

    const programmerPerformanceBonus = {
      name: BONUSES.BONUSES_PROGRAMMER_PERFORMANCE_MODIFIER,
      title: 'Улучшение производительности программистов',
      bonus: '+25% PP ежемесячно',
      description: 'Мы стали лучше понимать, как организовать работу команды программистов',
      costDescription: '500PP',
    };

    const programmerPerformanceBonusII = {
      name: BONUSES.BONUSES_PROGRAMMER_PERFORMANCE_MODIFIER_II,
      title: 'Улучшение производительности программистов II',
      bonus: '+25% PP ежемесячно',
      description: 'Благодаря, как организовать работу команды программистов',
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
      title: 'Улучшение производительности маркетологов',
      bonus: '+25% MP ежемесячно',
      description: 'Мы провели кучу рекламных кампаний и хорошо знаем, что нужно нашим клиентам',
      costDescription: '1500MP',
    };

    chain(marketerPerformanceBonus, [marketerPerformanceBonusII]);

    return [programmerPerformanceBonus, marketerPerformanceBonus];
  }

  onPick(bonusName) {
    logger.debug('pick bonus', bonusName);
  }

  render(props: PropsType) {
    logger.shit('write boolean checks, for bonus picking availability! you cannot take them all');

    const list = this.getBonuses()
      .map((b, i) => (
        <div key={`bonus${i}`}>
          <Bonus
            title={b.title}
            description={b.description}
            bonus={b.bonus}
            canPick
            onPickBonus={() => { this.onPick(b.name) }}
          />
        </div>
      ));

    return (
      <div>
        <div>Организационные бонусы</div>
        <div>{list}</div>
      </div>
    );
  }
}
