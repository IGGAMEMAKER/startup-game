import { h, Component } from 'preact';

type PropsType = {};

type StateType = {};

import * as PRODUCT_STAGES from '../../../constants/products/product-stages';

import InitialProductTab from './InitialPanel/InitialProductTab';
import DevelopPanel from './DevelopPanel/develop-panel';

export default class Product extends Component {
  render(props: PropsType, state: StateType) {
    const { product, id } = props;

    let body;

    switch (product.stage) {
      case PRODUCT_STAGES.PRODUCT_STAGE_IDEA:
        body = <InitialProductTab product={product} id={id} />;
        break;
      default:
        body = (
          <div>
            <DevelopPanel product={product} id={id} />
          </div>
        );
        break;
    }

    return body;
  }
}
