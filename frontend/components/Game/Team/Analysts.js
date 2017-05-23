import { h, Component } from 'preact';
import store from '../../../stores/player-store';

import Staff from '../Staff';

export default class Analysts extends Component {
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
      staff: store.getTeamAnalysts(),
      employees: store.getEmployeesAnalysts()
    })
  };

  render(props: PropsType, { staff, employees }) {
    return <Staff staff={staff} employees={employees} />
  }
}
