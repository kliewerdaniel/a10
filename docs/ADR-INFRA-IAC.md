# ADR: GCP Infrastructure & IaC (P8)

> Status: DESIGN (uncommitted). Ratified D2 (GCP now), D4 (local + CI deploy).
> Target: Cloud Storage + CDN (static) + Cloud Run (gateway stub) + Terraform IaC.

## 1. Topology
```
Internet
   │
Google Cloud CDN (LB + CDN) ── caches static, serves ~all traffic
   │
Cloud Storage bucket (public, uniform; out/ + artifacts/ + feed/sitemap/robots)
   │
Cloud Run (scale-to-zero) ── gateway stub (Fleet proxy, live queries) — INACTIVE in v1
   │
Artifact Registry (gateway image) | Secret Manager / Cloud KMS (Fleet keys, never in repo)
Cloud Build (build: next build + compiler → upload to Storage)
Cloud Logging/Monitoring (economical, sampling)
```
DNS: `danielkliewer.com` (and `www`) → CDN/LB. Old Vercel kept live as rollback until stable.

## 2. Terraform layout (`deploy/gcp/`)
```
deploy/gcp/
  main.tf                # provider, state backend (GCS), project vars
  storage.tf             # bucket (uniform, versioned off), public read for site objects,
                         #   lifecycle to purge old artifacts
  cdn.tf                 # LB + backend bucket + CDN + URL map + SSL (managed cert)
  run.tf                # Cloud Run service (gateway), scale-to-zero, no traffic until live
  iam.tf                # least-priv: Cloud Build SA uploads; Run SA reads Secret Manager;
                         #   no broad editor
  secrets.tf            # Secret Manager secrets (PostHog, Fleet) — values via env/CI, not repo
  dns.tf                # (optional) Cloud DNS zone + records; or external registrar CNAME
  variables.tf          # project_id, region, domain
  outputs.tf            # bucket name, LB IP, Run URL
```
- **State:** stored in a dedicated GCS bucket (versioned), not local.
- **No secrets in TF/VCS.** Secret Manager references only; values injected at apply via CI / `gcloud`.
- Lightweight `deploy/gcp/scripts/` `gcloud` fallback if Terraform unavailable — but Terraform is
  preferred for reproducibility (brief §21).

## 3. Deploy scripts
- **Local (`deploy.sh`):** `knowledge-compiler/run.py` → `next build` → `gsutil -m rsync out/`
  + `artifacts/` to bucket → invalidate CDN. Dev speed, no CI secrets needed.
- **CI (`cloudbuild.yaml`):** same steps in build steps; Cloud Build SA uploads; triggers on
  `main` push to `kliewerdaniel/a10`. GitHub Actions optional wrapper for preview deploys.

## 4. DNS cutover checklist (ratified: only after staging verifies)
1. Staging: deploy to a staging bucket + temp hostname; run P9 test suite.
2. Verify URL preservation (177 canonical_url), search, SEO, static-fallback, authz boundary.
3. Cutover: point `danielkliewer.com`/`www` to new LB; enable CDN.
4. **Keep Vercel live as rollback** for ≥2 weeks; monitor 4xx/5xx + search console.
5. Only after stable: decommission Vercel, remove legacy `next.config.ts` redirects (P11).

## 5. Cost model (brief §24) — <$3–5/month at low/modest traffic
- Storage (~50–200 MB): ~$0.01–0.05
- CDN egress (~10 GB/mo): ~$1.00
- Cloud Run (scale-to-zero, stubbed): ~$0.00–0.50
- Cloud Build (infrequent): ~$0.00–1.00
- Secret Manager / KMS: ~$0.10
- Logging/Monitoring (low vol): ~$0.50
- Cloud DNS (optional): ~$0.20
- **Dominated by egress if traffic grows; compute effectively free** (static + scale-to-zero).
- Compiler runs in Cloud Build at publish — no persistent service.

## 6. Security posture (user's FAIL-CLOSED)
- Uniform bucket policy; public only for site objects, never for `data/` or secrets.
- Cloud Run: no ingress from public until `live`; even then, write endpoints gated (ADR-GATEWAY).
- All secrets via Secret Manager; rotation supported.
- Build is hermetic; dependencies pinned (pyproject/package-lock).

## 7. Tests (P9)
- `terraform plan` clean; `terraform apply` in staging succeeds; site reachable via LB.
- `gsutil` upload matches `out/` + `artifacts/`; CDN serves; cache headers correct.
- Rollback path: repoint DNS to Vercel → verified reachable.
- Cost check: no always-on paid service (Run scale-to-zero, no VM).
