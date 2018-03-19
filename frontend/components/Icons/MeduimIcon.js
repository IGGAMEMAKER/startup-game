import { h, Component } from 'preact';

export default class MeduimIcon extends Component {
  render({ src, title }) {
    return (
      <span>
        <img src={src} title={title} width="72" height="72" />
      </span>
    );
  }
}
