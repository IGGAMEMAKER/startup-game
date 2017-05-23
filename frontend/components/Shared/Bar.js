import { h, Component } from 'preact';

type PropsType = {
  min: number,
  max: number,
  current: number
};

type BarType = {
  value: number,
  style: string
};

export default class Bar extends Component {
  render(props: PropsType) {
    const data = props.data.map((d: BarType, i) => {
      return <div
        className={`progress-bar ${d.style}`}
        role="progressbar"
        style={{ width: `${d.value * 100 / (props.min + props.max)}%`}}
        aria-valuenow={props.current}
        aria-valuemin={props.min}
        aria-valuemax={props.max}
      ></div>
    });

    return (
      <div className="progress">
        {data}
      </div>
    );
  }
}
