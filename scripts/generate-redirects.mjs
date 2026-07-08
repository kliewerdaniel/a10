#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const contentDirectory = path.join(__dirname, '..', 'content', 'blog');
const outDirectory = path.join(__dirname, '..', 'public');
const redirectsPath = path.join(outDirectory, '_redirects');

function generateRedirects() {
  const redirects = [
    '# Legacy blog URL redirects',
    '# Old format: /2024/11/04/deep-fake',
    '# New format: /blog/2024-11-04-deep-fake',
    '/2024/: /blog/:splat',
    '/2024/*: /blog/:splat',
    '/20[0-9][0-9]/[0-9][0-9]/[0-9][0-9]/*: /blog/:splat',
    ''
  ];
  
  try {
    const files = fs.readdirSync(contentDirectory).filter((f: string) => f.endsWith('.md') || f.endsWith('.mdx'));
    
    files.forEach((filename: string) => {
      const slug = filename.replace(/\.(md|mdx)$/, '');
      const dateMatch = slug.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)/);
      
      if (dateMatch) {
        const year = dateMatch[1];
        const month = dateMatch[2];
        const day = dateMatch[3];
        const postSlug = dateMatch[4];
        
        const legacyPath = `/${year}/${month}/${day}/${postSlug}`;
        const newPath = `/blog/${slug}`;
        
        redirects.unshift(`${legacyPath}: ${newPath}: 301`);
      }
    });
    
    fs.writeFileSync(redirectsPath, redirects.join('\n'));
    console.log(`[${new Date().toISOString()}] Generated redirects file with ${redirects.length - 4} legacy URL mappings`);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error generating redirects:`, error);
  }
}

if (require.main === module) {
  generateRedirects();
}

module.exports = { generateRedirects };
