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
        // experience: 1000, // business experience... maybe equal to level

        discipline: 1000, // ability to perform well even in low morale. Suffers less morale if fails
        charisma: 1000, // коммуникабельность + способность управлять людьми

          // talent is not shown anywhere
          // is not upgradeable (level of difficulty)
          talent: 1000,
        // vision: 1000, // may be done in one parameter firstly

        // профильный навык
        programming: 1000,
        design: 1000,
        ux: 1000,

        marketing: 1000,
        SEO: 1000,
      },

      // temporaries
      morale: 1000,
      energy: 1000,

      // friends: 100, // NEED MORE INFO.

      reputation: 50,
      money: 20000,
    },

    products: [{
      rating: 0,
      idea: 'IDEA_WEB_STUDIO',

      features: {
        offer: {},
        programming: {},
        marketing: {},
        analytics: {},

        // not only chat with users, but also localisations, content updates
        // and all sort of things, that you need doing constantly
        support: {},
      },

      bonuses: {
        debt: 0, // technical debt. Shows, how fast can you implement new features
      }
    }],

    team: [],

    expenses: [{
      type: 'EXPENSES_FOOD',
      quality: 0, // poor. Eat doshik and be happy (no) costs low money
      price: 100,
      regularity: 1, // everyday, 2 - once a week, 3 - once a month, 4 - once in half of the year, 5 - yearly
    }]
  };

  componentWillMount() {}

  render(props: PropsType) {
    const state = this.state;
    console.log('state is', state);
    return (
      <div>
        <div>
          <div>Навыки</div>
          <div></div>
        </div>
        {JSON.stringify(state)}
      </div>
    );
  }
}
