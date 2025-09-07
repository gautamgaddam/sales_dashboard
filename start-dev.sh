#!/bin/bash

# Start both development servers
echo "Starting Dabang Sales Dashboard..."
echo "================================="
echo ""
echo "Starting API server on port 3001..."
pnpm dev:api &
API_PID=$!

echo "Waiting for API server to start..."
sleep 5

echo "Starting web server on port 3000..."
pnpm dev:web &
WEB_PID=$!

echo ""
echo "✅ Both servers are starting up!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 API: http://localhost:3001"
echo "📚 API Docs: http://localhost:3001/docs"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup processes on exit
cleanup() {
    echo ""
    echo "Shutting down servers..."
    kill $API_PID $WEB_PID 2>/dev/null
    exit 0
}

# Trap Ctrl+C
trap cleanup INT

# Wait for both processes
wait