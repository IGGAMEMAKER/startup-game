import { h, Component } from 'preact';

import coloringRange from '../../../helpers/coloring-range';

export default class Person extends Component {
  componentWillMount() {}

  render({
    p,
    key,
    name,
    options
  }) {
    return <tr className="worker-item" key={key}>
      <td>
        {name}
      </td>
    </tr>
  }
}
