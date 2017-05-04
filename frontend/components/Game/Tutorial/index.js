import { h, Component } from 'preact';
import UI from '../../UI';

import flux from '../../../flux';

// import MainFeatureTab from '../Product/MainFeature';
import InitialProductTab from '../Product/InitialPanel/InitialProductTab';
import mvpCreator from '../Product/InitialPanel/mvp-creator';

import Menu from '../Menu';

import c from '../../../constants/index';

const STAGE_1 = 1;
const STAGE_2 = 2;
const STAGE_3 = 3;

export default class Tutorial extends Component {
  state = {
    stage: STAGE_1
  };

  setStage = (stage) => {
    this.setState({ stage });
  };

  render({}, { stage }) {
    const init1 = (
      <div>
        <div className="initial-tab-text">
          Ты - крутой программист.
          Отработав много лет наёмным рабочим, ты решаешь открыть своё собственное дело.
        </div>
        <UI.Button text="Далее" primary onClick={() => this.setStage(STAGE_2)} />
      </div>
    );

    const onGameStart = () => {
      mvpCreator.create(0, [], c.ideas.IDEA_WEB_HOSTING);

      // this.setStage(STAGE_3);
      flux.scheduleActions.startGame();
    };

    const init2 = (
      <div>
        <div className="initial-tab-text">
          Ты начинаешь как основатель веб-хостинга - сервиса, на котором размещаются сайты других предпринимателей
        </div>
        <UI.Button text="Начать игру!" primary onClick={onGameStart} />
      </div>
    );

    let body = '';

    switch (stage) {
      case STAGE_1:
        body = init1;
        break;

      case STAGE_2:
        body = init2;
        break;

      case STAGE_3:
        const product = flux.productStore.getProduct(0);

        console.log(STAGE_3, product);
        body = (
          <div>
            <InitialProductTab
              id={0}
              product={product}
              onCreatePrototype={flux.scheduleActions.startGame}
            />
          </div>
        );
        break;
    }

    return (
      <div className="body-background">
        <div className="initial-tab-wrapper">
          <div className="game-logo-wrapper">
            <div className="game-logo">STARTUP</div>
          </div>
          {body}
        </div>
      </div>
    );
  }
}
