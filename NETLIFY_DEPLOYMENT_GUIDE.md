# Deploying Evently to Netlify

This guide will walk you through deploying your Next.js application to Netlify.

## Prerequisites

1. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)
2. **GitHub/Git Repository**: Your code should be in a Git repository
3. **Environment Variables**: You'll need the following environment variables for your application to work properly:

### Required Environment Variables

Add these to your Netlify site settings (Site Settings > Build & Deploy > Environment):

```bash
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_SERVER_URL=https://your-site-name.netlify.app
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
WEBHOOK_SECRET=your_webhook_secret
```

## Deployment Methods

### Method 1: Git Integration (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Netlify](https://app.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Connect to your Git provider
5. Select your repository
6. Netlify will automatically detect the Next.js build settings
7. Add the environment variables in the deploy settings
8. Click "Deploy site"

### Method 2: Deploy from Local Files

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build your application locally:
```bash
npm run build
```

3. Deploy using Netlify CLI:
```bash
netlify deploy --prod
```

## Configuration Details

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = ".next"
  environment = { NODE_VERSION = "18" }

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

This configuration tells Netlify:
- To run `npm run build` as the build command
- To serve files from the `.next` directory (Next.js output)
- To use Node.js version 18
- To use the official Next.js plugin for optimal performance

## Post-Deployment Steps

### 1. Configure Domain
- In Netlify dashboard, go to Domain Settings
- Add your custom domain if needed

### 2. SSL Certificate
- Netlify provides free SSL certificates
- Enable HTTPS for your custom domain

### 3. Environment Variables Setup
Go to your Netlify dashboard:
- Site Settings → Build & Deploy → Environment
- Add all the required environment variables

### 4. Webhooks Configuration
If using Stripe and Clerk webhooks:
- Update webhook URLs to point to your deployed site
- Stripe webhook: `https://your-site-name.netlify.app/api/webhook/stripe`
- Clerk webhook: `https://your-site-name.netlify.app/api/webhook/clerk`

## Troubleshooting

### Common Issues:

1. **Build Errors**: Make sure all dependencies are in package.json
2. **Environment Variables Missing**: Ensure all required env vars are set in Netlify
3. **Database Connection**: Verify your MongoDB URI is correct and accessible
4. **Static Assets**: Images and static files should be served correctly from the public folder

### Debugging:
- Check Netlify build logs for errors
- Verify all external services (MongoDB, Clerk, Stripe, UploadThing) are configured correctly
- Test the deployed application thoroughly

## Performance Optimization

- Leverage Next.js automatic static optimization
- Use Next.js Image optimization
- Implement proper caching headers
- Optimize for Core Web Vitals

## Maintenance

- Monitor build logs for any issues
- Keep dependencies updated
- Monitor site performance
- Set up alerts for downtime if needed