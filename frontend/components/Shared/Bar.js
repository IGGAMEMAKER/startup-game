import { h, Component } from 'preact';

type PropsType = {
  min: Number,
  max: Number,
  // data, // or array
  renderValues: Boolean,
  real: Boolean,
  height: Number
};

type BarType = {
  value: number,
  style: string
};

export default class Bar extends Component {
  renderBar(min, max, value, style, renderValues, real, height) {
    const width = value * 100 / (min + max);
    const current = real ? value : width;

    return <div
      className={`progress-bar ${style}`}
      role="progressbar"
      style={{ width: `${width}%`}}
      aria-valuenow={current}
      aria-valuemin={min}
      aria-valuemax={max}
    >{renderValues ? current : ''}</div>
  }

  render(props: PropsType) {
    let data;

    if (Array.isArray(props.data)) {
      data = props.data.map((d: BarType) => {
        return this.renderBar(props.min, props.max, d.value, d.style, props.renderValues, props.real, props.height)
      });
    } else {
      data = this.renderBar(props.min, props.max, props.data, '', props.renderValues, props.real);
    }

    return (
      <div className="progress">
        {data}
      </div>
    );
  }
}
