// This script generates a _redirects file for Netlify-style redirects
// Legacy format: /2024/11/04/deep-fake
// New format: /blog/2024-11-04-deep-fake

# Legacy blog URL redirects
# Old format: /2024/11/04/deep-fake
# New format: /blog/2024-11-04-deep-fake

/2024/: /blog/:splat
/2024/*: /blog/:splat

/20[0-9][0-9]/[0-9][0-9]/[0-9][0-9]/*: /blog/:splat

# Single legacy URL examples (can be uncommented if needed)
# /2024/11/04/deep-fake /blog/2024-11-04-deep-fake 301
# /2024/11/27/something /blog/2024-11-27-something 301

# All existing blog posts are available at /blog/[slug] format
# These redirects handle the legacy YYYY/MM/DD/slug format
