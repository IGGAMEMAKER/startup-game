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
  renderBar(min, max, value, style) {
    return <div
      className={`progress-bar ${style}`}
      role="progressbar"
      style={{ width: `${value * 100 / (min + max)}%`}}
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
    ></div>
  }

  render(props: PropsType) {
    let data;

    if (Array.isArray(props.data)) {
      data = props.data.map((d: BarType, i) => {
        return this.renderBar(props.min, props.max, d.value, d.style)
      });
    } else {
      data = this.renderBar(props.min, props.max, props.data, '');
    }

    return (
      <div className="progress">
        {data}
      </div>
    );
  }
}
