import { h, Component } from 'preact';

import Person from './Person';
import actions from '../../../actions/player-actions';


import UI from '../../UI';

export default class Worker extends Component {
  render({ p, i }) {
    let hireButton;

    if (!p.isPlayer) {
      hireButton = (
        <div className="worker-button-container">
          <span className="worker-button">
            <UI.Button onClick={() => { actions.fireWorker(p.id); }} text="Уволить" link />
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
