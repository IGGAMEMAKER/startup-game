import { h, Component } from 'preact';

import productStore from '../../../../stores/product-store';

export default class Exploration extends Component {
  state = {
  };

  pickData = () => {
    this.setState({
      backend: [],
      frontend: [],
      testing: [],
      team: [],
      research: [],
      blog: [],
      support: [],

      segments: [],
    })
  };

  componentWillMount() {
    this.pickData();

    productStore.addChangeListener(this.pickData)
  }

  render({ id }, state) {
    return (
      <div>
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
