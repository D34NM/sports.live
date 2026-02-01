#!/bin/bash

# Post-create script for devcontainer
# This runs after the container is created

echo "🏀 Welcome to Sports.Live Development Environment!"
echo ""

# Configure Git for consistent line endings
echo "Configuring Git..."
git config --global core.autocrlf input
git config --global core.eol lf
git config --global core.safecrlf false

echo "Installing dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "Quick Start Commands:"
echo "  npm run dev     - Start development server"
echo "  npm run build   - Build for production"
echo "  npm run lint    - Run linter"
echo "  npm run format  - Format code"
echo ""
echo "Mock Data Available:"
echo "  - 30 NBA teams with realistic scheduling"
echo "  - Deterministic data generation"
echo "  - Historical data for any date"
echo "  - API endpoints ready at http://localhost:3000/api/games"
echo ""
echo "Documentation:"
echo "  - .devcontainer/README.md - Devcontainer setup"
echo "  - DEVCONTAINER_TESTING.md - Testing guide"
echo "  - MOCK_DATA_EXAMPLES.md   - Mock data reference"
echo ""
echo "Happy coding! 🚀"
