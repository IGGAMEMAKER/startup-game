import { h, Component } from 'preact';
import coloringRange from '../../helpers/coloring-range';

export default class ColoredValue extends Component {
  render({ value, text }) {
    const positive = coloringRange.standard(10, 10);
    const negative = coloringRange.standard(0, 10);

    let ratingColor = value < 0 ? negative : positive;

    return <span style={{ color: ratingColor }}>{value > 0 ? `+${value}` : value}{text}</span>;
  }
}
