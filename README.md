# RoomProof

**Tamper-evident move-in and move-out photo records for rented rooms.**

Each photo is hashed in the browser, re-hashed by the server, and chained to the photo before it. Change any photo and every later link breaks, so a tenant can prove what a room looked like on day one.

**Live demo:** https://roomproof-red.vercel.app

---

## The problem

Students, working bachelors and PG or flat tenants in India usually pay a one to three month security deposit. At move-out, landlords often deduct for damage that was already there, such as wall stains, cracked tiles or a broken tap. Tenants only have loose WhatsApp photos with no trusted timestamps, so they lose part of the deposit. Landlords also get blamed for damage they did not cause.

RoomProof replaces the "you said, I said" argument with a timestamped, hashed record that the landlord can review and acknowledge.

## Features

- **Guided capture:** walk through 12 spots (door, walls, tiles, tap, switchboard and more), one photo each, with a severity tag (OK, minor, damage), an optional note and optional location.
- **Hash-chained timeline:** every photo is linked to the previous one with SHA-256. A badge shows whether the chain is intact.
- **Sealing:** sealing an inspection locks it. Nobody can add or change photos afterwards.
- **Damage Diff:** a draggable before/after slider for each spot, comparing move-in with move-out.
- **Deposit letter:** pick the disputed spots, enter the deductions you accept, and generate a letter.
- **Landlord link:** a read-only page where the landlord reviews the record and acknowledges it. No account is needed.
- **Public verifier:** drop any photo file and the app checks whether it matches a sealed record.

## How the seal works

1. The browser computes the photo's SHA-256 with the Web Crypto API before upload.
2. The server receives the photo, re-hashes it, and rejects the upload if the hash differs.
3. The server links it to the previous photo:

   ```
   chainHash = sha256(prevHash + photoHash + spotKey + capturedAt)
   ```

4. The first photo in a room links to a hash of 64 zeros.
5. On every read the server recomputes the whole chain. If any photo, hash or timestamp was altered, the chain is reported broken at that position.
6. Sealing stores the last chain hash as the inspection's root hash.

The verifier matches the exact file only. A re-saved, edited or compressed copy (for example one sent through WhatsApp) produces a different hash and will not match.

## Tech stack

| Layer | Technology |
|---|---|
| Client | Next.js 14 (App Router), React 18, Lenis smooth scroll, plain CSS |
| Server | Node.js, Express |
| Database | MongoDB with Mongoose |
| Auth | JWT with bcrypt password hashing |
| Uploads | Multer (local disk) |
| Hashing | Web Crypto API (browser), Node `crypto` (server) |

## Project structure

```
roomproof/
├── client/                     Next.js app
│   ├── app/                    pages: landing, login, register, dashboard,
│   │                           tenancy (timeline, inspect, diff, claim),
│   │                           share/[token], verify
│   ├── components/             Providers (Lenis), Reveal (scroll animations)
│   ├── lib/                    api helper, SHA-256 helper, auth guard
│   └── public/img/             SVG illustrations
└── server/                     Express API
    └── src/
        ├── index.js            app setup, CORS, rate limit
        ├── models.js           Mongoose schemas
        ├── chain.js            hashing and chain verification
        ├── auth.js             JWT middleware
        └── routes/             auth, tenancies, public
```

## Getting started

### Prerequisites

- Node.js 18 or newer
- A MongoDB database: local, or a free MongoDB Atlas cluster

### 1. Server

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

On Windows PowerShell use `copy .env.example .env`.

