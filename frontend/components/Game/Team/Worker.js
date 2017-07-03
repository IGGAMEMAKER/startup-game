import { h, Component } from 'preact';

import Person from './Person';
import actions from '../../../actions/product-actions';

import logger from '../../../helpers/logger/logger';

import UI from '../../UI';

export default class Worker extends Component {
  render({ p, i }) {
    let hireButton;

    if (!p.isPlayer) {
      const fire = () => {
        logger.log('fire worker #', p.id, p);
        actions.fireWorker(p.id);
      };

      hireButton = (
        <div className="worker-button-container">
          <span className="worker-button">
            <UI.Button onClick={fire} text="Уволить" link />
          </span>
        </div>
      );
    }

    return (
      <Person
        p={p}
        key={`person${i}`}
        name={p.isPlayer ? 'Вы' : p.name}
        options={hireButton}
      />
    );
  }
}
