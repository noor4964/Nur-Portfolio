# Deployment Guide

This project is a Vite + React frontend with an Express server (`server.js`) that serves the built `dist/` directory and exposes a `/api/contact` endpoint (uses Resend).

Prerequisites:
- Node.js 18+
- Set environment variables: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_TO_EMAIL`, `WEBSITE_NAME`, and `PORT` (optional).

Recommended deployment options:

1) Render / Railway (recommended)
 - Create a new Web Service (Render) or Service (Railway) and connect your GitHub repo.
 - Set the build command: `npm ci && npm run build`.
 - Set the start command: `npm start` (or `node server.js --prod`).
 - Add required environment variables in the dashboard.

2) Heroku (supported)
 - Create a Heroku app, set `HEROKU_API_KEY`, `HEROKU_APP_NAME`, and `HEROKU_EMAIL` as GitHub Actions secrets if you want CI deploys.
 - This repo includes a `Procfile` and a GitHub Actions workflow `.github/workflows/deploy-heroku.yml` that will build and deploy on push to `main`/`master`.
 - Alternatively, use `heroku git:remote -a <app>` and `git push heroku main`.

3) VPS / Docker
 - Build assets locally or in CI (`npm run build`), then run `NODE_ENV=production RESEND_API_KEY=... npm start` on your server.
 - For Docker, create a Dockerfile that runs `npm ci`, `npm run build`, and `npm start`.

4) Vercel (recommended for single-repo frontend+API)
 - This repo now contains a Vercel serverless function at `api/contact.js` and a `vercel.json`.
 - On Vercel, create a new project from this GitHub repo.
 - In Vercel Project Settings > Environment Variables, add `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_TO_EMAIL`, and `WEBSITE_NAME`.
 - Vercel will run `npm run build` and publish the `dist` directory as the static site; serverless functions are available at `/api/contact`.
 - Test the contact form in production by visiting your site and submitting the form.

Post-deploy checks:
- Visit your app URL and test the contact form.
- Confirm server logs show successful email sends and that `RESEND_API_KEY` is present in environment.

Security:
- Never commit `.env`—it's already in `.gitignore`.
- Store API keys as provider-specific secrets (Render/Railway/Heroku dashboard or GitHub Secrets).

If you want, I can:
- Add a `Dockerfile` and `docker-compose.yml` for containerized deploys.
- Add a GitHub Actions workflow to deploy to Render via the API.
- Provision a Render or Railway service from the repo (requires your provider credentials).
