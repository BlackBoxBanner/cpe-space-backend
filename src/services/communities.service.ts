import prisma from '@/utils/prisma';
import { Communities } from '@prisma/client';

export async function createCommunity(data: Communities): Promise<Communities> {
  return await prisma.communities.create({ data });
}

export async function findCommunity(
  query: Partial<Omit<Communities, 'createdAt'>>,
): Promise<Communities[]> {
  return await prisma.communities.findMany({
    where: query,
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
}

export async function findCommunitybyId(
  id: string,
): Promise<Communities | null> {
  return await prisma.communities.findUnique({ where: { id } });
}

export async function updateCommunity(data: Communities): Promise<Communities> {
  return prisma.communities.update({ where: { id: data.id }, data: data });
}

export async function deleteCommunity(id: string) {
  return prisma.communities.delete({ where: { id } });
}
