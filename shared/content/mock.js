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
    new Company(0, 'Abstergo', 0, [], []),
    new Company(1, 'Abstergo1', 1, [], []),
    new Company(2, 'Abstergo2', 2, [], []),
    new Company(3, 'Abstergo3', 3, [], [])
  ];

  const projects = [
    new Project().create({
      idea,
      name: 'WWWEB HOSTING',
      companyId: 0,
      projectId: 0
    }),
    new Project().create({
      idea,
      companyId: 1,
      projectId: 1
    }),
    new Project().create({
      idea,
      companyId: 2,
      projectId: 2
    }),
    new Project().create({
      idea,
      companyId: 3,
      projectId: 3
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
