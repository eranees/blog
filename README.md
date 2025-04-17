# Blog Project

This project consists of a **backend** built with **Express.js** and **TypeScript**, and a **frontend** built with **React** and **TypeScript**. The project uses **Husky** for Git hooks, **Lint-Staged** for running linters and formatters before commits, and **Commitlint** for enforcing conventional commit messages.

## Prerequisites

Before starting, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16.x or higher)
- [Yarn](https://classic.yarnpkg.com/en/docs/install) (v1.x or higher)
- [Git](https://git-scm.com/)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/eranees/blog.git
cd blog
```

### 2. Install dependencies

Install dependencies for both the root, backend, and frontend.

# Install root dependencies (husky, lint-staged)

yarn add husky lint-staged --dev

# Enable husky in the root project

yarn husky install

# Install dependencies for backend

cd backend

```bash
yarn install
```

# Install dependencies for frontend

cd ../frontend

```bash
yarn install
```

### 3. Set up Husky hooks

Add the pre-commit and commit-msg hooks to run linting, formatting, and commit message validation.

# Add husky pre-commit hook to run lint-staged

```bash
yarn husky add .husky/pre-commit "yarn lint-staged"
```

# Add husky commit-msg hook for commitlint

````bash
yarn husky add .husky/commit-msg "npx --no-install commitlint --edit $1"

### 4. Configure lint-staged

In the root package.json, configure lint-staged to run linting and formatting on both backend and frontend code.

```bash
{
  "lint-staged": {
    "backend/**/\*.{ts,tsx}": [
      "yarn --cwd backend lint",
      "yarn --cwd backend prettier --write"
    ],
    "frontend/**/\*.{ts,tsx}": [
      "yarn --cwd frontend lint",
      "yarn --cwd frontend prettier --write"
    ]
  }
}
````

### 5. Configure ESLint and Prettier

#### Backend (backend/package.json)

Add the following scripts for linting and formatting.

```bash
{
  "scripts": {
    "lint": "eslint './src/\*_/_.{ts,js}' --fix",
    "format": "prettier --write .",
    "start:dev": "yarn lint && nodemon ./src/index.ts",
    "start": "yarn lint && node ./dist/index.js"
  }
}
```

#### Frontend (frontend/package.json)

Add the following scripts for linting and formatting.

```bash
{
  "scripts": {
    "lint": "eslint .",
    "format": "prettier --write .",
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  }
}
```

### 6. Set up Commitlint

Install Commitlint and configure it to enforce conventional commit messages.

# Install Commitlint and config

```bash
yarn add @commitlint/config-conventional @commitlint/cli --dev
```

Create a commitlint.config.js file in the root of the project:

```bash
module.exports = { extends: ["@commitlint/config-conventional"] };
```

# Running the Project

## Backend

To start the backend in development mode, run:

```bash
yarn start:dev # or yarn run start:dev
```

To start the backend in production mode:

```bash
yarn start
```

## Frontend

To start the frontend in development mode:

```bash
yarn dev
```

To build the frontend for production:

```bash
yarn build
```

To preview the production build:

```bash
yarn preview
```

# Git Hooks

This project uses Husky to set up Git hooks. These hooks ensure that:

- Pre-commit: Before each commit, lint-staged runs the linter and formatter on the staged files.

- Commit-msg: Ensures that commit messages follow the Conventional Commits format.

# License

MIT License. See LICENSE for details.

You can copy this directly and use it in your project! This README provides a complete setup for working with Husky, linting, and formatting for both the backend and frontend. Let me know if you need further changes!
