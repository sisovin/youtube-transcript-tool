# YouTube Transcript Tool

## Monorepo Setup

### Prerequisites
- Node.js (>=14.x)
- pnpm (>=6.x)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/githubnext/workspace-blank.git
   cd workspace-blank
   ```

2. Install dependencies:
   ```sh
   pnpm install
   ```

3. Set up environment variables:
   ```sh
   cp .env.example .env
   ```

4. Build the project:
   ```sh
   pnpm build
   ```

5. Start the development server:
   ```sh
   pnpm dev
   ```

## API Endpoints

### User
- `GET /api/users`: Get all users
- `POST /api/users`: Create a new user
- `GET /api/users/:id`: Get a user by ID
- `PUT /api/users/:id`: Update a user by ID
- `DELETE /api/users/:id`: Delete a user by ID

### Transcript
- `GET /api/transcripts`: Get all transcripts
- `POST /api/transcripts`: Create a new transcript
- `GET /api/transcripts/:id`: Get a transcript by ID
- `PUT /api/transcripts/:id`: Update a transcript by ID
- `DELETE /api/transcripts/:id`: Delete a transcript by ID

## Component Documentation

### Button
A reusable button component.

#### Props
- `label` (string): The text to display on the button.
- `onClick` (function): The function to call when the button is clicked.

### Input
A reusable input component.

#### Props
- `value` (string): The value of the input.
- `onChange` (function): The function to call when the input value changes.

## Development Guidelines

### Code Style
- Follow the ESLint rules defined in the shared configuration.
- Use Prettier for code formatting.

### Commit Messages
- Use conventional commits for commit messages.
- Example: `feat: add new user endpoint`

### Branching Strategy
- Use the `main` branch for production-ready code.
- Create feature branches for new features and bug fixes.
- Example: `feature/add-user-endpoint`
