import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  output: "export",
  trailingSlash: false,
  redirects: async () => {
    const redirectResponse: any[] = [];
    
    const contentDirectory = '/Users/danielkliewer/a10/sovereign-ai-site/content/blog';
    
    try {
      const fs = require('fs');
      const files = fs.readdirSync(contentDirectory).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
      
      files.forEach(filename => {
        const slug = filename.replace(/\.(md|mdx)$/, '');
        const dateMatch = slug.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)/);
        
        if (dateMatch) {
          const year = dateMatch[1];
          const month = dateMatch[2];
          const day = dateMatch[3];
          const postSlug = dateMatch[4];
          
          const legacyPath = `/${year}/${month}/${day}/${postSlug}`;
          const newPath = `/blog/${slug}`;
          
          redirectResponse.push({
            source: legacyPath,
            destination: newPath,
            permanent: true,
          });
        }
      });
    } catch (error) {
    }
    
    return redirectResponse;
  },
};

export default nextConfig;
