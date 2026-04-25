import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';

@Controller('vocabulary')
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}

  @Get('stats')
  async getStats() {
    return this.vocabularyService.getStats();
  }

  @Post()
  async create(@Body() body: any) {
    return this.vocabularyService.createVocabulary(body);
  }

  @Get()
  async getAll() {
    return this.vocabularyService.getAll();
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.vocabularyService.deleteById(Number(id));
  }
}
