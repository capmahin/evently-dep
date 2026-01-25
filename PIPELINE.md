# Netlify Deployment Pipeline

This document outlines the deployment pipeline for the Evently application to Netlify.

## Overview

The deployment pipeline consists of:
1. Automated GitHub Actions workflow
2. Netlify configuration file
3. Manual deployment scripts

## Automated Deployment (Recommended)

### GitHub Actions Workflow

The workflow is located at `.github/workflows/netlify-deploy.yml` and includes:
- Node.js setup (version 18.x)
- Dependency installation with `npm ci`
- Code linting
- Build process
- Automated deployment to Netlify

### Required Secrets

Add these secrets to your GitHub repository:
- `MONGODB_URI` - MongoDB connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `CLERK_SECRET_KEY` - Clerk secret key
- `NEXT_PUBLIC_SERVER_URL` - Deployed site URL
- `UPLOADTHING_SECRET` - UploadThing secret
- `UPLOADTHING_APP_ID` - UploadThing app ID
- `STRIPE_SECRET_KEY` - Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `WEBHOOK_SECRET` - Webhook secret
- `NETLIFY_AUTH_TOKEN` - Netlify authentication token
- `NETLIFY_SITE_ID` - Netlify site ID

## Manual Deployment Options

### Option 1: Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Run the deployment script:
```bash
bash scripts/deploy.sh
```

### Option 2: Direct Netlify Deployment

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Authenticate with Netlify:
```bash
netlify login
```

3. Link your site:
```bash
netlify link
```

4. Build and deploy:
```bash
npm run build
netlify deploy --prod
```

## Netlify Configuration

The `netlify.toml` file includes:
- Build command: `npm run build`
- Publish directory: `.next`
- Node.js version: 18
- Next.js plugin for optimal performance
- SPA redirects for client-side routing
- Environment variable templates

## Environment Variables

### Required for Production:
- `MONGODB_URI` - Database connection
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Client-side authentication
- `CLERK_SECRET_KEY` - Server-side authentication
- `NEXT_PUBLIC_SERVER_URL` - Base URL for webhooks
- `UPLOADTHING_SECRET` - File upload service
- `UPLOADTHING_APP_ID` - UploadThing app identifier
- `STRIPE_SECRET_KEY` - Payment processing
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Client-side payments
- `STRIPE_WEBHOOK_SECRET` - Payment confirmation
- `WEBHOOK_SECRET` - Webhook validation

## Deployment Process

1. **Code Changes**: Push code to `main` or `master` branch
2. **CI/CD Trigger**: GitHub Actions workflow starts automatically
3. **Build**: Project builds with `npm run build`
4. **Validation**: Code is linted and tested
5. **Deploy**: Built assets deployed to Netlify
6. **Live**: Site becomes available at your Netlify domain

## Troubleshooting

### Common Issues:

1. **Build Failures**: Check environment variables and dependencies
2. **Missing Assets**: Verify static files are properly configured
3. **Database Connection**: Ensure MONGODB_URI is correct
4. **Authentication**: Confirm Clerk keys are properly set
5. **Payments**: Verify Stripe keys and webhook configuration

### Debugging:

- Check GitHub Actions logs for CI/CD issues
- Review Netlify build logs
- Validate environment variables
- Test locally before deploying

## Best Practices

- Always test locally with `npm run build`
- Use feature branches for development
- Keep environment variables secure
- Monitor deployment logs
- Set up error monitoring in production