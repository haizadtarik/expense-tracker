'use client';

import { formatCurrency } from '@/lib/expense-utils';
import { Expense } from '@/types/expense';

interface ExpenseStatsProps {
  stats: {
    summary: {
      totalAmount: number;
      totalCount: number;
      averageAmount: number;
      highestExpense: Expense | null;
    };
    categoryBreakdown: Array<{
      category: string;
      total: number;
      count: number;
      percentage: number;
    }>;
    monthlySpending: Array<{
      month: string;
      total: number;
    }>;
    recentExpenses: Expense[];
  };
}

const categoryConfig = {
  FOOD: { label: 'Food', icon: '🍽️', color: '#ef4444' },
  TRANSPORTATION: { label: 'Transportation', icon: '🚗', color: '#3b82f6' },
  ENTERTAINMENT: { label: 'Entertainment', icon: '🎬', color: '#8b5cf6' },
  SHOPPING: { label: 'Shopping', icon: '🛍️', color: '#ec4899' },
  HEALTH: { label: 'Health', icon: '🏥', color: '#10b981' },
  UTILITIES: { label: 'Utilities', icon: '⚡', color: '#f59e0b' },
  EDUCATION: { label: 'Education', icon: '📚', color: '#06b6d4' },
  OTHER: { label: 'Other', icon: '📦', color: '#6b7280' },
};

// Default category config for unknown categories
const defaultCategoryInfo = { label: 'Unknown', icon: '❓', color: '#9ca3af' };

export function ExpenseStats({ stats }: ExpenseStatsProps) {
  const { summary, categoryBreakdown, monthlySpending } = stats;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Summary Cards */}
      <div className="lg:col-span-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(summary.totalAmount)}
                </p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-gray-900">{summary.totalCount}</p>
              </div>
              <div className="text-3xl">📊</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Expense</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(summary.averageAmount)}
                </p>
              </div>
              <div className="text-3xl">📈</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Highest Expense</p>
                <p className="text-2xl font-bold text-gray-900">
                  {summary.highestExpense
                    ? formatCurrency(summary.highestExpense.amount)
                    : formatCurrency(0)
                  }
                </p>
              </div>
              <div className="text-3xl">🏆</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending by Category</h3>
        <div className="space-y-4">
          {categoryBreakdown
            .sort((a, b) => b.total - a.total)
            .slice(0, 6)
            .map((item) => {
              const categoryInfo = categoryConfig[item.category as keyof typeof categoryConfig] || defaultCategoryInfo;
              return (
                <div key={item.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{categoryInfo.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900">{categoryInfo.label}</p>
                      <p className="text-sm text-gray-500">{item.count} expenses</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(item.total)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.percentage.toFixed(1)}%
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
        
        {/* Category Progress Bars */}
        <div className="mt-6 space-y-3">
          {categoryBreakdown
            .sort((a, b) => b.total - a.total)
            .slice(0, 5)
            .map((item) => {
              const categoryInfo = categoryConfig[item.category as keyof typeof categoryConfig] || defaultCategoryInfo;
              return (
                <div key={`progress-${item.category}`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {categoryInfo.icon} {categoryInfo.label}
                    </span>
                    <span className="text-sm text-gray-500">
                      {item.percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: categoryInfo.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Monthly Spending Trend */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Spending</h3>
        <div className="space-y-3">
          {monthlySpending.slice(0, 6).map((month) => {
            const maxAmount = Math.max(...monthlySpending.map(m => m.total));
            const percentage = maxAmount > 0 ? (month.total / maxAmount) * 100 : 0;
            
            return (
              <div key={month.month}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {new Date(month.month + '-01').toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short'
                    })}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {formatCurrency(month.total)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}