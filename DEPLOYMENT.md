# Deployment Guide

This guide covers deploying Sports.Live to production with Vercel and Supabase.

## Prerequisites

- Node.js 18+ installed
- Vercel account
- Supabase account
- GitHub repository set up

## 1. Supabase Setup

### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the database to be provisioned

### Set Up Database Schema

1. In Supabase dashboard, go to SQL Editor
2. Copy and paste the contents of `supabase/schema.sql`
3. Run the SQL script
4. Verify all tables are created in the Database tab

### Get API Keys

1. Go to Project Settings > API
2. Copy the following values:
   - Project URL (starts with `https://`)
   - `anon` public key
   - `service_role` key (keep this secret!)

## 2. Vercel Deployment

### Connect Repository

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: SvelteKit
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.svelte-kit` (auto-detected)

### Configure Environment Variables

Add the following environment variables in Vercel:

```bash
PUBLIC_SUPABASE_URL=your_supabase_project_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
PUBLIC_APP_URL=https://yourdomain.com
```

Note: In SvelteKit, environment variables prefixed with `PUBLIC_` are exposed to the client.

### Deploy

1. Click "Deploy"
2. Wait for the build to complete
3. Visit your deployment URL

## 3. Custom Domain (Optional)

1. In Vercel, go to Project Settings > Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for SSL certificate to be provisioned

## 4. Set Up Cron Jobs (Optional)

### Option A: GitHub Actions

Create `.github/workflows/fetch-games.yml`:

```yaml
name: Fetch NBA Games
on:
  schedule:
    - cron: '*/10 * * * *' # Every 10 minutes
  workflow_dispatch:

jobs:
  fetch-games:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run fetch-games
        env:
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_SERVICE_KEY: ${{ secrets.SUPABASE_SERVICE_KEY }}
```

### Option B: Cloudflare Workers

1. Create a Cloudflare Workers account
2. Set up a worker with cron trigger
3. Add fetch logic to worker script
4. Configure secrets in Workers dashboard

## 5. Enable Real-Time Updates

In Supabase dashboard:

1. Go to Database > Replication
2. Enable replication for these tables:
   - `games`
   - `game_scores`
   - `game_ratings`
3. Set up real-time listeners in your app

## 6. Configure PWA

1. Generate actual app icons (192x192 and 512x512)
2. Replace placeholder files in `public/` directory
3. Update `manifest.json` if needed
4. Test PWA installation on mobile device

## 7. Performance Optimization

### Enable Redis Caching (Optional)

1. Create Upstash Redis database
2. Add environment variables:
   ```bash
   UPSTASH_REDIS_REST_URL=your_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_redis_token
   ```

### Enable Cloudflare R2 (Optional)

For storing team logos and images:

1. Create Cloudflare R2 bucket
2. Configure CORS settings
3. Add environment variables
4. Upload team logos

## 8. Monitoring

### Vercel Analytics

1. Enable in Vercel dashboard
2. Free for hobby projects
3. View real-time metrics

### Supabase Monitoring

1. Monitor database performance in Supabase dashboard
2. Set up log drains if needed
3. Configure alerting

## 9. Security Checklist

- [ ] Environment variables properly set
- [ ] Service role key never exposed to client
- [ ] RLS policies tested and working
- [ ] CORS configured correctly
- [ ] Rate limiting enabled (if applicable)
- [ ] SSL/HTTPS working
- [ ] Input validation in place

## 10. Post-Deployment

1. Test all features:
   - Date picker navigation
   - Spoiler protection
   - Game ratings
   - Mobile responsiveness
2. Test PWA installation
3. Check performance (Lighthouse)
4. Monitor error logs
5. Set up alerts for downtime

## Troubleshooting

### Build Fails

- Check Node.js version (18+)
- Verify all dependencies installed
- Check for TypeScript errors
- Review build logs in Vercel

### Database Connection Issues

- Verify Supabase URL is correct
- Check API keys are properly set
- Ensure RLS policies allow access
- Check network connectivity

### Real-Time Not Working

- Verify replication is enabled
- Check WebSocket connection
- Review browser console for errors
- Ensure proper authentication

## Updating

To deploy updates:

1. Push changes to your GitHub repository
2. Vercel automatically deploys from `main` branch
3. Preview deployments created for pull requests
4. Promote preview to production if needed

## Rollback

If something goes wrong:

1. Go to Vercel dashboard
2. Navigate to Deployments
3. Find previous working deployment
4. Click "Promote to Production"

## Support

- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- SvelteKit Docs: https://kit.svelte.dev/docs
