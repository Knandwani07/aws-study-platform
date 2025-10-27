#!/bin/bash

echo "🚀 Starting AWS Flashcards Real-time Server..."

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the server
echo "🌐 Server starting on http://localhost:3000"
npm start
