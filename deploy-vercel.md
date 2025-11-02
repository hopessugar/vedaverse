# Vercel Frontend Deployment - Step by Step

## Frontend Deployment to Vercel

### 1. Create Vercel Account
- Visit https://vercel.com
- Sign up with GitHub

### 2. Import Project
- Click "Add New Project"
- Import your GitHub repository
- Vercel auto-detects Vite

### 3. Configure Build
In project settings:

- **Framework Preset:** Vite (auto-detected)
- **Root Directory:** `client`
- **Build Command:** `npm run build` (default)
- **Output Directory:** `dist` (default)
- **Install Command:** `npm install` (default)

### 4. Add Environment Variables
Go to "Settings" → "Environment Variables":

```
VITE_API_URL=https://your-backend.railway.app
```

**Important:** Replace with your actual backend URL

### 5. Deploy
- Click "Deploy"
- Wait for build to complete
- Get your frontend URL (e.g., `https://your-app.vercel.app`)

### 6. Update Backend CORS
Go back to Railway (or your backend provider) and add:
```
FRONTEND_URL=https://your-app.vercel.app
```

## Custom Domain (Optional)
- Go to project settings → Domains
- Add your custom domain
- Follow DNS setup instructions

## Troubleshooting

- **Build fails:** Check root directory is `client`
- **API 404:** Verify `VITE_API_URL` is set correctly
- **CORS errors:** Update backend `FRONTEND_URL`


