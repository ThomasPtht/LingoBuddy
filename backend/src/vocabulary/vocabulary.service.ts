import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class VocabularyService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const [total, newCount, learning, mastered] = await Promise.all([
      this.prisma.vocabulary.count(),
      this.prisma.vocabulary.count({ where: { status: 'New' } }),
      this.prisma.vocabulary.count({ where: { status: 'Learning' } }),
      this.prisma.vocabulary.count({ where: { status: 'Mastered' } }),
    ]);

    return { total, new: newCount, learning, mastered };
  }

  async createVocabulary(data: any) {
    return this.prisma.vocabulary.create({
      data: {
        expression: data.expression,
        translation: data.translation,
        category: data.category,
        contextSentence: data.contextSentence,
        status: 'New',
      },
    });
  }

  async getAll() {
    return this.prisma.vocabulary.findMany();
  }

  async deleteById(id: number) {
    return this.prisma.vocabulary.delete({ where: { id } });
  }
}
