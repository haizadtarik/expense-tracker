import { ExpenseCategory, PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

const sampleExpenses = [
  {
    title: 'Grocery Shopping',
    description: 'Weekly groceries from Whole Foods',
    amount: 89.45,
    category: ExpenseCategory.FOOD,
    location: 'Whole Foods Market',
    tags: 'weekly,groceries,organic',
    date: new Date('2024-01-15'),
  },
  {
    title: 'Gas Station Fill-up',
    description: 'Regular gas fill-up',
    amount: 45.20,
    category: ExpenseCategory.TRANSPORT,
    location: 'Shell Station',
    tags: 'gas,car,transportation',
    date: new Date('2024-01-14'),
  },
  {
    title: 'Netflix Subscription',
    description: 'Monthly Netflix subscription',
    amount: 15.99,
    category: ExpenseCategory.ENTERTAINMENT,
    tags: 'subscription,streaming,monthly',
    isRecurring: true,
    date: new Date('2024-01-01'),
  },
  {
    title: 'Electricity Bill',
    description: 'January electricity bill',
    amount: 120.33,
    category: ExpenseCategory.UTILITIES,
    tags: 'bill,monthly,electricity',
    isRecurring: true,
    date: new Date('2024-01-05'),
  },
  {
    title: 'Doctor Visit',
    description: 'Annual checkup with Dr. Smith',
    amount: 250.00,
    category: ExpenseCategory.HEALTHCARE,
    location: 'City Medical Center',
    tags: 'health,checkup,annual',
    date: new Date('2024-01-10'),
  },
  {
    title: 'Coffee Shop',
    description: 'Morning coffee and pastry',
    amount: 8.75,
    category: ExpenseCategory.FOOD,
    location: 'Local Coffee House',
    tags: 'coffee,breakfast,daily',
    date: new Date('2024-01-16'),
  },
  {
    title: 'New Headphones',
    description: 'Wireless Bluetooth headphones',
    amount: 199.99,
    category: ExpenseCategory.SHOPPING,
    location: 'Best Buy',
    tags: 'electronics,audio,bluetooth',
    date: new Date('2024-01-12'),
  },
  {
    title: 'Online Course',
    description: 'React Advanced Patterns course',
    amount: 79.99,
    category: ExpenseCategory.EDUCATION,
    tags: 'education,programming,react',
    date: new Date('2024-01-08'),
  },
  {
    title: 'Hotel Booking',
    description: 'Weekend getaway hotel',
    amount: 189.50,
    category: ExpenseCategory.TRAVEL,
    location: 'Mountain Resort',
    tags: 'hotel,weekend,vacation',
    date: new Date('2024-01-13'),
  },
  {
    title: 'Office Supplies',
    description: 'Notebooks, pens, and sticky notes',
    amount: 34.65,
    category: ExpenseCategory.BUSINESS,
    location: 'Office Depot',
    tags: 'office,supplies,stationery',
    date: new Date('2024-01-09'),
  },
  {
    title: 'Movie Tickets',
    description: 'Evening movie with friends',
    amount: 24.50,
    category: ExpenseCategory.ENTERTAINMENT,
    location: 'AMC Theater',
    tags: 'movies,friends,evening',
    date: new Date('2024-01-11'),
  },
  {
    title: 'Uber Ride',
    description: 'Ride to airport',
    amount: 32.80,
    category: ExpenseCategory.TRANSPORT,
    location: 'Home to Airport',
    tags: 'uber,airport,rideshare',
    date: new Date('2024-01-13'),
  },
  {
    title: 'Phone Bill',
    description: 'Monthly mobile phone bill',
    amount: 65.00,
    category: ExpenseCategory.UTILITIES,
    tags: 'phone,monthly,mobile',
    isRecurring: true,
    date: new Date('2024-01-01'),
  },
  {
    title: 'Gym Membership',
    description: 'Monthly gym membership fee',
    amount: 49.99,
    category: ExpenseCategory.HEALTHCARE,
    location: 'FitLife Gym',
    tags: 'gym,fitness,monthly',
    isRecurring: true,
    date: new Date('2024-01-01'),
  },
  {
    title: 'Lunch Meeting',
    description: 'Business lunch with client',
    amount: 67.30,
    category: ExpenseCategory.BUSINESS,
    location: 'Downtown Bistro',
    tags: 'business,lunch,client',
    date: new Date('2024-01-15'),
  },
];

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clean existing data
  await prisma.expense.deleteMany();
  console.log('🗑️  Cleared existing expenses');

  // Seed with sample data
  console.log('📊 Creating sample expenses...');

  for (const expense of sampleExpenses) {
    await prisma.expense.create({
      data: expense,
    });
  }

  console.log(`✅ Created ${sampleExpenses.length} sample expenses`);

  // Display some statistics
  const totalExpenses = await prisma.expense.count();
  const totalAmount = await prisma.expense.aggregate({
    _sum: {
      amount: true,
    },
  });

  const expensesByCategory = await prisma.expense.groupBy({
    by: ['category'],
    _count: {
      category: true,
    },
    _sum: {
      amount: true,
    },
  });

  console.log('\n📈 Database Statistics:');
  console.log(`Total Expenses: ${totalExpenses}`);
  console.log(`Total Amount: $${totalAmount._sum.amount?.toFixed(2) || '0.00'}`);
  console.log('\n📊 Expenses by Category:');
  
  expensesByCategory.forEach((category) => {
    console.log(
      `  ${category.category}: ${category._count.category} expenses, $${category._sum.amount?.toFixed(2) || '0.00'}`
    );
  });

  console.log('\n🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
