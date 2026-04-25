import { Test, TestingModule } from '@nestjs/testing';
import { VocabularyService } from './vocabulary.service';
import { PrismaService } from '../../prisma/prisma.service';

const mockPrisma = {
  vocabulary: {
    count: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn(),
    delete: jest.fn(),
  },
};

describe('VocabularyService', () => {
  let service: VocabularyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VocabularyService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<VocabularyService>(VocabularyService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getStats', () => {
    it('should return correct stats', async () => {
      mockPrisma.vocabulary.count
        .mockResolvedValueOnce(10) // total
        .mockResolvedValueOnce(5) // new
        .mockResolvedValueOnce(3) // learning
        .mockResolvedValueOnce(2); // mastered

      const result = await service.getStats();

      expect(result).toEqual({ total: 10, new: 5, learning: 3, mastered: 2 });
      expect(mockPrisma.vocabulary.count).toHaveBeenCalledTimes(4);
    });
  });

  describe('createVocabulary', () => {
    it('should create a vocabulary entry with status New', async () => {
      const input = {
        expression: 'To call off',
        translation: 'Annuler',
        category: 'PhrasalVerb',
        contextSentence: 'They called off the meeting.',
      };

      const created = {
        id: 1,
        ...input,
        status: 'New',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: null,
      };
      mockPrisma.vocabulary.create.mockResolvedValue(created);

      const result = await service.createVocabulary(input);

      expect(mockPrisma.vocabulary.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: 'New',
            expression: 'To call off',
          }),
        }),
      );
      expect(result.status).toBe('New');
    });
  });

  describe('getAll', () => {
    it('should return all vocabulary entries', async () => {
      const mockList = [
        {
          id: 1,
          expression: 'To call off',
          translation: 'Annuler',
          status: 'New',
        },
        {
          id: 2,
          expression: 'To give up',
          translation: 'Abandonner',
          status: 'Learning',
        },
      ];
      mockPrisma.vocabulary.findMany.mockResolvedValue(mockList);

      const result = await service.getAll();

      expect(result).toHaveLength(2);
      expect(result[0].expression).toBe('To call off');
    });
  });

  describe('deleteById', () => {
    it('should delete vocabulary by id', async () => {
      const deleted = { id: 1, expression: 'To call off' };
      mockPrisma.vocabulary.delete.mockResolvedValue(deleted);

      const result = await service.deleteById(1);

      expect(mockPrisma.vocabulary.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result.id).toBe(1);
    });
  });
});
