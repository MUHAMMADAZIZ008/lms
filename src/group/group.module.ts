import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { GroupProviders } from './course.providers';
import { groupRepository } from './repository/group.repositoy';

@Module({
  controllers: [GroupController],
  providers: [GroupService, ...GroupProviders, groupRepository],
})
export class GroupModule {}
