import { Prisma } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Build where clause for date filtering
    const where: Prisma.ExpenseWhereInput = {};
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate);
      if (endDate) where.date.lte = new Date(endDate);
    }

    // Get total expenses and count
    const [totalExpenses, expenseCount] = await Promise.all([
      prisma.expense.aggregate({
        where,
        _sum: {
          amount: true,
        },
      }),
      prisma.expense.count({ where }),
    ]);

    // Get expenses by category
    const expensesByCategory = await prisma.expense.groupBy({
      by: ['category'],
      where,
      _sum: {
        amount: true,
      },
      _count: {
        _all: true,
      },
    });

    // Get recent expenses (last 5)
    const recentExpenses = await prisma.expense.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });

    // Get monthly spending (last 12 months)
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const monthlySpending = await prisma.$queryRaw<
      Array<{ month: string; total: number }>
    >`
      SELECT 
        TO_CHAR(date, 'YYYY-MM') as month,
        SUM(amount) as total
      FROM expenses 
      WHERE date >= ${oneYearAgo}
      GROUP BY TO_CHAR(date, 'YYYY-MM')
      ORDER BY month DESC
      LIMIT 12
    `;

    // Calculate average expense
    const averageExpense =
      expenseCount > 0 ? (totalExpenses._sum.amount || 0) / expenseCount : 0;

    // Get highest expense
    const highestExpense = await prisma.expense.findFirst({
      where,
      orderBy: {
        amount: 'desc',
      },
    });

    // Format category data
    const categoryData = expensesByCategory.map(item => ({
      category: item.category,
      total: item._sum.amount || 0,
      count: item._count._all,
      percentage: totalExpenses._sum.amount
        ? ((item._sum.amount || 0) / (totalExpenses._sum.amount || 1)) * 100
        : 0,
    }));

    const response = {
      success: true,
      data: {
        summary: {
          totalAmount: totalExpenses._sum.amount || 0,
          totalCount: expenseCount,
          averageAmount: averageExpense,
          highestExpense,
        },
        categoryBreakdown: categoryData,
        monthlySpending: monthlySpending.reverse(), // Most recent first
        recentExpenses,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching expense statistics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch expense statistics' },
      { status: 500 }
    );
  }
}
