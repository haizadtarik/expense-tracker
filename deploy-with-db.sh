#!/bin/bash

echo "🚀 Deploying Expense Tracker to Vercel..."
echo ""
echo "⚠️  BEFORE RUNNING THIS SCRIPT:"
echo "1. ✅ Set up Supabase database at https://supabase.com"
echo "2. ✅ Update .env file with your actual DATABASE_URL"
echo "3. ✅ Add DATABASE_URL to Vercel environment variables"
echo ""

read -p "Have you completed the steps above? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Please complete the setup steps first!"
    exit 1
fi

echo "📦 Generating Prisma Client..."
npx prisma generate

echo "🔄 Creating database migration..."
npx prisma migrate dev --name init

echo "📝 Committing changes..."
git add .
git commit -m "feat: migrate to PostgreSQL for Vercel deployment"

echo "⬆️ Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Deployment initiated!"
echo ""
echo "🔧 NEXT STEPS:"
echo "1. Go to Vercel dashboard and wait for deployment to complete"
echo "2. Once deployed, your app should work with the new database!"
echo ""
echo "🌱 Optional: Seed your database with sample data:"
echo "   npx prisma db seed"
