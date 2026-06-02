#!/usr/bin/env bash
# Helper script: guide to link this repo to Vercel locally
set -e

if ! command -v vercel >/dev/null 2>&1; then
  echo "Vercel CLI not found. Install with: npm i -g vercel"
  exit 1
fi

echo "1) Run: vercel login"
echo "2) Run: vercel --prod to create or link a project and deploy"
echo "3) After linking, find Project ID and Org ID in Vercel dashboard and set GitHub Secrets:"
echo "   - VERCEL_TOKEN (create from https://vercel.com/account/tokens)"
echo "   - VERCEL_ORG_ID"
echo "   - VERCEL_PROJECT_ID"
echo "4) The GitHub Actions workflow will deploy on push to main/master once secrets are set."
