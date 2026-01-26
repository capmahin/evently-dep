# Netlify Deployment Fixes

This document explains and fixes common issues with deploying Next.js applications to Netlify.

## Common Deployment Issues & Solutions

### Issue 1: Node.js Version
**Problem**: Platforms like Vercel now require newer Node.js versions (24.x)
**Solution**: Update your deployment platform settings to use Node.js 24.x

### Issue 2: Static Redirects for Dynamic Routes
**Problem**: Using `[[redirects]]` with Next.js apps causes routing issues for dynamic routes.
**Solution**: Remove static redirects as Next.js handles client-side routing internally.

### Issue 2: Server-Side Rendering (SSR) Compatibility
**Problem**: Next.js apps with dynamic routes may not render properly on Netlify.
**Solution**: Use the official Netlify Next.js plugin for proper SSR support.

### Issue 3: Image Optimization
**Problem**: External images may not load properly in production.
**Solution**: Properly configure `remotePatterns` in `next.config.mjs`.

### Issue 4: Environment Variables
**Problem**: Missing or incorrect environment variables cause runtime errors.
**Solution**: Ensure all required environment variables are set in Netlify dashboard.

## Fixed Configuration

### 1. Netlify Configuration (netlify.toml)
```toml
[build]
  command = "npm run build"
  publish = ".next"
  environment = { NODE_VERSION = "24" }

[[plugins]]
  package = "@netlify/plugin-nextjs"

[template.environment]
  MONGODB_URI = "Your MongoDB connection string"
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = "Your Clerk publishable key"
  CLERK_SECRET_KEY = "Your Clerk secret key"
  NEXT_PUBLIC_SERVER_URL = "https://your-site-name.netlify.app"
  UPLOADTHING_SECRET = "Your UploadThing secret"
  UPLOADTHING_APP_ID = "Your UploadThing app ID"
  WEBHOOK_SECRET = "Your webhook secret"
```

### 2. Next.js Configuration (next.config.mjs)
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
    trailingSlash: 'ignore'
};

export default nextConfig;
```

## Required Environment Variables

### Database
- `MONGODB_URI`: Your MongoDB Atlas connection string

### Authentication (Clerk)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Public key for frontend
- `CLERK_SECRET_KEY`: Secret key for backend

### File Uploads (UploadThing)
- `UPLOADTHING_SECRET`: Secret key for file uploads
- `UPLOADTHING_APP_ID`: App ID for UploadThing

### Webhooks
- `WEBHOOK_SECRET`: For webhook validation
- `NEXT_PUBLIC_SERVER_URL`: Your deployed site URL

## Deployment Steps

### 1. Prepare Your Repository
```bash
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

### 2. Connect to Netlify
1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Choose your Git provider and repository
4. Netlify will detect the Next.js configuration

### 3. Configure Build Settings
- Build command: `npm run build`
- Publish directory: `.next`
- Node.js version: 18 (already configured in netlify.toml)

### 4. Add Environment Variables
In Netlify Dashboard:
- Site Settings → Build & Deploy → Environment
- Add all required environment variables

### 5. Deploy
Click "Deploy site" and monitor the build logs.

## Verification Steps

After deployment, verify:

1. **Homepage loads** without errors
2. **Dynamic routes** work (e.g., `/events/[id]`)
3. **Authentication** works (sign in/sign up)
4. **Database operations** work (create/update events)
5. **File uploads** work (image uploads)
6. **Webhooks** are accessible (for Clerk)

## Troubleshooting

### Build Fails
- Check environment variables in Netlify dashboard
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



## Best Practices

1. **Test locally first**: Run `npm run build` and `npm start` to test locally
2. **Monitor build logs**: Check Netlify build logs for errors
3. **Environment isolation**: Use different environment variables for staging/prod
4. **Version control**: Keep deployment configurations in version control
5. **Backup configurations**: Save your environment variables and settings

## Rollback Plan

If deployment fails:
1. Check the Netlify build logs for specific errors
2. Revert recent changes if necessary
3. Test the build process locally: `npm run build`
4. Verify all environment variables are correctly set