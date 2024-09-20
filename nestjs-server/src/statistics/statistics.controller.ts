import { StatisticsService } from './statistics.service';
import { AuthGuard } from '@nestjs/passport';
import { TagService } from './../tag/tag.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/strategy/roles.decorator';
import { Role } from '../enums';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly StatisticsService: StatisticsService) {}

  @Get('tags')
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin)
  getStatistics() {
    return this.StatisticsService.getStatistics();
  }

  @Get('common')
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin)
  commonStatistic() {
    return this.StatisticsService.commonStatistic();
  }
}
