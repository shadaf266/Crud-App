# Products CRUD (Express + MongoDB + React)

## Backend (port 3000)
```bash
npm install
npm run dev
```
`.env` needs: `mongodb_uri=<your MongoDB connection string>` (optional: `PORT`, `CLIENT_URL`).

## Frontend (port 5173)
```bash
cd frontend
npm install
npm run dev
```
`frontend/.env`: `VITE_API_URL=http://localhost:3000/api/products`

## API
| Method | URL |
|---|---|
| POST | /api/products |
| GET | /api/products |
| GET | /api/products/:id |
| PUT | /api/products/:id |
| DELETE | /api/products/:id |
