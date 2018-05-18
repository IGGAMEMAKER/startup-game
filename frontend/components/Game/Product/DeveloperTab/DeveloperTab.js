import { h, Component } from 'preact';

import productStore from '../../../../stores/store';

import FeatureList from '../../Product/MainFeature/list';

import stageHelper from '../../../../helpers/stages';

export default class DeveloperTab extends Component {
  render({ id }) {
    if (!stageHelper.canShowMainFeatureTab()) return '';

    const XP = productStore.getXP(id);

    return (
      <div>
        <div className="featureGroupDescription">Улучшая главные характеристики продукта, вы увеличиваете доход с продукта</div>
        <div>Очки улучшений: {XP}</div>
        <br />
        <FeatureList id={id} />
      </div>
    );
  }
}
