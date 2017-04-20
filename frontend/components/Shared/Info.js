import { h, Component } from 'preact';

import UI from '../UI';

export default class Info extends Component {
  state = {};

  componentWillMount() {}

  render({ content }, {}) {
    return (
      <span className="info">?</span>
    );
  }
}
