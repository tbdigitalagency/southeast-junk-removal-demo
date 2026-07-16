# Data Model

This app currently stores data in browser localStorage and can export/import JSON backups.

## Backup Shape

```json
{
  "version": 1,
  "exportedAt": "2026-07-08T00:00:00.000Z",
  "audits": [],
  "prospects": []
}
```

## Future Tables

### prospects

- id
- business_name
- website
- phone
- niche
- location
- rating
- reviews
- notes
- status
- source
- created_at

### audits

- id
- business_name
- website
- niche
- location
- contact_name
- status
- summary
- scores_json
- findings_json
- competitors_json
- updated_at

## Migration Notes

The export file should be usable as the first migration source when moving to Supabase.

The app should keep local export/import even after a hosted database exists, because backups are useful before bulk changes and API experiments.
