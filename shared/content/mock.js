import Project from '../classes/Project';
import Channel from '../classes/Channel';
import Company from '../classes/Company';
import Person from '../classes/Person';

import * as IDEAS from '../constants/products/ideas';

const idea = IDEAS.IDEA_WEB_HOSTING;

export default () => {
  const numberOfPlayers = 4;

  const players = [
    // new Person('John Stokes'),
    // new Person('Lee Chang'),
    // new Person('Ricardo Alvarez'),
    // new Person('Adriana Oliveira')
  ];

  const companies = [
    // new Company(0, 'Company', 0, [], []),
    // new Company(1, 'Company1', 1, [], []),
    // new Company(2, 'Company2', 2, [], []),
    // new Company(3, 'Company3', 3, [], [])
  ];

  const standardResources = {
    programmerPoints: 100,
    managerPoints: 100,
    salesPoints: 100,

    ideas: 10
  };

  const makeProfilePool = (id) => {
    const object = {};

    object[`type${id}`] = {
      quality: 1,
      potential: 1
    };

    return object;
  };

  const projects = [];
  const channels = [];

  for (let i = 0; i < numberOfPlayers; i++) {
    projects.push(
      new Project({
        idea,
        companyId: i,
        projectId: i,

        clientProfiles: makeProfilePool(i),
        resources: standardResources
      })
    );

    players.push(new Person());

    channels.push(new Channel(i, [], 50, i, 1000, 'ru'));
    channels.push(new Channel(i, [], 125, i, 5000, 'ru'));
    channels.push(new Channel(i, [], 225, i, 50000, 'en'));

    companies.push(new Company(i, `Company ${i}`, i, [], []));
  }

  return {
    players,
    projects,
    channels,
    companies
  }
};
