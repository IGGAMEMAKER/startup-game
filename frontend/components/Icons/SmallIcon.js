import { h, Component } from 'preact';

export default class SmallIcon extends Component {
  render({ src, title }) {
    return (
      <span>
        <img src={src} title={title} width="48" height="48" />
      </span>
    );
  }
}
