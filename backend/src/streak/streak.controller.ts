import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { StreakService } from './streak.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('streak')
@UseGuards(JwtAuthGuard)
export class StreakController {
  constructor(private streakService: StreakService) {}

  @Get()
  getStreak(@Req() req: any) {
    return this.streakService.getStreak(req.user.id);
  }

  @Patch()
  updateStreak(@Req() req: any) {
    return this.streakService.updateStreak(req.user.id);
  }
}