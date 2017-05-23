import { h, Component } from 'preact';
import store from '../../../stores/player-store';

import Staff from '../Staff';

export default class Marketers extends Component {
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
      staff: store.getTeamMarketers(),
      employees: store.getEmployeesMarketers(),
      points: store.getMonthlyMarketerPoints()
    })
  };

  render(props: PropsType, { staff, employees, points }) {
    return (
      <div>
        <div>Наши маркетологи производят +{points} маркетинговых очков (MP) в месяц</div>
        <Staff staff={staff} employees={employees} />
      </div>
    )
  }
}
