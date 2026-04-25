import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VocabularyService } from './vocabulary/vocabulary.service';
import { VocabularyController } from './vocabulary/vocabulary.controller';
import { AuthModule } from './auth/auth.module';
import { GeminiModule } from './gemini/gemini.module';
import { PrismaModule } from '../prisma/prisma.module';
import { StreakModule } from './streak/streak.module';

@Module({
  imports: [AuthModule, GeminiModule, PrismaModule, StreakModule],
  controllers: [AppController, VocabularyController],
  providers: [AppService, VocabularyService],
})
export class AppModule {}
