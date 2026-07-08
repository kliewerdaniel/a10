#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const contentDirectory = path.join(__dirname, 'content', 'blog');
const outDirectory = path.join(__dirname, 'out', 'blog');

async function checkLegacyURLs() {
  try {
    const files = fs.readdirSync(contentDirectory).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
    let legacyURLsFound = 0;
    let redirectsAdded = 0;
    
    for (const filename of files) {
      const slug = filename.replace(/\.(md|mdx)$/, '');
      const dateMatch = slug.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)/);
      
      if (dateMatch) {
        const year = dateMatch[1];
        const month = dateMatch[2];
        const day = dateMatch[3];
        const postSlug = dateMatch[4];
        
        const legacyPath = `/${year}/${month}/${day}/${postSlug}`;
        const newPath = `/blog/${slug}`;
        
        const legacyFilePath = path.join(outDirectory, year, month, day, postSlug);
        const legacyExists = fs.existsSync(`${legacyFilePath}.html`) || fs.existsSync(`${legacyFilePath}.txt`);
        
        if (legacyExists) {
          legacyURLsFound++;
          console.log(`✓ Legacy URL found: ${legacyPath} -> ${newPath}`);
        }
      }
    }
    
    if (legacyURLsFound > 0) {
      console.log(`\nFound ${legacyURLsFound} legacy URL paths that need redirects.

You can add redirects to next.config.ts to handle these legacy URLs.
The typical redirect pattern for static exports is:

  redirects: async () => [
    { source: '/:year/:month/:day/:slug', destination: '/blog/:year-:month-:day-:slug', permanent: true }
  ]

Or more generally:

  { source: '/:year/:month/:day/:slug', destination: '/blog/:splat', permanent: true }

This will automatically redirect all legacy YYYY/MM/DD/slug URLs to the new blog/ slug format.
`);
    } else {
      console.log('No legacy URL patterns found in the exported files.');
    }
  } catch (error) {
    console.error('Error checking legacy URLs:', error);
  }
}

if (require.main === module) {
  checkLegacyURLs();
}

module.exports = { checkLegacyURLs };