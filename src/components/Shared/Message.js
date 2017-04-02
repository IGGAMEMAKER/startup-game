// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

type PropsType = {};

type StateType = {};

type ResponseType = {};

import messageStore from '../../stores/message-store';

import s from './Message.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class Message extends Component {
  state = {};

  componentWillMount() {
    messageStore.addChangeListener(this.getMessages);
  }

  getMessages = () => {
    this.setState({
      messages: messageStore.getMessages(),
      drawable: messageStore.isDrawable()
    })
  };

  render() {
    const { state } = this;

    // if (!state.drawable) return <div></div>;

    return (
      <div className={s.messageTab}>
        MESSAGETAB!!!
      </div>
    );
  }
}

export default withStyles(Message, s);
