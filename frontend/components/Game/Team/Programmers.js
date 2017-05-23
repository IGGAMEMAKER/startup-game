import { h, Component } from 'preact';
import store from '../../../stores/player-store';

import Staff from '../Staff';

export default class Programmers extends Component {
  state = {
    staff: [],
    employees: []
  };

  componentWillMount() {
    this.getStaff();

    store.addChangeListener(this.getStaff);
  }

  getStaff = () => {
    this.setState({
      staff: store.getTeamProgrammers(),
      employees: store.getEmployeesProgrammers(),
      points: store.getMonthlyProgrammerPoints()
    })
  };

  render(props: PropsType, { staff, employees, points }) {
    return (
      <div>
        <div>Наши программисты производят +{points} программистских очков (PP) в месяц</div>
        <Staff staff={staff} employees={employees} />
      </div>
    )
  }
}
