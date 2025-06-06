# Expense Tracker

A modern, full-stack expense tracking application built with Next.js 15, TypeScript, Prisma, and Tailwind CSS.

## Features

- ✅ **Complete CRUD Operations** - Create, read, update, and delete expenses
- ✅ **Advanced Filtering** - Filter by category, date range, and search terms
- ✅ **Real-time Statistics** - View spending analytics and category breakdowns
- ✅ **Responsive Design** - Works seamlessly on desktop and mobile
- ✅ **Type Safety** - Full TypeScript implementation with Prisma
- ✅ **Modern UI** - Beautiful interface built with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Database**: Prisma ORM with SQLite (dev) / PostgreSQL (prod)
- **Styling**: Tailwind CSS v3
- **UI Components**: Custom React components
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd expense-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production (includes Prisma generation)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:generate` - Generate Prisma client

## Deployment

This project is optimized for Vercel deployment with PostgreSQL database. 

### Important: Database Requirements

- **Local Development**: Uses PostgreSQL (recommended) or SQLite
- **Production**: **Must use PostgreSQL** (SQLite doesn't work on Vercel)

### Quick Deploy to Vercel

1. **Set up Supabase Database** (Free):
   - Go to [supabase.com](https://supabase.com) and create a project
   - Copy your `DATABASE_URL` from Settings → Database

2. **Deploy to Vercel**:
   ```bash
   npm run deploy
   ```

3. **Configure Vercel Environment Variables**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `DATABASE_URL` = your Supabase connection string

4. **Initialize Production Database**:
   ```bash
   # After deployment, run these commands:
   npx prisma migrate deploy    # Set up database schema
   npx prisma db seed          # Add sample data (optional)
   ```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Project Structure

```
expense-tracker/
├── src/
│   ├── app/                 # Next.js App Router pages and API routes
│   ├── components/          # React components
│   ├── lib/                 # Utility functions
│   └── types/               # TypeScript definitions
├── prisma/
│   ├── schema.prisma        # Database schema
│   ├── migrations/          # Database migrations
│   └── seed.ts             # Database seeding
└── public/                  # Static assets
```

## Environment Variables

Create a `.env` file in the root directory:

```bash
DATABASE_URL="file:./dev.db"
```

For production, replace with your production database URL.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.
