import { h, Component } from 'preact';
import UI from '../../UI';

import flux from '../../../flux';

import level from '../../../content/levels/level1';

const STAGE_1 = 1;
const STAGE_2 = 2;

export default class Tutorial extends Component {
  state = {
    stage: STAGE_1
  };

  setStage = (stage) => {
    this.setState({ stage });
  };

  onGameStart = () => {
    level.load();

    flux.scheduleActions.startGame();
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


    const init2 = (
      <div>
        <div className="initial-tab-text">
          Ты начинаешь как основатель веб-хостинга - сервиса, на котором размещаются сайты других предпринимателей
        </div>
        <UI.Button text="Начать игру!" primary onClick={this.onGameStart} />
      </div>
    );

    return (
      <div className="body-background">
        <div className="initial-tab-wrapper">
          <div className="game-logo-wrapper">
            <div className="game-logo">STARTUP</div>
          </div>
          {stage === STAGE_1 ? init1 : init2}
        </div>
      </div>
    );
  }
}
