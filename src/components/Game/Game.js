// import { h, Component } from 'preact';
import React, { Component, PropTypes } from 'react';

type PropsType = {};

type StateType = {};

type ResponseType = {};

export default class Game extends Component {
  state = {
    player: {
      skills: {
        level: 0,
        experience: 1000, // business experience... maybe equal to level

        discipline: 1000, // ability to perform well even in low morale. Suffers less morale if fails
        charisma: 1000, // коммуникабельность + способность управлять людьми

        talent: 1000, // is not upgradeable (level of difficulty)
        // vision: 1000, // may be done in one parameter firstly

        // профильный навык
        programming: 1000,
        marketing: 1000,
        ux: 1000,
        design: 1000,
        SEO: 1000,
      },

      // temporaries
      morale: 1000,
      energy: 1000,

      friends: 100, // NEED MORE INFO.

      reputation: 50,
      money: 20000,
    },

    products: [{
      rating: 0,
      idea: 'IDEA_WEB_STUDIO',

      features: {
        offer: {},
        programming: {
          debt: 0,
        },
        support: {},
        marketing: {},
      }
    }],
    team: []
  };

  componentWillMount() {}

  render(props: PropsType) {
    const state = this.state;
    console.log('state is', state);
    return (
      <div>
        {JSON.stringify(state)}
      </div>
    );
  }
}
