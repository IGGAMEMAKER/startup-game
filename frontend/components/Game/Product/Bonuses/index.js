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

    return (
      <div>
        <div className={`bonus-icon`} style=""></div>
        <div className="bonus-description-wrapper">
          <div className="bonus-title">{props.title}</div>
          <div className="bonus-description">{props.description}</div>
          <div className="bonus-description-short">{props.bonus}</div>
          <div className="bonus-cost">{props.costDescription}</div>

          <UI.Button text="Активировать" onClick={onPick} primary disabled={!props.canPick} />

          {props.isPicked ? props.childs : ''}
        </div>
      </div>
    );
  }
}
