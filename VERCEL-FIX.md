# 🚀 Quick Fix for Vercel Deployment

## The Problem
- SQLite doesn't work on Vercel (serverless environment)
- Your expenses are empty because the database file doesn't persist

## The Solution
Switch to PostgreSQL using Supabase (free)

## Step-by-Step Fix

### 1. Set Up Supabase Database (5 minutes)
```bash
1. Go to https://supabase.com
2. Sign up and create new project
3. Copy DATABASE_URL from Settings → Database
4. URL looks like: postgresql://postgres.abc123:password@...supabase.com:6543/postgres
```

### 2. Update Local Environment
```bash
# Edit .env file and replace DATABASE_URL with your Supabase URL
DATABASE_URL="postgresql://postgres.your-ref:your-password@...supabase.com:6543/postgres"
```

### 3. Configure Vercel Environment Variables
```bash
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add: DATABASE_URL = your Supabase connection string
3. Select: Production ✅ Preview ✅ Development ✅
```

### 4. Deploy
```bash
# Run the deployment script
./deploy-with-db.sh

# Or manually:
npx prisma generate
npx prisma migrate dev --name init
git add . && git commit -m "feat: switch to PostgreSQL"
git push origin main
```

### 5. Verify
```bash
# After deployment, check your Vercel app
# You should now be able to add expenses and they will persist!

# Optional: Add sample data
npx prisma db seed
```

## Troubleshooting

**If you get database connection errors:**
- Double-check your DATABASE_URL in Vercel environment variables
- Make sure the URL includes the password
- Ensure Supabase project is running (green status)

**If migration fails:**
- Check that DATABASE_URL is correctly formatted
- Verify you can connect to Supabase from your local machine

## That's it! 
Your expense tracker will now work perfectly on Vercel! 🎉
