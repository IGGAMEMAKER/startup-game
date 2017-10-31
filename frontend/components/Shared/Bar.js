import { h, Component } from 'preact';

type PropsType = {
  min: number,
  max: number,
  // data, // or array
  renderValues: Boolean
};

type BarType = {
  value: number,
  style: string
};

export default class Bar extends Component {
  renderBar(min, max, value, style, renderValues) {
    const current = value * 100 / (min + max);

    return <div
      className={`progress-bar ${style}`}
      role="progressbar"
      style={{ width: `${current}%`}}
      aria-valuenow={current}
      aria-valuemin={min}
      aria-valuemax={max}
    >{renderValues ? current : ''}</div>
  }

  render(props: PropsType) {
    let data;

    if (Array.isArray(props.data)) {
      data = props.data.map((d: BarType) => {
        return this.renderBar(props.min, props.max, d.value, d.style, props.renderValues)
      });
    } else {
      data = this.renderBar(props.min, props.max, props.data, '', props.renderValues);
    }

    return (
      <div className="progress">
        {data}
      </div>
    );
  }
}
