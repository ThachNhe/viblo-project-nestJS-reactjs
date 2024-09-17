import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag, Post, User, Comment } from '../entity/index';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Post, User, Comment])],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
