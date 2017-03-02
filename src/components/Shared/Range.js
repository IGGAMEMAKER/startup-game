import { h, Component } from 'preact';

type PropsType = {};

type StateType = {};

type ResponseType = {};

export default class Range extends Component {
  state = {};

  componentWillMount() {}

  render(props: PropsType, state: StateType) {
    return (
      <div>
        <input type="range" {...props} />
      </div>
    );
  }
}
