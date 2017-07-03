import { h, Component } from 'preact';
// import React, { Component, PropTypes } from 'react';

import Button from '../../Shared/Button';

import productActions from '../../../actions/product-actions';
import messageActions from '../../../actions/message-actions';

import teamHelper from '../../../helpers/team/skills';

export default class HireEnthusiastEvent extends Component {
  render() {
    const { props } = this;
    const id = props.id;
    const { data } = props.message;
    const player = data.player;

    const hireEnthusiast = () => {
      productActions.hireWorker(player);
      messageActions.closeEvent(id);
      props.onclose();
    };

    const cancel = () => {
      messageActions.closeEvent(id);
      props.onclose();
    };

    const specialization = teamHelper.getTranslatedSpecialization(player);
    const hireText = `Нанять ${player.name}, ${specialization}, (${teamHelper.plain(player)})`;

    return (
      <div>
        <div className="text">
          Оо! Один из наших фанатов нашего проекта хочет помочь в разработке БЕСПЛАТНО!
        </div>
        <br />
        <Button className="button1" onClick={hireEnthusiast} text={hireText} primary />
        <br />
        <Button className="button1" onClick={cancel} text="Увы, наша команда укомплектована" primary />
      </div>
    );
  }
}
