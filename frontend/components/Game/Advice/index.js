import { h, Component } from 'preact';
import c from '../../../constants';

export default class AdviceTab extends Component {
  render({
    gamePhase,
  }, {}) {
    let target;

    switch (gamePhase) {
      case c.gameStages.GAME_STAGE_GAME_STARTED:
        target = (
          <div>
            <div>! У вас мало маркетинговых очков </div>
            <div>Маркетинговые (MP) и Программистские (РР) очки нужны для улучшения вашего продукта</div>
            <span>Наймите маркетолога Lynda в разделе "Команда".</span>
          </div>
        );
        break;
    }

    if (!target) return '';

    return (
      <div>
        <div>Ваша текущая цель</div>
        {target}
      </div>
    );
  }
}
