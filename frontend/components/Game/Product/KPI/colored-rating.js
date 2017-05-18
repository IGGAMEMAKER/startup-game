import { h, Component } from 'preact';
import coloringRange from '../../../../helpers/coloring-range';
import round from '../../../../helpers/math/round';


export default class ColoredRating extends Component {
  render({ rating }) {
    const ratingColor = coloringRange.standard(rating, 10);

    return (
      <span>
        <span style={{ color: ratingColor }}>{round(rating)}</span>
      </span>
    );
  }
}
