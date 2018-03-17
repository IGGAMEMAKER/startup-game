import { h, Component } from 'preact';

export default class BigIcon extends Component {
  render({ src }) {
    return (
      <span>
        <img src={src} width="96" height="96" />
      </span>
    );
  }
}
