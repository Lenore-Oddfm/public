# GREMELKIN / ONE CAT, MANY WORLDS — PRESENCE CONTRACT R001

**Current implementation:** playable only on Lenore Studio GitHub Pages. Browser saves are private to each browser; localStorage tab lease is a best-effort same-origin UI courtesy, **NOT a global guarantee**. No C.Link terminal is connected yet.

## Future invariant (do NOT claim implemented)
The worldwide character identifier is `ODDFM-GREMELKIN-ONE`. At most **one authenticated terminal/player** may hold a valid ACTIVE visit lease for this character at a time.

### Required authoritative server
1. Exactly one persisted singleton presence row (pet_id PK), lease_holder_session, lease_expires_at, monotonically increasing `epoch` fencing token, and location_type/location_id. Owner-neutral public viewer gets only: home/visiting/not available and maybe a friendly locale, never private player identifiers.
2. Begin visit as a **single transactional compare-and-swap** on the server: grant only when the existing lease expired or the same authorized holder renews, then increment epoch on ownership transfer. Concurrent requests across hundreds of players must serialize; losing contenders receive WAIT/NOT-HERE.
3. Holder authenticates for heartbeat/renewal every ~10s on a server 30s lease. Server verifies same holder + epoch, and prevents a stale old terminal from animating/interacting or revoking a newer holder's lease. No trust in local browser clocks.
4. Leaving via a `CAT_DOOR` endpoint is an atomic move/release; arrival is not announced until server transaction commits. On disconnect/crash, TTL frees lease; client hides pet once an epoch expires or heartbeat fails.
5. Authenticate origins/players and rate limit endpoints; avoid personal or location data on public GitHub; no anonymous client writes. Provide explicit Human recall to Studio home (supersede epoch).
6. Store canonical **character definition/checkpoints** in Lenore Studio private GitHub; synchronize runtime health/mood/session through secure storage, not public GitHub commits per click. Scheduled signed snapshot to the private repo may be added later only with Human approval, clear privacy redaction, and safe credential handling.
7. Every future C.Link terminal embeds a narrow, versioned `cat-door` client after approval; do not access Quin/robot applications until interfaces are reviewed with Miss Spock.

## R001 honest limits
- **Yes:** feed/pet/brush/nap/talk/chase, browser save/import/export, animated approved mascot, local tab courtesy.
- **No:** global one-place-only guarantee, account-wide mood sync, remote visitors, C.Link portals, real-time GitHub state commits, scheduled updates.
- A static GitHub Pages site cannot implement cross-user atomic locking or safely store write credentials in client JavaScript.

**Next gate:** Human reviews the playable Studio pet. Then design and explicitly authorize a lease backend + individual C.Link cat doors. No Quin install implied.
