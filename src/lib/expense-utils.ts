import { ExpenseCategory, type Expense } from '@/generated/prisma';
import { CATEGORY_CONFIG } from '@/types/expense';

/**
 * Format currency amount
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(dateObj);
}

/**
 * Format date for form inputs (YYYY-MM-DD)
 */
export function formatDateForInput(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString().split('T')[0];
}

/**
 * Get category configuration
 */
export function getCategoryConfig(category: ExpenseCategory) {
  return CATEGORY_CONFIG[category];
}

/**
 * Get category color class
 */
export function getCategoryColor(category: ExpenseCategory): string {
  return CATEGORY_CONFIG[category].color;
}

/**
 * Get category icon
 */
export function getCategoryIcon(category: ExpenseCategory): string {
  return CATEGORY_CONFIG[category].icon;
}

/**
 * Get category label
 */
export function getCategoryLabel(category: ExpenseCategory): string {
  return CATEGORY_CONFIG[category].label;
}

/**
 * Parse tags string to array
 */
export function parseTags(tagsString?: string | null): string[] {
  if (!tagsString) return [];
  return tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
}

/**
 * Convert tags array to string
 */
export function stringifyTags(tags: string[]): string {
  return tags.filter(Boolean).join(', ');
}

/**
 * Calculate expense statistics
 */
export function calculateExpenseStats(expenses: Expense[]) {
  const totalExpenses = expenses.length;
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageAmount = totalExpenses > 0 ? totalAmount / totalExpenses : 0;

  // Category breakdown
  const categoryStats = new Map<ExpenseCategory, { count: number; total: number }>();
  
  expenses.forEach(expense => {
    const existing = categoryStats.get(expense.category) || { count: 0, total: 0 };
    categoryStats.set(expense.category, {
      count: existing.count + 1,
      total: existing.total + expense.amount,
    });
  });

  const categoriesBreakdown = Array.from(categoryStats.entries()).map(([category, stats]) => ({
    category,
    count: stats.count,
    total: stats.total,
    percentage: totalAmount > 0 ? (stats.total / totalAmount) * 100 : 0,
  }));

  // Monthly trend (simplified - would need more complex logic for real app)
  const monthlyStats = new Map<string, { total: number; count: number }>();
  
  expenses.forEach(expense => {
    const monthKey = new Date(expense.date).toISOString().slice(0, 7); // YYYY-MM
    const existing = monthlyStats.get(monthKey) || { total: 0, count: 0 };
    monthlyStats.set(monthKey, {
      total: existing.total + expense.amount,
      count: existing.count + 1,
    });
  });

  const monthlyTrend = Array.from(monthlyStats.entries())
    .map(([month, stats]) => ({
      month,
      total: stats.total,
      count: stats.count,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));

  return {
    totalExpenses,
    totalAmount,
    averageAmount,
    categoriesBreakdown,
    monthlyTrend,
  };
}

/**
 * Filter expenses based on criteria
 */
export function filterExpenses(
  expenses: Expense[],
  filters: {
    category?: ExpenseCategory;
    minAmount?: number;
    maxAmount?: number;
    startDate?: Date;
    endDate?: Date;
    search?: string;
    isRecurring?: boolean;
  }
): Expense[] {
  return expenses.filter(expense => {
    // Category filter
    if (filters.category && expense.category !== filters.category) {
      return false;
    }

    // Amount filters
    if (filters.minAmount && expense.amount < filters.minAmount) {
      return false;
    }
    if (filters.maxAmount && expense.amount > filters.maxAmount) {
      return false;
    }

    // Date filters
    if (filters.startDate && new Date(expense.date) < filters.startDate) {
      return false;
    }
    if (filters.endDate && new Date(expense.date) > filters.endDate) {
      return false;
    }

    // Search filter (title, description, location, tags)
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const searchFields = [
        expense.title,
        expense.description,
        expense.location,
        expense.tags,
      ].filter(Boolean).join(' ').toLowerCase();
      
      if (!searchFields.includes(searchTerm)) {
        return false;
      }
    }

    // Recurring filter
    if (filters.isRecurring !== undefined && expense.isRecurring !== filters.isRecurring) {
      return false;
    }

    return true;
  });
}

/**
 * Sort expenses by different criteria
 */
export function sortExpenses(
  expenses: Expense[],
  sortBy: 'date' | 'amount' | 'title' | 'category',
  order: 'asc' | 'desc' = 'desc'
): Expense[] {
  const sortedExpenses = [...expenses];

  sortedExpenses.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'date':
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case 'amount':
        comparison = a.amount - b.amount;
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'category':
        comparison = a.category.localeCompare(b.category);
        break;
      default:
        return 0;
    }

    return order === 'asc' ? comparison : -comparison;
  });

  return sortedExpenses;
}

/**
 * Validate expense data
 */
export function validateExpenseData(data: {
  title?: string;
  amount?: number;
  category?: string;
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.title || data.title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (!data.amount || data.amount <= 0) {
    errors.push('Amount must be greater than 0');
  }

  if (!data.category || !Object.values(ExpenseCategory).includes(data.category as ExpenseCategory)) {
    errors.push('Valid category is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
