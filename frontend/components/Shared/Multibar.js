import { h, Component } from 'preact';

type PropsType = {
  data: Array,
  // min: number,
  // max: number,
  // current: number
};

export default class Bar extends Component {
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
