import { h, Component } from 'preact';
import UI from '../../UI';

import flux from '../../../flux';

const STAGE_1 = 1;
const STAGE_2 = 2;

export default class Tutorial extends Component {
  state = {
    stage: STAGE_1
  };

  componentWillMount() {}

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

    const init2 = (
      <div>
        <div className="initial-tab-text">
          Ты начинаешь как основатель веб-хостинга - сервиса, на котором размещаются сайты других предпринимателей
        </div>
        <UI.Button text="Начать игру!" primary onClick={() => flux.scheduleActions.startGame()} />
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
