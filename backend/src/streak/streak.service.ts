import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StreakService {
  constructor(private prisma: PrismaService) {}

  async updateStreak(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const lastReview = user.lastReviewAt ? new Date(user.lastReviewAt) : null;
    if (lastReview) lastReview.setHours(0, 0, 0, 0);

    let streakCount = user.streakCount;

    if (!lastReview) {
      streakCount = 1;
    } else if (lastReview.getTime() === today.getTime()) {
      return { streakCount }; // déjà compté aujourd'hui
    } else if (lastReview.getTime() === yesterday.getTime()) {
      streakCount += 1; // streak continue
    } else {
      streakCount = 1; // streak cassée
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: { streakCount, lastReviewAt: new Date() },
      select: { streakCount: true },
    });
  }

  async getStreak(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { streakCount: true, lastReviewAt: true },
    });
    return user;
  }
}
