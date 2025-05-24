'use client';

import { ExpenseFilters } from '@/components/expenses/ExpenseFilters';
import { ExpenseForm } from '@/components/expenses/ExpenseForm';
import { ExpenseList } from '@/components/expenses/ExpenseList';
import { ExpenseStats } from '@/components/expenses/ExpenseStats';
import { Expense, ExpenseFilters as ExpenseFiltersType } from '@/types/expense';
import { useCallback, useEffect, useState } from 'react';

interface ExpenseStats {
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
}

export default function ExpenseDashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [stats, setStats] = useState<ExpenseStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [filters, setFilters] = useState<ExpenseFiltersType>({
    page: 1,
    limit: 10,
  });

  // Fetch expenses
  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });

      const response = await fetch(`/api/expenses?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setExpenses(data.data);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await fetch('/api/expenses/stats');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchStats();
  }, [fetchExpenses]);

  const handleExpenseCreated = () => {
    setShowForm(false);
    fetchExpenses();
    fetchStats();
  };

  const handleExpenseUpdated = () => {
    setEditingExpense(null);
    fetchExpenses();
    fetchStats();
  };

  const handleExpenseDeleted = () => {
    fetchExpenses();
    fetchStats();
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleFiltersChange = (newFilters: Partial<ExpenseFiltersType>) => {
    setFilters({ ...filters, ...newFilters, page: 1 });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
          <p className="text-gray-600 mt-2">Track and manage your expenses efficiently</p>
        </div>

        {/* Stats Section */}
        {stats && (
          <div className="mb-8">
            <ExpenseStats stats={stats} />
          </div>
        )}

        {/* Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <button
            onClick={() => {
              setEditingExpense(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add New Expense
          </button>
          
          <ExpenseFilters filters={filters} onFiltersChange={handleFiltersChange} />
        </div>

        {/* Expense Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editingExpense ? 'Edit Expense' : 'Add New Expense'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingExpense(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <ExpenseForm
                expense={editingExpense}
                onSuccess={editingExpense ? handleExpenseUpdated : handleExpenseCreated}
                onCancel={() => {
                  setShowForm(false);
                  setEditingExpense(null);
                }}
              />
            </div>
          </div>
        )}

        {/* Expense List */}
        <ExpenseList
          expenses={expenses}
          loading={loading}
          onEdit={handleEditExpense}
          onDelete={handleExpenseDeleted}
        />
      </div>
    </div>
  );
}
