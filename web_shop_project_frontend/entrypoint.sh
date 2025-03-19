#!/bin/sh

echo "Warte auf Backend-Services..."

until nc -z user-service 8001; do
  echo "Warte auf user-service..."
  sleep 2
done

until nc -z product-service 8002; do
  echo "Warte auf product-service..."
  sleep 2
done

until nc -z order-service 8003; do
  echo "Warte auf order-service..."
  sleep 2
done

echo "Alle Backend-Services sind verfügbar. Starte Nginx..."
exec nginx -g "daemon off;"