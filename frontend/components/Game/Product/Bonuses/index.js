import { h, Component } from 'preact';

type PropsType = {
  onPickBonus: Function,
  icon: String,
  title: String,
  description: String,
  bonus: String,
  costDescription: String,
  canPick: Boolean,

  childs: Array,

  isPicked: Boolean
};

import logger from '../../../../helpers/logger/logger';

import UI from '../../../UI';

export default class Bonus extends Component {
  render(props: PropsType) {
    logger.shit('no bonus icon!!');

    const onPick = props.onPickBonus ? props.onPickBonus : () => {};

          // <div className="bonus-description-short">Бонус: </div>
          // <div className="bonus-cost">Стоимость: {props.costDescription}</div>
    return (
      <div className="bonus-wrapper">
        <div className={`bonus-icon`} style=""></div>
        <div className="bonus-description-wrapper">
          <div className="bonus-title">
            {props.title} ({props.bonus})
            <div className="bonus-button"></div>
          </div>
          <div className="bonus-description">{props.description}</div>

          <UI.Button text="Активировать" onClick={onPick} primary disabled={!props.canPick} />

          {props.isPicked ? props.childs : ''}
        </div>
      </div>
    );
  }
}
