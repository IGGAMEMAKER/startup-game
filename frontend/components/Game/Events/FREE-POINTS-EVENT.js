import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import Button from '../../Shared/Button';

import playerActions from '../../../actions/player-actions';
import messageActions from '../../../actions/message-actions';


export default class FreePointsEvent extends Component {
  render() {
    const { props } = this;
    const id = props.id;
    const { data } = props.message;
    const points = data.points;

    const pickProgrammingPoints = () => {
      playerActions.increasePoints({ marketing: 0, programming: points * 2 });
      messageActions.closeEvent(id);
      props.onclose();
    };

    const pickMarketingPoints = () => {
      playerActions.increasePoints({ marketing: points * 2, programming: 0 });
      messageActions.closeEvent(id);
      props.onclose();
    };

    const pickBoth = () => {
      playerActions.increasePoints({ marketing: points, programming: points });
      messageActions.closeEvent(id);
      props.onclose();
    };

    return (
      <div>
        <div className="modal-head">
          В свободное от работы время вы много читаете и это приносит плоды! На что сделаете ставку?
        </div>
        <br />
        <Button className="button1" onClick={pickMarketingPoints} text={`Маркетинг наше всё! (+${points * 2}MP)`} primary />
        <br />
        <Button className="button1" onClick={pickProgrammingPoints} text={`Технологии рулят! (+${points * 2}PP)`} primary />
        <br />
        <Button className="button1" onClick={pickBoth} text={`Баланс во всём! (+${points}PP и +${points}MP)`} primary />
      </div>
    );
  }
}
