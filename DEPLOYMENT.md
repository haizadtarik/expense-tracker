# Deployment Guide

## Vercel Deployment

This project is configured for easy deployment to Vercel. Follow these steps:

### Prerequisites
- GitHub repository with your code
- Vercel account

### Deployment Steps

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "feat: ready for Vercel deployment"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Connect your GitHub repository
   - Vercel will automatically detect Next.js and use the configuration

### Environment Variables

For production, you'll need to configure a production database. Add these environment variables in your Vercel dashboard:

```bash
DATABASE_URL="your-production-database-url"
```

### Recommended Production Databases

Since SQLite doesn't work well in serverless environments, consider these options:

1. **PlanetScale** (MySQL-compatible, serverless)
   ```bash
   DATABASE_URL="mysql://username:password@host/database?sslaccept=strict"
   ```

2. **Supabase** (PostgreSQL-compatible)
   ```bash
   DATABASE_URL="postgresql://username:password@host:port/database"
   ```

3. **Railway** (PostgreSQL/MySQL)
   ```bash
   DATABASE_URL="postgresql://username:password@host:port/database"
   ```

4. **Neon** (PostgreSQL-compatible, serverless)
   ```bash
   DATABASE_URL="postgresql://username:password@host/database"
   ```

### Database Migration for Production

When using a production database, you'll need to run migrations:

1. Set up your production database
2. Update `DATABASE_URL` in Vercel environment variables
3. The deployment will automatically run `prisma generate`
4. You may need to manually run migrations for the first deployment:
   ```bash
   npx prisma migrate deploy
   ```

### Build Configuration

The project includes the following Vercel-optimized configuration:

- **package.json**: Updated build script with `prisma generate`
- **vercel.json**: Custom build configuration for API routes
- **prisma/schema.prisma**: Binary targets for Vercel compatibility

### Troubleshooting

If you encounter issues:

1. **Prisma Client Error**: Make sure `DATABASE_URL` is set in Vercel environment variables
2. **Build Timeouts**: Check API route configurations in `vercel.json`
3. **Database Connection**: Ensure your production database allows connections from Vercel IPs

### Local Development vs Production

- **Local**: Uses SQLite database (`dev.db`)
- **Production**: Should use a cloud database (PostgreSQL/MySQL recommended)

The application automatically adapts based on the `DATABASE_URL` environment variable.
