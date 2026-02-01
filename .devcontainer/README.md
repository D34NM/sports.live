# Development Container Setup

This project includes a development container configuration for a consistent development environment across all platforms.

## What is a Dev Container?

A development container (devcontainer) is a fully-featured development environment running in a Docker container. It includes all the tools, runtimes, and dependencies needed to work on the project.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- [Visual Studio Code](https://code.visualstudio.com/) with the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

## Getting Started

### Option 1: Open in VS Code (Recommended)

1. Open the project folder in VS Code
2. When prompted "Reopen in Container", click **Reopen in Container**
3. Alternatively, press `F1` and select **Dev Containers: Reopen in Container**
4. Wait for the container to build and start (first time may take a few minutes)
5. Once ready, open the integrated terminal and run:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Option 2: Using GitHub Codespaces

1. Click the **Code** button on the GitHub repository
2. Select the **Codespaces** tab
3. Click **Create codespace on main** (or your branch)
4. Wait for the environment to initialize
5. Run `npm run dev` in the terminal
6. The app will be available on port 3000

## What's Included

The development container includes:

- **Node.js 22** (LTS) with npm
- **TypeScript** support
- **Git** and **GitHub CLI**
- **VS Code Extensions**:
  - Prettier (code formatting)
  - ESLint (linting)
  - Tailwind CSS IntelliSense
  - EditorConfig
  - TypeScript Next

## Features

- ✅ Automatic dependency installation on container creation
- ✅ Port forwarding for Next.js dev server (port 3000)
- ✅ Pre-configured VS Code settings (formatting, linting)
- ✅ Consistent environment across all development machines
- ✅ No need to install Node.js or other tools locally

## Container Configuration

The container is based on the official Microsoft TypeScript-Node devcontainer image and includes:

- **Base Image**: `mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm`
- **User**: `node` (non-root user)
- **Working Directory**: `/workspaces/sports.live`

## Customization

To customize the development container:

1. Edit `.devcontainer/devcontainer.json`
2. Rebuild the container: `F1` → **Dev Containers: Rebuild Container**

### Add Additional Tools

Add features in the `features` section:

```json
"features": {
  "ghcr.io/devcontainers/features/git:1": {},
  "ghcr.io/devcontainers/features/github-cli:1": {},
  "ghcr.io/devcontainers/features/docker-in-docker:2": {}
}
```

### Add VS Code Extensions

Add extension IDs to the `extensions` array:

```json
"extensions": [
  "esbenp.prettier-vscode",
  "dbaeumer.vscode-eslint"
]
```

## Troubleshooting

### Container Won't Start

1. Ensure Docker Desktop is running
2. Check Docker Desktop logs for errors
3. Try: `F1` → **Dev Containers: Rebuild Container**

### Port 3000 Already in Use

1. Stop any local Next.js servers
2. Check for other applications using port 3000
3. Modify the port in `devcontainer.json` if needed

### Performance Issues

- On Windows/Mac: Ensure Docker Desktop has adequate resources allocated
- On Windows: Use WSL 2 backend for better performance
- Consider excluding `node_modules` from file watching if using anti-virus software

### NPM Install Fails

1. Clear npm cache: `npm cache clean --force`
2. Delete `node_modules` and `package-lock.json`
3. Rebuild container: `F1` → **Dev Containers: Rebuild Container**

## Mock Data

The development environment uses comprehensive mock data for preview and testing:

- **30 NBA teams** with realistic names and abbreviations
- **Deterministic game generation** based on date (consistent across sessions)
- **Various game scenarios**: scheduled, live, final games
- **Realistic broadcasting** (ESPN, TNT, ABC, NBA TV, Local)
- **Historical data support** for any date range

### Testing Different Scenarios

Use the date picker in the app to browse:

- **Past dates**: All games show as "final"
- **Today**: Mix of scheduled, live, and final games
- **Future dates**: All games show as "scheduled"

### API Endpoints

Mock data is served through Next.js API routes:

- `GET /api/games?date=YYYY-MM-DD` - Get games for a specific date
- `GET /api/games/[id]/scores` - Get scores for a game (after reveal)

## Next Steps

Once the container is running:

1. Explore the mock data by changing dates
2. Test the spoiler protection system
3. Customize team favorites and preferences
4. Start integrating real APIs (Supabase, NBA API)

## Resources

- [VS Code Dev Containers Documentation](https://code.visualstudio.com/docs/devcontainers/containers)
- [Dev Container Specification](https://containers.dev/)
- [GitHub Codespaces Documentation](https://docs.github.com/en/codespaces)
