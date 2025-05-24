'use client';

import { formatCurrency } from '@/lib/expense-utils';
import { CATEGORY_CONFIG, Expense } from '@/types/expense';

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

// Default category config for unknown categories
const defaultCategoryInfo = {
  label: 'Unknown',
  icon: '❓',
  color: 'bg-gray-400',
};

export function ExpenseStats({ stats }: ExpenseStatsProps) {
  const { summary, categoryBreakdown, monthlySpending } = stats;

  return (
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
      {/* Summary Cards */}
      <div className='lg:col-span-3'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
          <div className='rounded-lg bg-white p-6 shadow'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Total Spent</p>
                <p className='text-2xl font-bold text-gray-900'>
                  {formatCurrency(summary.totalAmount)}
                </p>
              </div>
              <div className='text-3xl'>💰</div>
            </div>
          </div>

          <div className='rounded-lg bg-white p-6 shadow'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  Total Expenses
                </p>
                <p className='text-2xl font-bold text-gray-900'>
                  {summary.totalCount}
                </p>
              </div>
              <div className='text-3xl'>📊</div>
            </div>
          </div>

          <div className='rounded-lg bg-white p-6 shadow'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  Average Expense
                </p>
                <p className='text-2xl font-bold text-gray-900'>
                  {formatCurrency(summary.averageAmount)}
                </p>
              </div>
              <div className='text-3xl'>📈</div>
            </div>
          </div>

          <div className='rounded-lg bg-white p-6 shadow'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  Highest Expense
                </p>
                <p className='text-2xl font-bold text-gray-900'>
                  {summary.highestExpense
                    ? formatCurrency(summary.highestExpense.amount)
                    : formatCurrency(0)}
                </p>
              </div>
              <div className='text-3xl'>🏆</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className='rounded-lg bg-white p-6 shadow lg:col-span-2'>
        <h3 className='mb-4 text-lg font-semibold text-gray-900'>
          Spending by Category
        </h3>
        <div className='space-y-4'>
          {categoryBreakdown
            .sort((a, b) => b.total - a.total)
            .slice(0, 6)
            .map(item => {
              const categoryInfo =
                CATEGORY_CONFIG[
                  item.category as keyof typeof CATEGORY_CONFIG
                ] || defaultCategoryInfo;
              return (
                <div
                  key={item.category}
                  className='flex items-center justify-between'
                >
                  <div className='flex items-center gap-3'>
                    <span className='text-xl'>{categoryInfo.icon}</span>
                    <div>
                      <p className='font-medium text-gray-900'>
                        {categoryInfo.label}
                      </p>
                      <p className='text-sm text-gray-500'>
                        {item.count} expenses
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='font-semibold text-gray-900'>
                      {formatCurrency(item.total)}
                    </p>
                    <p className='text-sm text-gray-500'>
                      {item.percentage.toFixed(1)}%
                    </p>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Category Progress Bars */}
        <div className='mt-6 space-y-3'>
          {categoryBreakdown
            .sort((a, b) => b.total - a.total)
            .slice(0, 5)
            .map(item => {
              const categoryInfo =
                CATEGORY_CONFIG[
                  item.category as keyof typeof CATEGORY_CONFIG
                ] || defaultCategoryInfo;
              return (
                <div key={`progress-${item.category}`}>
                  <div className='mb-1 flex items-center justify-between'>
                    <span className='text-sm font-medium text-gray-700'>
                      {categoryInfo.icon} {categoryInfo.label}
                    </span>
                    <span className='text-sm text-gray-500'>
                      {item.percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className='h-2 w-full rounded-full bg-gray-200'>
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${categoryInfo.color}`}
                      style={{
                        width: `${item.percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Monthly Spending Trend */}
      <div className='rounded-lg bg-white p-6 shadow'>
        <h3 className='mb-4 text-lg font-semibold text-gray-900'>
          Monthly Spending
        </h3>
        <div className='space-y-3'>
          {monthlySpending.slice(0, 6).map(month => {
            const maxAmount = Math.max(...monthlySpending.map(m => m.total));
            const percentage =
              maxAmount > 0 ? (month.total / maxAmount) * 100 : 0;

            return (
              <div key={month.month}>
                <div className='mb-1 flex items-center justify-between'>
                  <span className='text-sm font-medium text-gray-700'>
                    {new Date(month.month + '-01').toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                    })}
                  </span>
                  <span className='text-sm font-semibold text-gray-900'>
                    {formatCurrency(month.total)}
                  </span>
                </div>
                <div className='h-2 w-full rounded-full bg-gray-200'>
                  <div
                    className='h-2 rounded-full bg-blue-600 transition-all duration-300'
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
