import { h, Component } from 'preact';

import productStore from '../../../stores/product-store';

import SegmentUpgrader from '../Product/Markets/SegmentUpgrader';


export default class Marketing extends Component {
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

  renderSegments = id => {
    if (!productStore.isSegmentingOpened(id)) {
      return <div className="market-list-container">Мы ничего не знаем о наших клиентах</div>;
    }

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
        {this.renderSegments(id)}
        <br />
        <h2 className="center">Каналы</h2>
        {this.renderMarketingTab(id)}
        <br />
      </div>
    );
  }
}
