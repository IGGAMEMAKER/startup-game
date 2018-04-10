import { h, Component } from 'preact';

import productStore from '../../../../stores/product-store';

import UI from '../../../UI';

export default class Exploration extends Component {
  pickData = (id = 0) => () => {
    this.setState({
      info: productStore.getExplorationData(id)
    })
  };

  componentDidMount() {
    this.pickData();

    productStore.addChangeListener(this.pickData)
  }

  renderClientTab = state => {
    const list = state.info.clients.map((c, i) => {
      if (c.explored) {
        return <div>Explored: {c.name}</div>
      }

      if (c.explorable) {
        return <div>Explorable: {c.name} for {c.explorationCost}{UI.icons.xp}</div>
      }
    });

    return <div>{list}</div>
  };

  render({ id }, state) {
    if (!state.info) return <div></div>;

    return (
      <div>
        <h2 className="center">Пользователи</h2>
        {this.renderClientTab(state)}
        {JSON.stringify(state.clients)}
        <br />

        <h2 className="center">Сервера</h2>
        {JSON.stringify(state.backend)}
        <br />

        <h2 className="center">Приложения</h2>
        {JSON.stringify(state.frontend)}
        <br />

        <h2 className="center">Тестирование</h2>
        {JSON.stringify(state.testing)}
        <br />

        <h2 className="center">Команда</h2>
        {JSON.stringify(state.team)}
        <br />

        <h2 className="center">Блог</h2>
        {JSON.stringify(state.blog)}
        <br />

        <h2 className="center">Техподдержка</h2>
        {JSON.stringify(state.support)}
        <br />

      </div>
    );
  }
}
