# Base image
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

# 1. Builder stage
FROM base AS builder
WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy all files for installation and build
# (pnpm workspaces require all package.json files to be present)
COPY . .

# Set build-time arguments
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_ALLOW_REGISTRATION
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_ALLOW_REGISTRATION=$NEXT_PUBLIC_ALLOW_REGISTRATION

# Install dependencies and build
RUN CI=true pnpm install
RUN pnpm run build

# 2. Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-privileged user
RUN groupadd --system --gid 1001 nodejs
RUN useradd --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/package.json ./apps/web/package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/deploy/vps/start.sh ./start.sh

# Set permissions for uploads and start script
RUN mkdir -p apps/web/public/uploads && \
    chown -R nextjs:nodejs apps/web/public/uploads && \
    chmod +x ./start.sh

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Command to run migrations, provisioning and start the app
CMD ["./start.sh"]

