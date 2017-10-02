import { h, Component } from 'preact';
import store from '../../../stores/product-store';

import Employee from '../Team/Employee';

import logger from '../../../helpers/logger/logger';


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
    logger.shit('NO COMPANY ID!! Employees.js');
    const companyId = 0;

    this.setState({
      employees: store.getEmployees(),
      pps: store.getMonthlyProgrammerPoints(companyId)
    })
  };

  render(props: PropsType, { staff, employees, pps }) {
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
