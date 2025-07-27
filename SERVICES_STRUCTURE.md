# Services Structure Documentation

This document outlines the new services architecture for the application, which follows a clean separation of concerns.

## Directory Structure

```
src/
├── services/           # Backend services
│   ├── apis/          # Frontend API clients
│   ├── repositories/  # Data access layer
│   ├── internal/      # Business logic services
│   ├── external/      # External service integrations
│   └── index.ts       # Services exports
├── types/             # TypeScript type definitions
│   ├── task.ts        # Task-related types
│   ├── user.ts        # User-related types
│   ├── api.ts         # API-related types
│   ├── common.ts      # Common/shared types
│   └── index.ts       # Types exports
└── app/api/           # API route handlers
```

## Architecture Overview

### 1. Types (`/types`)
- **Purpose**: Centralized TypeScript type definitions
- **Responsibility**: Define interfaces, types, and enums used across the application
- **Structure**:
  - `task.ts`: Task-related types (Task, CreateTaskRequest, etc.)
  - `user.ts`: User-related types (User, CreateUserData, etc.)
  - `api.ts`: API-related types (ApiResponse, PaginationParams, etc.)
  - `common.ts`: Common utility types (Optional, Status, etc.)

### 2. Repositories (`/services/repositories`)
- **Purpose**: Data access layer - handles all database operations
- **Responsibility**: CRUD operations, database queries, data mapping
- **Examples**: `TaskRepository`, `UserRepository`

### 3. Internal Services (`/services/internal`)
- **Purpose**: Business logic layer - contains application business rules
- **Responsibility**: Orchestrates repositories, handles business logic, validation
- **Examples**: `TaskService`, `AuthService`

### 4. API Services (`/services/apis`)
- **Purpose**: Frontend API clients - handles HTTP requests from frontend
- **Responsibility**: API calls, request/response handling, error management
- **Examples**: `TaskApi`, `UserApi`

### 5. External Services (`/services/external`)
- **Purpose**: External API integrations (future use)
- **Responsibility**: Third-party API calls, external service management
- **Examples**: OpenAI, payment gateways, etc.

## API Routes (`/src/app/api`)

API routes now only contain:
- Request/response handling
- Service orchestration
- Error handling
- HTTP status codes

**Example:**
```typescript
// Before: Direct database calls in route
export async function POST(req: NextRequest) {
  const user = await getOrCreateUser();
  const task = await prisma.task.create({...});
}

// After: Clean service usage
export async function POST(req: NextRequest) {
  const task = await taskService.createTask(body);
  return NextResponse.json(task, { status: 201 });
}
```

## Type Definitions

### Task Types
```typescript
interface Task extends PrismaTask {
  project: { name: string };
}

interface CreateTaskRequest {
  name: string;
  description?: string;
  status: string;
  dueDate?: string;
  projectId?: number;
}

interface UpdateTaskRequest {
  name?: string;
  description?: string;
  status?: string;
  dueDate?: string;
}
```

### User Types
```typescript
interface User extends PrismaUser {}

interface CreateUserData {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
}
```

### API Types
```typescript
interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
```

## Benefits

1. **Separation of Concerns**: Each layer has a specific responsibility
2. **Type Safety**: Centralized type definitions ensure consistency
3. **Testability**: Services can be easily unit tested
4. **Reusability**: Services can be reused across different parts of the app
5. **Maintainability**: Changes are isolated to specific layers
6. **Scalability**: Easy to add new features without affecting existing code

## Usage Examples

### Frontend Component
```typescript
import { TaskApi } from "@/services/apis/taskApi";
import { Task } from "@/types";

const taskApi = new TaskApi();
const tasks: Task[] = await taskApi.getTasks();
```

### API Route
```typescript
import { TaskService } from "@/services/internal/taskService";
import { CreateTaskRequest } from "@/types";

const taskService = new TaskService();
const task = await taskService.createTask(taskData as CreateTaskRequest);
```

### Repository
```typescript
import { TaskRepository } from "@/services/repositories/taskRepository";
import { Task } from "@/types";

const taskRepo = new TaskRepository();
const tasks: Task[] = await taskRepo.findManyByUserId(userId);
```

## Migration Notes

- All direct database calls have been moved to repositories
- Business logic has been extracted to internal services
- Frontend API calls now use dedicated API services
- Type safety has been improved with centralized type definitions
- Error handling is consistent across all layers
- All TypeScript interfaces are now centralized in `/types` folder