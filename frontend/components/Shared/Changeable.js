import { h, Component } from 'preact';

type PropsType = {
  value: Number
};

export default class Changeable extends Component {
  state = {
    mode: ''
  };

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render

    if (nextProps.value !== this.props.value) {
      console.log('componentWillReceiveProps', nextProps.value, this.props.value);
      this.setState({
        mode: 'grow-on-change'
      });

      setTimeout(() => {
        this.setState({ mode: '' });
      }, 500);
    }

    // if (nextProps.startTime !== this.state.startTime) {
    //   this.setState({ startTime: nextProps.startTime });
    // }
  }

  render(props: PropsType, state: any) {
    return <span className={this.state.mode}>{props.value}</span>;
  }
}
