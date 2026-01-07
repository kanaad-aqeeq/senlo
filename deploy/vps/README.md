# VPS Deployment with Docker Compose

This directory contains everything you need to deploy Senlo on a Virtual Private Server (VPS) using Docker.

## Prerequisites

- A VPS running Ubuntu 22.04 or 24.04 (recommended).
- Docker and Docker Compose installed.
- Minimum 2GB RAM (4GB recommended for build processes).
- Port 3000 open in your firewall.

## Initial Server Setup

If you are starting with a fresh server, follow these steps to prepare the environment:

```bash
# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Setup 2GB Swap (important for builds)
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' | tee -a /etc/fstab

# Configure Firewall
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 3000/tcp
ufw --force enable
```

## Deployment Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/senlo.git
   cd senlo/deploy/vps
   ```

2. **Configure Environment Variables**:
   Copy the example file and fill in your secrets:
   ```bash
   cp env.example .env
   # Edit .env and set AUTH_SECRET, INITIAL_USERS, etc.
   nano .env
   ```

3. **Start the Application**:
   ```bash
   docker compose up -d --build
   ```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `AUTH_SECRET` | Secret key for session encryption. Generate with `openssl rand -base64 32`. |
| `ALLOW_REGISTRATION` | Set to `false` to disable public sign-ups (Private Mode). |
| `INITIAL_USERS` | JSON array of users to be created on first start (useful for Private Mode). |
| `DATABASE_URL` | Connection string for Postgres (pre-configured for Docker). |

## Persistence and Logs

- **PostgreSQL Data**: Stored in a Docker volume named `postgres_data`.
- **Image Uploads**: Stored in a Docker volume named `uploads_data`.
- **View Logs**: `docker compose logs -f app`
- **Stop App**: `docker compose down`

## Updating to New Version

To pull changes and rebuild the containers:
```bash
git pull
docker compose build --no-cache
docker compose up -d
```
