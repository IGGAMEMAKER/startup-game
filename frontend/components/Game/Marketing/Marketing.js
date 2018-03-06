import { h, Component } from 'preact';

import productStore from '../../../stores/product-store';

import SegmentUpgrader from '../Product/Markets/SegmentUpgrader';


export default class Marketing extends Component {
  componentWillMount() {}

  renderMarketingTab = (id) => {
    let hasUnexploredMarkets = false;

    let marketsTab = [];

    productStore.getMarkets(id)
      .forEach((m, mId) => {
        const explored = productStore.isExploredMarket(id, mId);

        if (!hasUnexploredMarkets) {
          // marketsTab.push(<Market id={id} marketId={mId} market={m} explored={explored} />);
          marketsTab.push(<SegmentUpgrader id={id} marketId={mId} market={m} explored={explored} />);
        }

        if (!explored) {
          hasUnexploredMarkets = true;
        }
      });

    return <div className="market-list-container">{marketsTab}</div>;
  };

  render({ id }) {
    return (
      <div>
        {this.renderMarketingTab(id)}
        <br />
      </div>
    );
  }
}
