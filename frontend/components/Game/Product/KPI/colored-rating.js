import { h, Component } from 'preact';
import coloringRange from '../../../../helpers/coloring-range';
import round from '../../../../helpers/math/round';

import UI from '../../../UI';


export default class ColoredRating extends Component {
  render({ rating }) {
    const ratingColor = coloringRange.standard(rating, 10);

    const rounded = round(rating);
    return (
      <span>
        <span style={{ color: ratingColor }}>
          <UI.Changeable value={rounded} />
        </span>
      </span>
    );
  }
}
