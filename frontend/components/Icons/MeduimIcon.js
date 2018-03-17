import { h, Component } from 'preact';

export default class MeduimIcon extends Component {
  render({ src }) {
    return (
      <span>
        <img src={src} width="72" height="72" />
      </span>
    );
  }
}
