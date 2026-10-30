# RoomProof
Tamper-evident move-in / move-out photo records for rented rooms.

## Run
1. MongoDB running locally (or set MONGO_URI to Atlas).
2. `cd server && cp .env.example .env && npm i && npm run dev` (port 5000)
3. `cd client && cp .env.local.example .env.local && npm i && npm run dev` (port 3000)

## How the seal works
Browser hashes each photo (SHA-256, Web Crypto) -> server re-hashes the upload and rejects mismatches ->
chainHash = sha256(prevHash + photoHash + spotKey + capturedAt). Any edit breaks every later link.
