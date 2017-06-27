import { h, Component } from 'preact';
import store from '../../../stores/player-store';

import Staff from '../Staff';
import Employee from '../Team/Employee';


export default class Employees extends Component {
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
      employees: store.getEmployees(),
      pps: store.getMonthlyProgrammerPoints(),
      mps: store.getMonthlyMarketerPoints(),
    })
  };

  render(props: PropsType, { staff, employees, pps, mps }) {
    let title;

    if (!employees.length) {
      title = 'Никто не хочет к нам в команду. Не расстраивайтесь! В следующем месяце появятся новые кандидаты';
    }

    return (
      <div>
        <div>{title}</div>
        <table className="table table-stripped">
          <tbody>{employees.map((e, i) => <Employee p={e} i={i} />)}</tbody>
        </table>
      </div>
    )
  }
}
