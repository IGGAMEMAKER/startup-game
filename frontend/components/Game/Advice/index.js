import { h, Component } from 'preact';
import c from '../../../constants';
import flux from '../../../flux';

import ColoredRating from '../Product/KPI/colored-rating';
import UI from '../../UI';


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
            // <div>Приведите более 200 клиентов на ваш сайт в разделе "Проекты->Клиенты"</div>
        target = (
          <div>
            <div>Отлично! Нам нужны первые пользователи. Проведите рекламную кампанию</div>
          </div>
        );
        break;

      case c.gameStages.GAME_STAGE_INVITED_FIRST_CLIENTS:
        target = (
          <div>
            <div>Превосходно! Чем больше клиентов вы приводите на сайт, тем точнее наша аналитика ... которой у нас нет</div>
            <div>Установите форму комментариев в разделе "Аналитика", чтобы получить больше знаний о пользователях</div>
          </div>
        );
        break;

      case c.gameStages.GAME_STAGE_IMPROVED_ANALYTICS:
        target = (
          <div>
            <div>По-хорошему бы ещё вебвизор поставить... Впрочем...
              Перемотайте время до следующего месяца,
              нажав на иконку перемотки времени
              <div className="navigation"><UI.Button text=">" /></div>
              в меню сверху
            </div>
          </div>
        );
        break;

      case c.gameStages.GAME_STAGE_TESTED_FIRST_HYPOTHESIS:
        target = (
          <div>
            <div>Первое тестирование завершено. Прототип ужасен! (Рейтинг <ColoredRating rating={flux.productStore.getRating(0)} />/10)</div>
            <div>Однако, мы получили пару дельных советов и можем улучшить продукт</div>
            <div>Улучшите характеристику "Виртуальная машина" в разделе "Разработка", чтобы поднять наш рейтинг</div>
          </div>
        );
        break;

      case c.gameStages.GAME_STAGE_IMPROVED_FIRST_FEATURE:
        target = (
          <div>
            <div>Так держать! Рейтинг увеличился! Рейтинг - ключевой показатель, влияющий на наши доходы и на отток пользователей</div>
            <div>Добейтесь рейтинга выше 7 и вы сможете начать принимать платежи на сайте!</div>
          </div>
        );
        break;

      case c.gameStages.GAME_STAGE_GOT_RATING_SEVEN_PLUS:
        target = (
          <div>
            <div>Интерес к нашему продукту не ослабевает!</div>
            <div>Можете приступить к монетизации сайта!</div>
          </div>
        );
            // <div>Продолжайте работать над улучшением продукта и вы сможете разорить своих конкурентов!</div>
        break;

      case c.gameStages.GAME_STAGE_PAYMENTS_INSTALLED:
        target = (
          <div>
            <div>Урра! Мы точно знаем, что пользователи готовы платить за наш продукт!</div>
            <div>Продолжайте в том же духе!</div>
          </div>
        );
        break;
    }

    if (!target) target = `#${gamePhase}`;

    return (
      <div>
        <h3>Задание</h3>
        {target}
        <br />
        <hr />
      </div>
    );
  }
}
