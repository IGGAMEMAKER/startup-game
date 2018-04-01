import { h, Component } from 'preact';

import productStore from '../../../stores/product-store';

import ClientRetention from '../Product/Markets/ClientRetention';
import ClientAcquisition from '../Product/Markets/ClientAcquisition';
import SegmentExplorer from '../Product/Markets/SegmentExplorer';


export default class Marketing extends Component {
  state = {
    exploredMarkets: [],
    explorableMarkets: [],
    markets: []
  };

  pickMarketData = () => {
    const state = {
      markets: productStore.getMarketsWithExplorationStatuses(this.props.id),
      exploredMarkets: productStore.getExploredMarkets(this.props.id),
      explorableMarkets: productStore.getExplorableMarkets(this.props.id)
    };

    this.setState(state);
  };

  componentWillMount() {
    this.pickMarketData();

    productStore.addChangeListener(this.pickMarketData)
  }

  renderMarketingTab = (id) => {
    const marketsTab = this.state.exploredMarkets
      .map((m, i) => <ClientRetention id={id} marketId={m.id} market={m} />);

    return <div className="market-list-container">{marketsTab}</div>;
  };

  renderClientAcquisition = id => {
    const marketsTab = this.state.exploredMarkets
      .map((m, i) => <ClientAcquisition id={id} marketId={m.id} market={m} />);

    return <div className="market-list-container">{marketsTab}</div>;
  };

  renderExplorableMarkets = id => {
    let nextId = -1;

    this.state.markets.forEach((m, i) => {
      if (nextId === -1 && !m.explored) {
        nextId = m.id;
      }
    });

    const marketsTab = this.state.markets
      .map(m => {
        return <SegmentExplorer
          id={id}
          market={m.info}
          explored={m.explored}
          explorable={m.id === nextId}
          enoughXPsToExplore={m.enoughXPsToExplore}
        />
      });

    return <div className="market-list-container">{marketsTab}</div>;
  };
        // <br />
        // <h2 className="center">Исследование клиентов</h2>
        // {this.renderExplorableMarkets(id)}
        // <br />

  render({ id }) {
    return (
      <div>
        <h2 className="center">Привлечение клиентов</h2>
        {this.renderClientAcquisition(id)}
        <br />
        <h2 className="center">Удержание клиентов</h2>
        {this.renderMarketingTab(id)}
      </div>
    );
  }
}
