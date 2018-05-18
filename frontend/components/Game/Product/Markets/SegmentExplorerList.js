import { h, Component } from 'preact';

import productStore from '../../../../stores/store';


export default class SegmentExplorerList extends Component {
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

  renderClientAcquisition = id => {
    // if (!productStore.isSegmentingOpened(id)) {
    //   return <div className="market-list-container">Мы ничего не знаем о наших клиентах</div>;
    // }

    let hasUnexploredMarkets = false;

    let marketsTab = [];

    productStore.getMarkets(id)
      .forEach((m, mId) => {
        const explored = productStore.isExploredMarket(id, mId);

        if (!hasUnexploredMarkets) {
          // marketsTab.push(<Market id={id} marketId={mId} market={m} explored={explored} />);
          marketsTab.push(<ClientAcquisition id={id} marketId={mId} market={m} explored={explored} />);
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
        <h2 className="center">Привлечение клиентов</h2>
        {this.renderClientAcquisition(id)}
        <br />
        <h2 className="center">Удержание клиентов</h2>
        {this.renderMarketingTab(id)}
        <br />
      </div>
    );
  }
}
