import { PrismaClient } from '@/generated/prisma';

// Global variable to store the Prisma client instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create a single instance of Prisma client that will be reused
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  });

// In development, store the instance on the global object to prevent multiple instances
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Export types for convenience
export type { Expense, ExpenseCategory } from '@/generated/prisma';
