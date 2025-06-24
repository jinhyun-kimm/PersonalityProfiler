# Personality Test Application

## Overview

This is a modern personality test web application built with React, TypeScript, and Express. The application presents users with 10 questions to determine their personality type based on a scoring system. It features a clean, responsive design with Korean language support and provides detailed personality analysis results.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Components**: Shadcn/ui component library built on Radix UI
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints
- **Database**: PostgreSQL with Drizzle ORM
- **Session Storage**: In-memory storage for development (MemStorage class)
- **Middleware**: Custom logging and error handling

### Key Components

#### Database Schema (Drizzle ORM)
- `testSessions` table with fields:
  - `id`: Primary key (serial)
  - `answers`: JSONB field storing user responses
  - `personalityType`: Text field for calculated personality type
  - `createdAt`: Timestamp string

#### API Endpoints
- `GET /api/questions`: Returns test questions
- `GET /api/personality-types`: Returns personality type definitions
- `POST /api/test-session`: Submits test results
- `GET /api/test-session/:id`: Retrieves specific test session

#### Frontend Pages
- **Home** (`/`): Landing page with test introduction
- **Test** (`/test`): Interactive questionnaire interface
- **Results** (`/results/:personalityType`): Personality analysis display

## Data Flow

1. **Test Initiation**: User starts on home page and navigates to test
2. **Question Presentation**: Frontend fetches questions from API and displays them sequentially
3. **Answer Collection**: User responses are stored in local component state
4. **Score Calculation**: Frontend calculates personality scores based on answer weights
5. **Result Submission**: Test results are posted to backend API
6. **Result Display**: User is redirected to results page with personality type analysis

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React with comprehensive Radix UI components
- **Styling**: Tailwind CSS with PostCSS processing
- **Data Fetching**: TanStack React Query for caching and synchronization
- **Form Validation**: Zod schema validation
- **Date Handling**: date-fns for date manipulation
- **Routing**: Wouter for single-page application navigation

### Backend Dependencies
- **Database**: Neon serverless PostgreSQL
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Session Management**: connect-pg-simple for PostgreSQL sessions
- **Development**: tsx for TypeScript execution, esbuild for production builds

## Deployment Strategy

### Development Environment
- **Runtime**: Replit with Node.js 20 module
- **Database**: PostgreSQL 16 module
- **Development Server**: Runs on port 5000 with Vite HMR
- **Hot Reload**: Vite dev server with React Fast Refresh

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Deployment Target**: Autoscale deployment on Replit
- **Port Configuration**: Internal port 5000 mapped to external port 80

### Database Configuration
- **Development**: Uses DATABASE_URL environment variable
- **Schema Management**: Drizzle migrations in `./migrations` directory
- **Push Command**: `npm run db:push` for schema updates

## Changelog

```
Changelog:
- June 24, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```