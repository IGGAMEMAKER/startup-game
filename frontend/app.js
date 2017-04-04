import { h, render, Component } from 'preact';

import Game from './components/Game/Game';
const appElement: HTMLElement = document.getElementById('app');

render(
  // <Routing />,
  <Game />,
  // <div >asdasd</div>,
  appElement.parentNode,
  appElement
);
