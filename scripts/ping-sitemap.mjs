#!/usr/bin/env node

const BASE_URL = 'https://danielkliewer.com';
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;

async function pingIndexNow() {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    console.log('[ping-sitemap] INDEXNOW_KEY not set — skipping IndexNow ping');
    console.log('[ping-sitemap] To enable: generate a key at https://www.indexnow.org and set it in your Vercel env vars');
    return;
  }

  const urls = [
    BASE_URL,
    `${BASE_URL}/research`,
    `${BASE_URL}/about`,
    `${BASE_URL}/projects`,
  ];

  try {
    const res = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: 'danielkliewer.com',
        key,
        keyLocation: `${BASE_URL}/indexnow-${key}.txt`,
        urlList: urls,
      }),
    });
    if (res.status === 200 || res.status === 202) {
      console.log(`[ping-sitemap] IndexNow ping sent (${res.status})`);
    } else {
      console.warn(`[ping-sitemap] IndexNow returned ${res.status}`);
    }
  } catch (err) {
    console.warn(`[ping-sitemap] IndexNow failed:`, err.message);
  }
}

async function main() {
  console.log(`[ping-sitemap] Sitemap: ${SITEMAP_URL}`);
  await pingIndexNow();
  console.log('[ping-sitemap] Done.');
}

main();