Edit `server/.env`:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/roomproof
JWT_SECRET=use-a-long-random-string
CLIENT_URL=http://localhost:3000
```

### 2. Client

```bash
cd client
cp .env.local.example .env.local
npm install
npm run dev
```

Edit `client/.env.local`:

```
NEXT_PUBLIC_API=http://localhost:5000
```

Open http://localhost:3000.

## Environment variables

| Variable | Where | Purpose |
|---|---|---|
| `PORT` | server | API port (default 5000) |
| `MONGO_URI` | server | MongoDB connection string |
| `JWT_SECRET` | server | Secret used to sign login tokens |
| `CLIENT_URL` | server | Exact client origin allowed by CORS, no trailing slash |
| `NEXT_PUBLIC_API` | client | Base URL of the server, no `/api` and no trailing slash |

`NEXT_PUBLIC_` values are baked in at build time. After changing one on Vercel, redeploy.

## API reference

Routes marked **auth** need an `Authorization: Bearer <token>` header.

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | no | Create an account |
| POST | `/api/auth/login` | no | Log in and receive a token |
| GET | `/api/auth/me` | yes | Current user |
| GET | `/api/tenancies` | yes | List your rooms |
| POST | `/api/tenancies` | yes | Add a room (creates the move-in inspection) |
| GET | `/api/tenancies/:id` | yes | Room, inspections, photos and chain status |
| PATCH | `/api/tenancies/:id` | yes | Update room details |
| DELETE | `/api/tenancies/:id` | yes | Delete a room and its records |
| POST | `/api/tenancies/:id/inspections` | yes | Start an inspection (for example move-out) |
| GET | `/api/inspections/:id` | yes | Inspection with its photos |
| POST | `/api/inspections/:id/evidence` | yes | Upload a photo with its client hash |
| PATCH | `/api/evidence/:id` | yes | Change severity or note (unsealed only) |
| POST | `/api/inspections/:id/seal` | yes | Seal an inspection |
| GET | `/api/tenancies/:id/diff` | yes | Move-in versus move-out, per spot |
| POST | `/api/tenancies/:id/claim` | yes | Generate a deposit letter |
| GET | `/api/claims/:id/letter` | yes | Letter as plain text |
| GET | `/api/share/:token` | no | Read-only landlord view |
| POST | `/api/share/:token/acknowledge` | no | Landlord acknowledges a sealed inspection |
| POST | `/api/verify` | no | Upload a photo, get a match or no match |

## Data model

| Collection | Key fields |
|---|---|
| `User` | name, email, passwordHash, city |
| `Tenancy` | userId, title, address, landlordName, landlordPhone, depositAmount, startDate, status, spots, shareToken |
| `Inspection` | tenancyId, type (`move_in`, `periodic`, `move_out`), status (`draft`, `sealed`), sealedAt, rootHash |
| `Evidence` | inspectionId, tenancyId, spotKey, imageUrl, sha256, prevHash, chainHash, capturedAt, severity, note, geo |
| `Acknowledgement` | inspectionId, landlordName, comment, ip, at |
| `Claim` | tenancyId, items, letterText |

## Deployment

- **Database:** MongoDB Atlas free cluster. Create a database user and, under Network Access, allow your host's IP (or `0.0.0.0/0` for a demo).
- **Server:** Render web service. Root directory `server`, build command `npm install`, start command `npm start`. Set `MONGO_URI`, `JWT_SECRET` and `CLIENT_URL` (your Vercel URL).
- **Client:** Vercel. Root directory `client`. Set `NEXT_PUBLIC_API` to your Render URL, then deploy.

### Known limitation: photo storage

Photos are saved to `server/uploads/` on local disk. Render's free plan wipes the disk on every restart or redeploy, so photos disappear while the hash records in MongoDB remain. For real use, move uploads to Cloudinary or S3. Also note that the free Render plan sleeps when idle, so the first request after a pause can take up to a minute.

## Roadmap

- Cloud image storage
- Seeded demo room
- Image compression before hashing
- PDF export of the deposit letter
- Offline capture with a retry queue
- Landlord counter-comments on individual spots

## Security notes

- Passwords are hashed with bcrypt, and tokens expire after 30 days.
- The API is rate limited, and uploads are limited to 12 MB per photo.
- Never commit `.env` files. They hold your `JWT_SECRET` and `MONGO_URI`.
- The record proves a photo was not altered after upload. It does not prove the photo shows the real room at the time, so treat it as strong supporting evidence rather than legal proof.

## License

MIT