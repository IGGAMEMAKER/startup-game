import { h, Component } from 'preact';

import productStore from '../../../../stores/product-store';

import Explration from '../Exloration/Exploration';

import stageHelper from '../../../../helpers/stages';

export default class ImprovementTab extends Component {
  render({ id }) {
    if (!stageHelper.canShowMainFeatureTab()) return '';

    const XP = productStore.getXP(id);

    return (
      <div>
        <div className="featureGroupDescription">Улучшая главные характеристики продукта, вы увеличиваете доход с продукта</div>
        <div>Очки улучшений: {XP}</div>
        <br />

        <Explration />
      </div>
    );
  }
}
