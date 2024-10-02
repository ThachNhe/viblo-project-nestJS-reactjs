import {
  Controller,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  getNotifications(@Request() req: any) {
    const userId = req.user.userId;
    return this.notificationService.getNotifications(userId);
  }

  @Put(':id/mark-as-read')
  @UseGuards(AuthGuard('jwt'))
  markAsRead(@Param('id') id: number) {
    return this.notificationService.markAsRead(id);
  }
}
