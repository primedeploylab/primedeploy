#!/bin/bash

# DeployPrime Portfolio Setup Script
# This script automates the initial setup process

echo "🚀 DeployPrime Portfolio Setup"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm --version)"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
echo "✅ Backend dependencies installed"
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
echo "✅ Frontend dependencies installed"
echo ""

# Create backend .env if it doesn't exist
cd ../backend
if [ ! -f .env ]; then
    echo "📝 Creating backend .env file..."
    cp .env.example .env
    echo "✅ Backend .env created from .env.example"
    echo "⚠️  Please update the .env file with your actual credentials"
else
    echo "ℹ️  Backend .env file already exists"
fi
echo ""

# Create frontend .env if it doesn't exist
cd ../frontend
if [ ! -f .env ]; then
    echo "📝 Creating frontend .env file..."
    cp .env.example .env
    echo "✅ Frontend .env created from .env.example"
else
    echo "ℹ️  Frontend .env file already exists"
fi
echo ""

cd ..

echo "✨ Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your MongoDB URI and other credentials"
echo "2. Update frontend/.env with your API URL (if different from default)"
echo "3. Run 'cd backend && npm run create-admin' to create admin user"
echo "4. Run 'cd backend && npm run seed' to add sample data (optional)"
echo "5. Start backend: 'cd backend && npm run dev'"
echo "6. Start frontend: 'cd frontend && npm run dev'"
echo ""
echo "📚 For detailed instructions, see QUICKSTART.md"
echo ""
