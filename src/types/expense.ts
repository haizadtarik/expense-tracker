import type { Expense } from '@/generated/prisma';
import { ExpenseCategory } from '@/generated/prisma';

// Export Prisma types
export { ExpenseCategory };
export type { Expense };

// Custom types for forms and UI
export interface CreateExpenseRequest {
  title: string;
  description?: string;
  amount: number;
  category: ExpenseCategory;
  date?: string;
  location?: string;
  tags?: string[];
  isRecurring?: boolean;
}

export interface UpdateExpenseRequest extends Partial<CreateExpenseRequest> {
  id?: string;
}

export interface ExpenseResponse {
  success: boolean;
  data: Expense;
  error?: string;
}

export interface ExpensesResponse {
  success: boolean;
  data: Expense[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  error?: string;
}

export interface CreateExpenseData {
  title: string;
  description?: string;
  amount: number;
  category: ExpenseCategory;
  date?: Date;
  location?: string;
  tags?: string;
  isRecurring?: boolean;
}

export interface UpdateExpenseData extends Partial<CreateExpenseData> {
  id: string;
}

// Expense filters and search
export interface ExpenseFilters {
  category?: ExpenseCategory;
  minAmount?: number;
  maxAmount?: number;
  startDate?: string;
  endDate?: string;
  search?: string;
  isRecurring?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Expense statistics
export interface ExpenseStats {
  totalExpenses: number;
  totalAmount: number;
  averageAmount: number;
  categoriesBreakdown: {
    category: ExpenseCategory;
    count: number;
    total: number;
    percentage: number;
  }[];
  monthlyTrend: {
    month: string;
    total: number;
    count: number;
  }[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Category colors and icons mapping
export const CATEGORY_CONFIG: Record<ExpenseCategory, { color: string; icon: string; label: string }> = {
  FOOD: { color: 'bg-emerald-500', icon: '🍽️', label: 'Food & Dining' },
  TRANSPORT: { color: 'bg-blue-500', icon: '🚗', label: 'Transportation' },
  ENTERTAINMENT: { color: 'bg-purple-500', icon: '🎬', label: 'Entertainment' },
  UTILITIES: { color: 'bg-orange-500', icon: '⚡', label: 'Utilities' },
  HEALTHCARE: { color: 'bg-red-500', icon: '🏥', label: 'Healthcare' },
  SHOPPING: { color: 'bg-pink-500', icon: '🛍️', label: 'Shopping' },
  EDUCATION: { color: 'bg-indigo-500', icon: '📚', label: 'Education' },
  TRAVEL: { color: 'bg-cyan-500', icon: '✈️', label: 'Travel' },
  BUSINESS: { color: 'bg-gray-500', icon: '💼', label: 'Business' },
  OTHER: { color: 'bg-slate-500', icon: '📦', label: 'Other' },
};

// Alias for backwards compatibility
export const categoryConfig = CATEGORY_CONFIG;
