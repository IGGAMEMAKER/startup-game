import Project from '../classes/Project';
import Channel from '../classes/Channel';
import Resources from '../classes/Resources';
import Company from '../classes/Company';
import Person from '../classes/Person';

import * as IDEAS from '../constants/products/ideas';

const idea = IDEAS.IDEA_WEB_HOSTING;

const makeProfilePool = (id) => {
  const object = {};

  object[`type${id}`] = {
    quality: 1,
    potential: 1
  };

  return object;
};

export default () => {
  const numberOfPlayers = 4;
  const numberOfChannelsPerPlayer = 4;

  const standardResources = () => new Resources()
    .ideas(10)
    .managerPoints(100)
    .money(45000)
    .programmerPoints(100);

  const players = [];
  const companies = [];
  const projects = [];
  const channels = [];

  for (let i = 0; i < numberOfPlayers; i++) {
    players.push(new Person());

    const initialChannelId = i * numberOfChannelsPerPlayer;

    const channelRecord = {
      id: initialChannelId,
      clients: 0,
      adPower: 0
    };

    projects.push(
      new Project({
        idea,
        companyId: i,
        projectId: i,
        channels: [channelRecord],

        servers: 0,
        security: 0,

        clientProfiles: makeProfilePool(i),
        resources: standardResources()
      })
    );


    channels.push(new Channel(initialChannelId,     50, 50, i, 1000, 'ru'));
    channels.push(new Channel(initialChannelId + 1, 125, 125, i, 5000, 'ru'));
    channels.push(new Channel(initialChannelId + 2, 225, 225, i, 15000, 'en'));
    channels.push(new Channel(initialChannelId + 3, 325, 325, i, 50000, 'en'));

    companies.push(new Company(i, `Company ${i}`, i, [], []));
  }

  return {
    players,
    projects,
    channels,
    companies
  }
};
