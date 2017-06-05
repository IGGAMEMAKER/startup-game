import { h, Component } from 'preact';
import store from '../../../stores/player-store';

import Staff from '../Staff';
import Employee from '../Team/Employee';
import Worker from '../Team/Worker';

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
    let title;
    if (employees.length) {
      title = 'Нанять маркетолога';
    } else {
      title = 'Никто не хочет к нам в команду. Не расстраивайтесь! Со временем появятся новые кандидаты';
    }

    return (
      <div>
        <div>Наши маркетологи производят +{points} маркетинговых очков (MP) в месяц</div>
        <div>{title}</div>

        <table className="table table-stripped">
          <tbody>{employees.map((e, i) => <Employee p={e} i={i} />)}</tbody>
        </table>
      </div>
    );
        // <Staff staff={staff} employees={employees} />
  }
}
