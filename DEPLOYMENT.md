# BaseBounties Deployment Guide

This guide covers how to deploy the BaseBounties Base Mini App to Vercel using the automated CI/CD pipeline.

## 🚀 Automated Deployment

The project includes a GitHub Actions workflow that automatically deploys to Vercel on every push to the main branch and creates preview deployments for pull requests.

### Prerequisites

Before the automated deployment can work, you need to set up the following secrets in your GitHub repository:

#### Required GitHub Secrets

1. **VERCEL_TOKEN**: Your Vercel authentication token
   - Go to [Vercel Dashboard](https://vercel.com/account/tokens)
   - Create a new token with appropriate permissions
   - Add it as a repository secret

2. **VERCEL_ORG_ID**: Your Vercel organization ID
   - Found in your Vercel team settings
   - Or run `vercel link` locally to get the ID

3. **VERCEL_PROJECT_ID**: Your Vercel project ID
   - Found in your project settings on Vercel
   - Or run `vercel link` locally to get the ID

4. **NEXT_PUBLIC_ONCHAINKIT_API_KEY**: Your OnchainKit API key
   - Get from [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)
   - Required for Base blockchain functionality

### Setting up GitHub Secrets

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add each of the required secrets listed above

## 🔧 Manual Deployment

If you prefer to deploy manually or need to troubleshoot:

### 1. Install Vercel CLI

```bash
npm install -g vercel@latest
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Link your project

```bash
vercel link
```

### 4. Set environment variables

```bash
vercel env add NEXT_PUBLIC_ONCHAINKIT_API_KEY
```

### 5. Deploy

For preview deployment:
```bash
vercel
```

For production deployment:
```bash
vercel --prod
```

## 🌐 Environment Variables

The following environment variables are required for the application to function properly:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_ONCHAINKIT_API_KEY` | OnchainKit API key for Base blockchain integration | Yes |

### Setting Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the required variables for all environments (Production, Preview, Development)

## 📋 Deployment Workflow

### Automatic Deployments

1. **Pull Request Deployments**:
   - Every PR automatically gets a preview deployment
   - The workflow runs tests and builds the application
   - A comment is added to the PR with the preview URL

2. **Production Deployments**:
   - Triggered on pushes to the `main` branch
   - Runs full test suite before deployment
   - Deploys to production domain

### Workflow Steps

1. **Build and Test**:
   - Checkout code
   - Setup Node.js 18
   - Install dependencies with `npm ci`
   - Run linting with `npm run lint`
   - Build application with `npm run build`

2. **Deploy Preview** (for PRs):
   - Install Vercel CLI
   - Pull Vercel environment configuration
   - Build project artifacts
   - Deploy to preview URL
   - Comment on PR with deployment URL

3. **Deploy Production** (for main branch):
   - Install Vercel CLI
   - Pull production environment configuration
   - Build project artifacts for production
   - Deploy to production URL
   - Update deployment status

## 🔍 Monitoring and Troubleshooting

### Checking Deployment Status

1. **GitHub Actions**: Check the Actions tab in your repository for workflow status
2. **Vercel Dashboard**: Monitor deployments in your Vercel project dashboard
3. **Vercel CLI**: Use `vercel ls` to list recent deployments

### Common Issues

1. **Build Failures**:
   - Check that all dependencies are properly installed
   - Ensure environment variables are set correctly
   - Verify that the build passes locally with `npm run build`

2. **Environment Variable Issues**:
   - Ensure `NEXT_PUBLIC_ONCHAINKIT_API_KEY` is set in Vercel
   - Check that the API key is valid and has proper permissions

3. **Deployment Failures**:
   - Verify Vercel tokens and IDs are correct
   - Check Vercel project settings and permissions
   - Review Vercel function logs for runtime errors

### Logs and Debugging

- **GitHub Actions Logs**: Available in the Actions tab of your repository
- **Vercel Function Logs**: Available in the Vercel dashboard under Functions
- **Build Logs**: Available in the Vercel dashboard under Deployments

## 🎯 Performance Optimization

The deployment is optimized for:

- **Fast Builds**: Using npm cache and optimized Docker layers
- **Edge Functions**: Leveraging Vercel's edge network
- **Static Generation**: Pre-rendering pages where possible
- **Security Headers**: Proper security headers configured in `vercel.json`

## 📱 Base Mini App Considerations

This deployment is specifically configured for Base Mini Apps:

- **OnchainKit Integration**: Properly configured for Base network
- **MiniKit Provider**: Set up for Farcaster frame interactions
- **Security Headers**: Configured for frame embedding
- **CORS Settings**: Properly configured for cross-origin requests

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [OnchainKit Documentation](https://onchainkit.xyz/)
- [Base Network Documentation](https://docs.base.org/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 🆘 Support

If you encounter issues with deployment:

1. Check the GitHub Actions logs for detailed error messages
2. Review the Vercel deployment logs
3. Ensure all environment variables are properly configured
4. Verify that the application builds successfully locally

For Base Mini App specific issues, refer to the [Base documentation](https://docs.base.org/base-app/) and [OnchainKit guides](https://onchainkit.xyz/guides).
