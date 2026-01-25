# Evently - Netlify Deployment

## Overview
Evently is a Next.js application that can be deployed to Netlify. This project includes features like:
- User authentication with Clerk
- Database integration with MongoDB
- Payment processing with Stripe
- File uploads with UploadThing
- Event management system

## Deployment Checklist

### Pre-deployment
- [ ] Ensure all dependencies are listed in package.json
- [ ] Verify environment variables are properly configured
- [ ] Test the build process locally: `npm run build`
- [ ] Confirm all external services are properly configured

### Required Services
1. **MongoDB Atlas** - For database storage
2. **Clerk** - For authentication
3. **Stripe** - For payment processing
4. **UploadThing** - For file uploads

### Environment Variables Required
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

### Deployment Steps

1. **Prepare the repository**
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to Netlify Dashboard
   - Click "Add new site"
   - Select "Import an existing project"
   - Choose your Git provider and repository
   - Netlify will automatically detect Next.js settings

3. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Add environment variables in Site Settings

4. **Monitor the deployment**
   - Check build logs for any errors
   - Verify the site loads correctly
   - Test all functionality

### Post-deployment Verification
- [ ] Site loads without errors
- [ ] Database connects properly
- [ ] Authentication works (Clerk)
- [ ] File uploads work (UploadThing)
- [ ] Payment processing works (Stripe)
- [ ] All pages render correctly
- [ ] Environment variables are properly loaded

## Netlify Configuration

The project includes:
- `netlify.toml` - Netlify configuration file
- Next.js plugin for optimal performance
- Proper build settings for Next.js apps

## Troubleshooting

### Common Issues
1. **Build fails**: Check environment variables and dependencies
2. **Database connection**: Verify MONGODB_URI is correct
3. **Authentication**: Ensure Clerk keys are properly set
4. **Payment processing**: Verify Stripe keys are correct

### Debugging Tips
- Check Netlify build logs
- Verify all external service configurations
- Test locally before deploying
- Monitor application logs after deployment

## Maintenance

- Regularly update dependencies
- Monitor application performance
- Check for security vulnerabilities
- Backup environment variables and configurations