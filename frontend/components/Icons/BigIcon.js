import { h, Component } from 'preact';

export default class BigIcon extends Component {
  render({ src, title }) {
    return (
      <span>
        <img src={src} title={title} width="96" height="96" />
      </span>
    );
  }
}
