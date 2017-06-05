import { h, Component } from 'preact';

import Person from './Person';
import stageHelper from '../../../helpers/stages';

import UI from '../../UI';

import actions from '../../../actions/player-actions';


export default class Employee extends Component {
  render({ p, i }) {
    const reject = () => { actions.rejectEmployee(p.id); };
    const hire = () => {
      if (stageHelper.isFirstWorkerMission()) {
        stageHelper.onFirstWorkerMissionCompleted();
      }

      actions.hireWorker(p, p.id);
    };

    const hireButton = (
      <div className="worker-button-container">
        <span className="worker-button"><UI.Button onClick={hire} text="Нанять" primary /></span>
        {
          !stageHelper.isFirstWorkerMission()
            ?
            <span className="worker-button"><UI.Button onClick={reject} text="Отклонить"/></span>
            :
            ''
        }
      </div>
    );

    return (
      <Person
        p={p}
        key={`employee${i}`}
        name={p.name}
        options={hireButton}
      />
    );
  }
}
