#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

echo "Bringing up containers..."

sudo docker compose -f docker-compose.yaml up postgres pgadmin --build -d

echo "All services are up and running..."
