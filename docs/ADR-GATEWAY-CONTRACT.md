# ADR: Sovereign Gateway API Contract (P7)

> Status: DESIGN (uncommitted). v1 = STUB (ratified D3). Defines stable interfaces so the portal
> and Fleet `fleet/api` evolve independently. Live Fleet calls are a later phase.

## 1. Boundary principle (brief §8, user's meta-invariant)
- **Model output ≠ authority.** The portal never lets agent/Fleet output mutate itself or any
  external system. All mutating actions require human authorization via Fleet `fleet/epistemic.decide()`.
- v1: every gateway endpoint resolves to a **static artifact** bundled in the build. The Cloud Run
  service is scaffolded but inactive (scale-to-zero = $0). The authorization boundary is visible in
  code even while the executor is a no-op stub.

## 2. Endpoint contract (stable; implemented as stubs in v1)
All paths prefixed `/api`. Request/response JSON. No auth required for reads; writes gated.

| Method | Path | v1 behavior | Later (post-v1) |
|--------|------|-------------|-----------------|
| GET | `/api/knowledge?q=` | Serve `search.json` lexical results (static) | Live Fleet knowledge query |
| GET | `/api/artifact/<id>` | Serve `artifacts/<id>.json` (static) + verify sha256 | Fetch + validate signed artifact |
| GET | `/api/graph` | Serve `graph.json` (static) | Live graph from Fleet ledger |
| POST | `/api/agent/propose` | Accept proposal, return accepted+queued, **never executes** | Route to Fleet `epistemic_adapter` |
| POST | `/api/authz/evaluate` | Echo policy decision from static policy file (deny-by-default) | Call `fleet.epistemic.decide()` |
| POST | `/api/publish` | Reject (403) unless `X-Fleet-Signature` valid + human-approved | Human-authorized publish via Fleet |

## 3. Cloud Run service (scaffold, inactive in v1)
```
gateway/                      # small FastAPI/Flask service (Python, matches Fleet)
  main.py                    # mounts the 6 routes above as stubs
  fleet_client.py            # client to fleet/api (lazy; unused until enabled)
  policy.py                  # deny-by-default policy; reads fleet decision when live
  Dockerfile                 # minimal, pushed to Artifact Registry
  requirements.txt
```
- Deploys to Cloud Run, scale-to-zero. Environment: `GATEWAY_MODE=stub` (v1) → `live` (later).
- Secrets (Fleet keys, PostHog) via **Secret Manager** — never in repo or image (user's FAIL-CLOSED).

## 4. Authorization flow (the invariant, enforced in code)
```
agent proposes  -> POST /api/agent/propose -> stored as PROPOSAL (no side effect)
                                    |
                                    v
                  POST /api/authz/evaluate -> fleet.epistemic.decide()  (DENY by default)
                                    |
                      human approves (D17 human-approval gate in Fleet)
                                    |
                                    v
                  POST /api/publish (only if signed + approved) -> executor runs
```
Unauthorized output is never executed. The stub enforces the *shape*; Fleet enforces the *decision*.

## 5. Why this satisfies the brief
- §8 Sovereign Gateway = Fleet `fleet/api`, spoken to — not reimplemented (D4 in plan).
- §15 authorization: model output ≠ authority, demonstrated structurally.
- §16/§23 physical-realization / epistemic honesty: same gated flow applies to any actuator later.
- v1 ships the contract + stubs so the portal is complete and testable now; live Fleet is a config flip.

## 6. Tests (P9)
- Stub returns correct static payloads for all GETs.
- `POST /api/publish` without valid signature → 403 (fail-closed).
- `POST /api/agent/propose` never mutates any artifact (assert no write side effect in v1).
- Authz deny-by-default even when stub (policy returns deny; human approval path defined but inert).
