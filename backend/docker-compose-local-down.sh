#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

echo "Stopping and removing containers..."

sudo docker compose -f docker-compose.yaml down

echo "All services are stopped and removed..."
