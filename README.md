# Lead Leak Audit Studio

A local-service prospecting and audit tool for creating focused lead-leak reports, prioritizing businesses, and generating outreach copy.

## Local Development

```powershell
npm.cmd run dev
```

Open:

```text
http://127.0.0.1:4187
```

## Vercel Deployment

This project is ready to import into Vercel as a static app with one serverless function.

Vercel settings:

- Framework preset: Other
- Build command: leave empty
- Output directory: leave empty
- Install command: leave default or empty

Environment variables:

- `GOOGLE_PLACES_API_KEY`: optional, required only for live Places API prospect search

## Data

The app currently stores audits and prospects in browser localStorage. Use the sidebar `Export` and `Import` controls to move data between browsers until Supabase is added.
