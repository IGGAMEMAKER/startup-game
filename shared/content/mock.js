import Project from '../classes/Project';
import Channel from '../classes/Channel';
import Company from '../classes/Company';
import Person from '../classes/Person';

import * as IDEAS from '../constants/products/ideas';

const idea = IDEAS.IDEA_WEB_HOSTING;

export default () => {
  const players = [
    new Person('John Stokes'),
    new Person('Lee Chang'),
    new Person('Ricardo Alvarez'),
    new Person('Adriana Oliveira')
  ];

  const companies = [
    new Company(0, 'Company', 0, [], []),
    new Company(1, 'Company1', 1, [], []),
    new Company(2, 'Company2', 2, [], []),
    new Company(3, 'Company3', 3, [], [])
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

  const projects = [
    new Project().create({
      name: 'WWWEB HOSTING',

      idea,
      companyId: 0,
      projectId: 0,

      clientProfiles: makeProfilePool(0),
      resources: standardResources
    }),
    new Project().create({
      idea,
      companyId: 1,
      projectId: 1,

      clientProfiles: makeProfilePool(1),
      resources: standardResources
    }),
    new Project().create({
      idea,
      companyId: 2,
      projectId: 2,

      clientProfiles: makeProfilePool(2),
      resources: standardResources
    }),
    new Project().create({
      idea,
      companyId: 3,
      projectId: 3,

      clientProfiles: makeProfilePool(3),
      resources: standardResources
    })
  ];

  const channels = [
    new Channel([], [], 'ru', [0, 5])
  ];

  return {
    players,
    projects,
    channels,
    companies
  }
};
