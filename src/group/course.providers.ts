import {Group } from './entities/group.entity';

export const GroupProviders = [
  {
    provide: 'GROUP_REPOSITORY',
    useValue: Group,
  },
];
