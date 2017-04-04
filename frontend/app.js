// import 'babel-polyfill';
// import Router from 'preact-router';
import { h, render, Component } from 'preact';

import Game from './components/Game/Game';
const appElement: HTMLElement = document.getElementById('app');

// const Routing = (): Component => (
//   <Router>
//     <Pages.AnonymousHome path="/" />
//     <Pages.Register path="/register" />
//     <Pages.AuthenticationSuccessful path="/auth-success" />
//     <Pages.Profile path="/profile" />
//     <Pages.Search path="/search" />
//     <Pages.Logout path="/logout" />
//     <Pages.Error404 default />
//   </Router>
// );

render(
  // <Routing />,
  <Game />,
  appElement.parentNode,
  appElement
);
