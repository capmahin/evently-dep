# Vercel Deployment Guide

This document explains how to properly deploy the Evently application to Vercel.

## Common Vercel Deployment Issues & Solutions

### Issue 1: Next.js Configuration
**Problem**: Vercel has specific requirements for Next.js configuration
**Solution**: Ensure proper Next.js configuration without conflicting settings

### Issue 2: Environment Variables
**Problem**: Missing or incorrect environment variables cause runtime errors
**Solution**: Properly configure all required environment variables in Vercel dashboard

### Issue 3: Build Command
**Problem**: Incorrect build command can cause deployment failures
**Solution**: Use the standard Next.js build command

## Required Environment Variables

### Database
- `MONGODB_URI`: Your MongoDB Atlas connection string

### Authentication (Clerk)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Public key for frontend
- `CLERK_SECRET_KEY`: Secret key for backend

### File Uploads (UploadThing)
- `UPLOADTHING_SECRET`: Secret key for file uploads
- `UPLOADTHING_APP_ID`: App ID for UploadThing

### Payments (Stripe)
- `STRIPE_SECRET_KEY`: Secret key for payment processing
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Public key for frontend
- `STRIPE_WEBHOOK_SECRET`: Secret for webhook validation

### Webhooks
- `WEBHOOK_SECRET`: For webhook validation
- `NEXT_PUBLIC_SERVER_URL`: Your deployed site URL (e.g., https://your-app.vercel.app)

## Vercel Configuration (vercel.json)

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next",
      "config": {
        "zeroConfig": true
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ]
}
```

## Next.js Configuration (next.config.mjs)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['utfs.io', 'img.clerk.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'utfs.io',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'img.clerk.com',
                port: ''
            }
        ]
    },
    // Vercel handles routing automatically
    trailingSlash: 'ignore'
};

export default nextConfig;
```

## Deployment Steps

### 1. Prepare Your Repository
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/)
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will automatically detect it's a Next.js project

### 3. Configure Project Settings
- Framework preset: Next.js (should be detected automatically)
- Build command: `npm run build` (default)
- Output directory: `.next` (default)
- Install command: `npm install` (default)

### 4. Add Environment Variables
In Vercel Dashboard:
- Go to your project
- Settings → Environment Variables
- Add all required environment variables

### 5. Deploy
Click "Deploy" and monitor the build logs.

## Verification Steps

After deployment, verify:

1. **Homepage loads** without errors
2. **Dynamic routes** work (e.g., `/events/[id]`)
3. **Authentication** works (sign in/sign up)
4. **Database operations** work (create/update events)
5. **File uploads** work (image uploads)
6. **Payments** work (checkout process)
7. **Webhooks** are accessible (for Stripe/Clerk)

## Troubleshooting

### Build Fails
- Check environment variables in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify next.config.mjs is properly formatted

### Images Not Loading
- Check `remotePatterns` in next.config.mjs
- Ensure domain names are correct

### Authentication Issues
- Verify Clerk keys are correct
- Check that NEXT_PUBLIC_ keys start with NEXT_PUBLIC_

### Database Connection Issues
- Verify MONGODB_URI is correct
- Ensure database is accessible from the internet
- Check database connection limits

### Payment Processing Issues
- Verify Stripe keys are correct
- Ensure webhook URLs are updated for the deployed site

## Best Practices

1. **Test locally first**: Run `npm run build` and `npm start` to test locally
2. **Monitor build logs**: Check Vercel build logs for errors
3. **Environment isolation**: Use different environment variables for staging/prod
4. **Version control**: Keep deployment configurations in version control
5. **Preview deployments**: Use feature branches for testing

## Common Vercel-Specific Issues

### 1. Server-Side Timeout Issues
- Vercel serverless functions have a timeout limit (10s for hobby, 60s for pro/business)
- Consider using ISR (Incremental Static Regeneration) for long-running operations

### 2. File Size Limits
- Individual files should be less than 50MB
- Total lambda size should be less than 50MB

### 3. Environment Variable Access
- Server-side: All environment variables are available
- Client-side: Only NEXT_PUBLIC_ variables are available

## Rollback Plan

If deployment fails:
1. Check the Vercel build logs for specific errors
2. Revert recent changes if necessary
3. Test the build process locally: `npm run build`
4. Verify all environment variables are correctly set