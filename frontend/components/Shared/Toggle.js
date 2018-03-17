import { h, Component } from 'preact';

export default class Toggle extends Component {
  state = {
    toggle: false
  };

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
  }

  render(props: PropsType, state: any) {
    return <span className={this.state.mode}>{props.value}</span>;
  }
}
