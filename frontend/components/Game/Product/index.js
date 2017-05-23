import { h, Component } from 'preact';

type PropsType = {};

type StateType = {};

import * as PRODUCT_STAGES from '../../../constants/products/product-stages';

import InitialProductTab from './InitialPanel/InitialProductTab';
import ProductPanel from './ProductPanel/product-panel';
import logger from '../../../helpers/logger/logger';


export default class Product extends Component {
  render(props: PropsType, state: StateType) {
    const { product, id } = props;

    let body;
    logger.debug(product.stage);

    switch (product.stage) {
      case PRODUCT_STAGES.PRODUCT_STAGE_IDEA:
        body = <InitialProductTab product={product} id={id} />;
        break;
      default:
        body = (
          <div>
            <ProductPanel product={product} id={id} />
          </div>
        );
        break;
    }

    return body;
  }
}
