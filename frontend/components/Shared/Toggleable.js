import { h, Component } from 'preact';

type PropsType = {}

type StateType = {}

type ResponseType = {}

export default class Toggleable extends Component {
  state = {

  };

  componentWillMount() {}

  render() {
    const { state, props } = this;

    const { component, switcher } = props;

    if (!component) {
      throw 'no component in Toggleable';
    }

    return (
      <div >
        component
      </div>
    );
  }
}
