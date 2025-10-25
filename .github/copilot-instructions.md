# RideShare Application - AI Agent Instructions

## Project Overview
RideShare is a React TypeScript ride-hailing platform with real-time ride tracking and role-based access (riders, drivers, admin). The project uses Vite, Redux Toolkit, and RTK Query for state management.

## Key Architecture Patterns

### Component Structure
- **Layout Components** (`src/components/layout/`): Base layouts including `DashboardLayout` and `CommonLayout`
- **UI Components** (`src/components/ui/`): Reusable Radix UI-based components
- **Module Components** (`src/components/modules/`): Feature-specific components grouped by domain
- **Safety Features** (`src/components/safety/`): Emergency contacts and SOS functionality

### State Management
- Uses Redux Toolkit with RTK Query for API data fetching
- Base API configuration in `src/redux/baseApi.ts`
- API cache tags: `USER`, `RIDE`, `RIDE_HISTORY`, `PROFILE`, `DRIVER`, `INCOMING_RIDES`, `ACTIVE-RIDE`

### Authentication & Authorization
- JWT-based auth implementation in `src/hooks/useAuth.ts` and `useAuthPersistence.ts`
- Role-based routing using `src/utils/withAuth.tsx` HOC
- Role constants defined in `src/constance/role.ts`

### Routing Structure
- Role-specific sidebar items in `src/routes/[role]SidebarItems.ts`
- Dynamic route generation in `src/utils/generateRoutes.ts`
- Protected routes wrapped with auth HOC

## Development Workflow

### Getting Started
```bash
npm install
npm run dev  # Starts development server
npm run build  # Production build
npm run lint  # Run ESLint
```

### Project Conventions
1. File Structure:
   - Feature-first organization under `src/pages/`
   - Shared components in `src/components/`
   - Reusable hooks in `src/hooks/`

2. Component Patterns:
   - UI components use Radix UI primitives
   - Pages wrapped in appropriate layout components
   - Safety features available globally through `SafetyProvider`

3. State Management:
   - Use RTK Query for API data
   - Local state with React hooks
   - Theme/mode persistence with context

## Common Tasks
1. Adding a new API endpoint:
   - Extend `baseApi.ts` with new endpoint
   - Add appropriate cache tags
   - Implement in feature slice

2. Creating protected routes:
   - Add route to appropriate sidebar items file
   - Wrap component with `withAuth` HOC
   - Update role permissions if needed

3. UI Component Development:
   - Use existing Radix UI primitives
   - Follow existing component structure in `ui/` directory
   - Maintain consistent styling patterns