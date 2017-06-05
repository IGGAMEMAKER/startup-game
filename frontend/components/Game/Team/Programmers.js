import { h, Component } from 'preact';
import store from '../../../stores/player-store';

import Staff from '../Staff';
import Employee from '../Team/Employee';


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
    let title;
    if (employees.length) {
      title = 'Нанять программиста';
    } else {
      title = 'Никто не хочет к нам в команду. Не расстраивайтесь! Со временем появятся новые кандидаты';
    }

    return (
      <div>
        <div>Наши программисты производят +{points} программистских очков (PP) в месяц</div>
        <div>{title}</div>

        <table className="table table-stripped">
          <tbody>{employees.map((e, i) => <Employee p={e} i={i} />)}</tbody>
        </table>
      </div>
    )
  }
}
