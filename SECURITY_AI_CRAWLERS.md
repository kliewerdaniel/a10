# AI Crawler Access — WAF / CDN Configuration Checklist

Goal: ensure recognized AI answer/training engines (GPTBot, ChatGPT-User,
ClaudeBot, PerplexityBot, Google-Extended) can fetch `danielkliewer.com`
**without** being challenged by CAPTCHA, Turnstile, bot defense, or rate
limiting, while everything else stays protected.

The site already emits `robots.txt` and a full-text `feed.xml` (see
`src/app/robots.ts` + `scripts/generate-feed.mjs`). These are the
**edge/CDN** changes needed to back that up.

---

## 0. Confirm the site is "bot-safe" by construction
- ✅ Static export (`output: "export"`) — no server-side personalization,
  no login walls, no region locking on content.
- ✅ Each `/blog/[slug]` now inlines a `<noscript>` full-text mirror, so
  no-JS crawlers get the complete article in raw HTML.
- ✅ `feed.xml` / `rss.xml` carry the FULL post body in `<content:encoded>`.

## 1. Allow-list AI crawler user-agents (most important)
Match on the **verified** UA substrings. Order matters — put allows before
any blanket "challenge all bots" rule.

| Bot | User-Agent token | Use |
|-----|------------------|-----|
| OpenAI GPTBot | `GPTBot` | Training crawl |
| OpenAI ChatGPT | `ChatGPT-User` | User-linked browsing |
| Anthropic | `ClaudeBot` | Training + API fetch |
| Perplexity | `PerplexityBot` | Answer engine |
| Google AI | `Google-Extended` | Gemini/Bard training |

**Cloudflare / Bot Fight Mode:** add these to the *Allow* list in
"Firewall → Tools" or a WAF rule:
`(http.user_agent contains "GPTBot") or (http.user_agent contains "ChatGPT-User") or (http.user_agent contains "ClaudeBot") or (http.user_agent contains "PerplexityBot") or (http.user_agent contains "Google-Extended")`
→ **Skip** "Bot Fight Mode", "Super Bot Fight Mode", JS Challenge, and
Managed Challenge for this expression.

**AWS CloudFront / WAF:** create a StringMatch rule on `Header: User-Agent`
(`CONTAINS` one of the tokens above) → **Allow** (priority above any
rate-based/block rule). For CloudFront Functions, `request.headers['user-agent'].value`.

## 2. Disable challenges on crawler paths
For the allow-listed bots, **do not** apply:
- Turnstile / Managed Challenge
- JS Challenge
- "Under Attack" mode
- Bot Management "Likely Automated" scoring blocks

Keep WAF / rate-limit rules for *unrecognized* agents intact.

## 3. Verify UA authenticity (optional but recommended)
Public bot UAs are spoofable. For high-confidence verification, resolve the
requesting IP and check reverse DNS / published IP ranges:
- OpenAI: `GPTBot` reverse-resolves to `*.crawl.openai.com`
- Anthropic: `ClaudeBot` → `*.anthropic.com` / `*.claude.ai`
- Perplexity: `PerplexityBot` → `*.perplexity.ai`
- Google: `Google-Extended` shares Google's published `googlebot` ranges

Cloudflare "Bot Management" already does ASN/rdns validation; pair the UA
allow-list with "Verified Bot" handling rather than raw UA string matching
alone when available.

## 4. Cache + performance for crawlers
- Ensure `/feed.xml`, `/sitemap.xml`, `/robots.txt` are **edge-cached** and
  served with `Cache-Control: public, max-age=3600`.
- Do not set `no-store` on article HTML — crawlers re-fetch on lastmod.
- Keep gzip/brotli on (feed.xml is ~6 MB uncompressed; ~200 KB compressed).

## 5. Don't break the crawler channel
- `robots.txt` already `Allow: /` for these agents — **never** add a
  `Disallow` for article paths or `/feed.xml`.
- If you add a WAF challenge on a path, add a matching allow exception for
  the bot UAs in §1.
- After any WAF change, re-run the verification below.

---

## Verification (run after deploy)
```bash
# 1. robots.txt shows explicit AI allows
curl -s https://www.danielkliewer.com/robots.txt | grep -iE "GPTBot|ClaudeBot|PerplexityBot|Google-Extended"

# 2. feed.xml is reachable and well-formed, with full text
curl -s https://www.danielkliewer.com/feed.xml | head -c 200
curl -s https://www.danielkliewer.com/feed.xml | grep -c "content:encoded"

# 3. a post's plain-text mirror is reachable as real static text
curl -s https://www.danielkliewer.com/blog-txt/<slug>.txt | head -c 200

# 4. simulate an AI bot UA — should NOT get a challenge page
curl -s -A "ClaudeBot/1.0" -o /dev/null -w "%{http_code}\n" https://www.danielkliewer.com/feed.xml
# expect 200, not 403/503/CAPTCHA html
```
