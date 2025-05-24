'use client';

import { formatCurrency, formatDate } from '@/lib/expense-utils';
import { categoryConfig, Expense } from '@/types/expense';
import { useState } from 'react';

interface ExpenseListProps {
  expenses: Expense[];
  loading: boolean;
  onEdit: (expense: Expense) => void;
  onDelete: () => void;
}

export function ExpenseList({ expenses, loading, onEdit, onDelete }: ExpenseListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (expense: Expense) => {
    if (!confirm(`Are you sure you want to delete "${expense.title}"?`)) {
      return;
    }

    setDeletingId(expense.id);

    try {
      const response = await fetch(`/api/expenses/${expense.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        onDelete();
      } else {
        alert('Failed to delete expense');
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4">💸</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses found</h3>
          <p className="text-gray-500">Start tracking your expenses by adding your first expense.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Expenses</h2>
        <div className="space-y-4">
          {expenses.map((expense) => {
            const categoryInfo = categoryConfig[expense.category as keyof typeof categoryConfig];
            
            return (
              <div
                key={expense.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{categoryInfo.icon}</span>
                      <div>
                        <h3 className="font-medium text-gray-900">{expense.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span
                            className="px-2 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: `${categoryInfo.color}20`,
                              color: categoryInfo.color,
                            }}
                          >
                            {categoryInfo.label}
                          </span>
                          <span>•</span>
                          <span>{formatDate(expense.date)}</span>
                          {expense.location && (
                            <>
                              <span>•</span>
                              <span>📍 {expense.location}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {expense.description && (
                      <p className="text-gray-600 text-sm mb-2">{expense.description}</p>
                    )}
                    
                    {expense.tags && expense.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {expense.tags.split(',').map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            #{tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {expense.isRecurring && (
                      <div className="flex items-center gap-1 text-xs text-blue-600">
                        <span>🔄</span>
                        <span>Recurring</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-xl font-bold text-gray-900">
                      {formatCurrency(expense.amount)}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(expense)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(expense)}
                        disabled={deletingId === expense.id}
                        className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                      >
                        {deletingId === expense.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
