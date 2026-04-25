import { Test, TestingModule } from '@nestjs/testing';
import { StreakService } from './streak.service';
import { PrismaService } from '../../prisma/prisma.service';

const mockUser = {
  id: 1,
  email: 'test@test.com',
  username: 'thomas',
  streakCount: 0,
  lastReviewAt: null,
  password: 'hashed',
  createdAt: new Date(),
  vocabularies: [],
};

const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

describe('StreakService', () => {
  let service: StreakService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StreakService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<StreakService>(StreakService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw if user not found', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);
    await expect(service.updateStreak(999)).rejects.toThrow('User not found');
  });

  it('should set streak to 1 on first review', async () => {
    mockPrisma.user.findUnique.mockResolvedValue({
      ...mockUser,
      lastReviewAt: null,
      streakCount: 0,
    });
    mockPrisma.user.update.mockResolvedValue({ streakCount: 1 });

    const result = await service.updateStreak(1);

    expect(mockPrisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ streakCount: 1 }),
      }),
    );
    expect(result.streakCount).toBe(1);
  });

  it('should increment streak if last review was yesterday', async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(12, 0, 0, 0); // heure quelconque dans la journée

    mockPrisma.user.findUnique.mockResolvedValue({
      ...mockUser,
      lastReviewAt: yesterday,
      streakCount: 3,
    });
    mockPrisma.user.update.mockResolvedValue({ streakCount: 4 });

    const result = await service.updateStreak(1);

    expect(mockPrisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ streakCount: 4 }),
      }),
    );
    expect(result.streakCount).toBe(4);
  });

  it('should reset streak to 1 if last review was more than 1 day ago', async () => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    threeDaysAgo.setHours(12, 0, 0, 0);

    mockPrisma.user.findUnique.mockResolvedValue({
      ...mockUser,
      lastReviewAt: threeDaysAgo,
      streakCount: 10,
    });
    mockPrisma.user.update.mockResolvedValue({ streakCount: 1 });

    const result = await service.updateStreak(1);

    expect(mockPrisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ streakCount: 1 }),
      }),
    );
    expect(result.streakCount).toBe(1);
  });

  it('should not update if already reviewed today', async () => {
    const today = new Date();
    today.setHours(8, 0, 0, 0); // ce matin

    mockPrisma.user.findUnique.mockResolvedValue({
      ...mockUser,
      lastReviewAt: today,
      streakCount: 5,
    });

    const result = await service.updateStreak(1);

    expect(mockPrisma.user.update).not.toHaveBeenCalled();
    expect(result.streakCount).toBe(5);
  });

  it('should return streak data for getStreak', async () => {
    const now = new Date();
    mockPrisma.user.findUnique.mockResolvedValue({
      streakCount: 7,
      lastReviewAt: now,
    });

    const result = await service.getStreak(1);

    expect(result?.streakCount).toBe(7);
    expect(result?.lastReviewAt).toEqual(now);
  });
});
