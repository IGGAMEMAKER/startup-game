import { h, Component } from 'preact';

type PropsType = {
  min: number,
  max: number,
  current: number
};

export default class Bar extends Component {
  componentWillMount() {}

  render(props: PropsType) {
    return (
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${props.current * 100 / (props.min + props.max)}%`}}
          aria-valuenow={props.current}
          aria-valuemin={props.min}
          aria-valuemax={props.max}
        ></div>
      </div>
    );
  }
}
