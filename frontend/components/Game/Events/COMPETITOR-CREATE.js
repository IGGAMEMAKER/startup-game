import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import Button from '../../Shared/Button';

import playerActions from '../../../actions/player-actions';
import messageActions from '../../../actions/message-actions';


export default class CompetitorCreateEvent extends Component {
  render() {
    const { props } = this;
    const id = props.id;
    const { data } = props.message;
    const p = data.p;

    const close = () => {
      // playerActions.increasePoints({ marketing: 0, programming: points * 2 });
      messageActions.closeEvent(id);
      props.onclose();
    };

    return (
      <div>
        <div className="modal-head">
          Появился новый конкурент {p.name}
        </div>
        <br />
        <Button className="button1" onClick={close} text={`Ясно`} primary />
      </div>
    );
  }
}
