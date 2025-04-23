#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

cd ../backend

echo "Deploying backend..."

docker compose -f docker-compose.yml up postgres minio app --build -d
docker system prune --force --all --volumes

echo "Deployment completed..."
