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

      case c.gameStages.GAME_STAGE_HIRED_FIRST_WORKER:
        target = (
          <div>
            <div>Отлично! Для того, чтобы лучше понимать, что нужно пользователям, тестируйте гипотезы о вашем продукте</div>
            <div>Но сначала приведите более 200 клиентов на ваш сайт</div>
          </div>
        );
        break;

      case c.gameStages.GAME_STAGE_INVITED_FIRST_CLIENTS:
        target = (
          <div>
            <div>Превосходно! Чем больше клиентов вы приводите на сайт, тем точнее наша аналитика... которой у нас нет</div>
            <div>Установите форму обратной связи, чтобы получить больше знаний о пользователях</div>
          </div>
        );
        break;

      case c.gameStages.GAME_STAGE_IMPROVED_ANALYTICS:
        target = (
          <div>
            <div>По-хорошему бы ещё вебвизор поставить... Впрочем... Запускайте тестирование!</div>
          </div>
        );
        break;
    }

    // if (!target) return '';

    return (
      <div>
        <div>Ваша текущая цель</div>
        {gamePhase}
        {target}
      </div>
    );
  }
}
