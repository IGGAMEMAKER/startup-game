// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

import Button from '../../Shared/Button';

import playerActions from '../../../actions/player-actions';
import messageActions from '../../../actions/message-actions';

import s from './Events.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

type PropsType = {};

type StateType = {};

type ResponseType = {};

import teamHelper from '../../../helpers/team/skills';

class HireEnthusiastEvent extends Component {
  state = {};

  componentWillMount() {}

  render() {
    const { props } = this;
    const id = props.id;
    const { data } = props.message;
    const player = data.player;

    const hireEnthusiast = () => {
      playerActions.hireWorker(player);
      messageActions.closeEvent(id);
    };

    const cancel = () => {
      messageActions.closeEvent(id);
    };

    const specialization = teamHelper.getTranslatedSpecialization(player);
    const hireText = `Нанять ${player.name}, ${specialization}, (${teamHelper.plain(player)})`;

    return (
      <div>
        <div className={s.text}>
          Оо! Один из наших фанатов нашего проекта хочет помочь в разработке БЕСПЛАТНО!
        </div>
        <br />
        <Button className={s.button1} onClick={hireEnthusiast} text={hireText} primary />
        <br />
        <Button className={s.button1} onClick={cancel} text="Увы, наша команда укомплектована" primary />
      </div>
    );
  }
}

export default withStyles(HireEnthusiastEvent, s);
