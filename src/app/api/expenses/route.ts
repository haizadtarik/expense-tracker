import { ExpenseCategory, Prisma } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';
import { CreateExpenseRequest, ExpenseResponse, ExpensesResponse } from '@/types/expense';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/expenses - Fetch expenses with optional filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category') as ExpenseCategory | null;
    const search = searchParams.get('search');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const sortBy = searchParams.get('sortBy') || 'date';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: Prisma.ExpenseWhereInput = {};
    
    if (category) {
      where.category = category;
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { location: { contains: search } },
      ];
    }
    
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate);
      if (endDate) where.date.lte = new Date(endDate);
    }

    // Build orderBy clause
    const orderBy: Prisma.ExpenseOrderByWithRelationInput = {};
    (orderBy as Record<string, string>)[sortBy] = sortOrder;

    // Fetch expenses and total count
    const [expenses, total] = await Promise.all([
      prisma.expense.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.expense.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    const response: ExpensesResponse = {
      success: true,
      data: expenses,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext,
        hasPrev,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch expenses' },
      { status: 500 }
    );
  }
}

// POST /api/expenses - Create a new expense
export async function POST(request: NextRequest) {
  try {
    const body: CreateExpenseRequest = await request.json();
    
    // Validate required fields
    if (!body.title || !body.amount || !body.category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate amount is positive
    if (body.amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Amount must be positive' },
        { status: 400 }
      );
    }

    // Create expense
    const expense = await prisma.expense.create({
      data: {
        title: body.title,
        description: body.description,
        amount: body.amount,
        category: body.category,
        date: body.date ? new Date(body.date) : new Date(),
        location: body.location,
        tags: body.tags ? body.tags.join(',') : null,
        isRecurring: body.isRecurring || false,
      },
    });

    const response: ExpenseResponse = {
      success: true,
      data: expense,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating expense:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create expense' },
      { status: 500 }
    );
  }
}
