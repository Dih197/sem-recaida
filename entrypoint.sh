#!/bin/sh
echo "Running database migrations..."
npx prisma db push --schema=prisma/schema.prisma --accept-data-loss --skip-generate 2>&1 || echo "Migration warning (may be OK on first run)"
echo "Starting app..."
exec node apps/web/server.js
