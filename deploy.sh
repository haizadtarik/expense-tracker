#!/bin/bash
# Deploy script for Vercel with database migration

echo "🚀 Deploying Expense Tracker to Vercel..."

# Step 1: Generate Prisma Client
echo "📦 Generating Prisma Client..."
npx prisma generate

# Step 2: Commit changes
echo "📝 Committing changes..."
git add .
git commit -m "feat: migrate to PostgreSQL for Vercel deployment"

# Step 3: Push to GitHub
echo "⬆️ Pushing to GitHub..."
git push origin main

echo "✅ Code pushed to GitHub!"
echo ""
echo "🔧 NEXT STEPS:"
echo "1. Set up Supabase database at https://supabase.com"
echo "2. Copy your DATABASE_URL from Supabase"
echo "3. Add DATABASE_URL to Vercel environment variables"
echo "4. Your Vercel deployment will automatically trigger"
echo "5. Run database migration (see instructions below)"
echo ""
echo "📋 After Vercel deployment, run this command to set up your database:"
echo "   npx prisma migrate deploy"
echo ""
echo "🌱 To seed your production database with sample data:"
echo "   npx prisma db seed"
