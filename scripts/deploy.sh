#!/bin/bash

# Enhanced deployment script for Netlify

echo "Starting deployment to Netlify..."

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if required environment variables are set
if [ -z "$MONGODB_URI" ] || [ -z "$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" ] || [ -z "$CLERK_SECRET_KEY" ]; then
    echo "Warning: Some environment variables are not set."
    echo "Please ensure MONGODB_URI, NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, and CLERK_SECRET_KEY are set."
fi

# Install dependencies
echo "Installing dependencies..."
npm ci

# Check for build errors before proceeding
echo "Validating build configuration..."
npm run build 2>&1 | tee build-output.log
BUILD_STATUS=${PIPESTATUS[0]}

if [ $BUILD_STATUS -ne 0 ]; then
    echo "Build failed. Please check the build-output.log file for details."
    echo "Aborting deployment."
    exit 1
fi

echo "Build successful!"

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Deploy to Netlify
echo "Deploying to Netlify..."
netlify deploy --prod --auth "$NETLIFY_AUTH_TOKEN" --site "$NETLIFY_SITE_ID"

if [ $? -eq 0 ]; then
    echo "Deployment successful!"
else
    echo "Deployment failed. Please check the Netlify dashboard for details."
    exit 1
fi

# Clean up temporary files
rm -f build-output.log
echo "Deployment complete!"