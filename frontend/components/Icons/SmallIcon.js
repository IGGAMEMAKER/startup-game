import { h, Component } from 'preact';

export default class SmallIcon extends Component {
  render({ src }) {
    return (
      <span>
        <img src={src} width="48" height="48" />
      </span>
    );
  }
}
