# Setting Up Cloudflare DNS for GitHub Pages

This guide will help you properly configure your Cloudflare DNS settings to work with GitHub Pages.

## Prerequisites

1. A domain purchased through Cloudflare
2. A GitHub repository with GitHub Pages enabled
3. The CNAME file in your repository (already set up with `latestonlinetools.com`)

## Step 1: Configure GitHub Pages Settings

1. Go to your GitHub repository
2. Navigate to Settings > Pages
3. Under "Build and deployment", ensure the source is set to "GitHub Actions"
4. Under "Custom domain", enter your domain name (`latestonlinetools.com`)
5. Check the "Enforce HTTPS" option (this may take some time to become available)

## Step 2: Configure Cloudflare DNS Settings

1. Log in to your Cloudflare account
2. Select your domain (`latestonlinetools.com`)
3. Go to the DNS tab

### Option A: Using A Records (Recommended)

Add the following A records pointing to GitHub Pages' IP addresses:

| Type | Name | Content | TTL | Proxy status |
|------|------|---------|-----|-------------|
| A | @ | 185.199.108.153 | Auto | Proxied |
| A | @ | 185.199.109.153 | Auto | Proxied |
| A | @ | 185.199.110.153 | Auto | Proxied |
| A | @ | 185.199.111.153 | Auto | Proxied |

### Option B: Using a CNAME Record

If you prefer using a CNAME record:

| Type | Name | Content | TTL | Proxy status |
|------|------|---------|-----|-------------|
| CNAME | @ | yourusername.github.io | Auto | Proxied |

Replace `yourusername` with your actual GitHub username.

## Step 3: Configure Cloudflare SSL/TLS Settings

1. Go to the SSL/TLS tab in your Cloudflare dashboard
2. Set the SSL/TLS encryption mode to "Full" or "Full (strict)"
3. Under Edge Certificates, ensure "Always Use HTTPS" is enabled

## Step 4: Configure Page Rules (Optional)

For optimal performance, you can set up a page rule:

1. Go to the Page Rules tab
2. Create a new rule with the pattern `latestonlinetools.com/*`
3. Add the setting "Cache Level: Cache Everything"

## Step 5: Clear Cloudflare Cache

After making these changes:

1. Go to the Caching tab
2. Click "Purge Cache" and select "Purge Everything"

## Troubleshooting

If you see the "Failed to load data - Content unavailable. Resource was not cached" error:

1. Check that your DNS settings are correct
2. Ensure your CNAME file contains only your domain name (`latestonlinetools.com`)
3. Verify that the GitHub Pages workflow is completing successfully
4. Try clearing your browser cache and Cloudflare cache
5. Wait for DNS propagation (can take up to 24-48 hours)
6. Check if your site is accessible via `https://yourusername.github.io/repository-name/`

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Cloudflare DNS Documentation](https://developers.cloudflare.com/dns/)
- [Troubleshooting Custom Domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages)
