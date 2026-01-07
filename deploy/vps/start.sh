#!/bin/sh

# 1. Run database migrations/push
echo "Running database migrations..."
pnpm db:push

# 2. Run provisioning (creating initial users)
echo "Running provisioning..."
pnpm db:provision

# 3. Start the application
echo "Starting Senlo..."
pnpm --filter web start

