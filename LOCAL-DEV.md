# Local Development Setup

## Quick Start

The frontend is configured to run on **http://localhost:3000**

### Starting the Application

**Option 1: Run Both Together (Recommended)**
```bash
npm run dev
```
This will start:
- Backend server on http://localhost:5000
- Frontend dev server on http://localhost:3000

**Option 2: Run Separately**

Terminal 1 - Backend:
```bash
npm run server
# or
cd server
npm start
```

Terminal 2 - Frontend:
```bash
npm run client
# or
cd client
npm run dev
```

## Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Proxy**: Frontend automatically proxies `/api/*` requests to `http://localhost:5000`

## Configuration

### Frontend (client/vite.config.js)
- Port: 3000
- Proxy: `/api` → `http://localhost:5000`

### Backend (server/index.js)
- Port: 5000 (or PORT from .env)
- CORS: Configured for localhost:3000

## Troubleshooting

### Port 3000 Already in Use
Change the port in `client/vite.config.js`:
```js
server: {
  port: 3001, // or any available port
}
```

### API Requests Failing
1. Ensure backend is running on port 5000
2. Check that proxy is configured in `vite.config.js`
3. Verify CORS settings in `server/index.js`

### MongoDB Connection Issues
The server will continue running even if MongoDB isn't connected, but database features won't work.

## Hot Reload

Both frontend and backend support hot reload:
- Frontend: Vite automatically reloads on file changes
- Backend: Uses nodemon for automatic restarts


