import { StatisticsService } from './statistics.service';
import { AuthGuard } from '@nestjs/passport';
import { TagService } from './../tag/tag.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/strategy/roles.decorator';
import { Role } from '../enums';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  TagCommonStatisticsApiResponseDTO,
  TagStatisticsApiResponseDTO,
} from './dto/statistic-response.dto';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly StatisticsService: StatisticsService) {}

  @Get('tags')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: TagStatisticsApiResponseDTO })
  @Roles(Role.Admin)
  getStatistics() {
    return this.StatisticsService.getStatistics();
  }

  @Get('common')
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin)
  @ApiOkResponse({ type: TagCommonStatisticsApiResponseDTO })
  commonStatistic() {
    return this.StatisticsService.commonStatistic();
  }
}
