import { h, Component } from 'preact';

export default class AdviceTab extends Component {
  render({
    gamePhase
  }, {}) {

    return (
      <div>
        {gamePhase}
      </div>
    );
  }
}
