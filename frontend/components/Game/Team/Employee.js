import { h, Component } from 'preact';

import Person from './Person';
import stageHelper from '../../../helpers/stages';

import UI from '../../UI';

import actions from '../../../actions/product-actions';


export default class Employee extends Component {
  render({ p, i }) {
    const id = i; // p.id

    const reject = () => { actions.rejectEmployee(id); };
    const hire = () => {
      if (stageHelper.isFirstWorkerMission()) {
        stageHelper.onFirstWorkerMissionCompleted();
      }

      actions.hireWorker(p, id);
    };

    // {
    //   !stageHelper.isFirstWorkerMission()
    //     ?
    //     <span className="worker-button"><UI.Button onClick={reject} text="Отклонить"/></span>
    //     :
    //     ''
    // }
    const hireButton = (
      <div className="worker-button-container">
        <span className="worker-button"><UI.Button onClick={hire} text="Нанять" primary /></span>
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
