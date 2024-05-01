
# Todo App

This is a simple Todo application built using React.js with Vite and shadcn/ui for the frontend and Express.js with MongoDB for the backend.

## Getting started

To get started with this project, follow the instructions below.

### Prerequisites

Make sure you have the following installed:

* Node.js  
* npm (Node Package Manager)  
* MongoDB
## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
This will start the development server at http://localhost:3000


Open your web browser and navigate to http://localhost:3000 to view the Todo application.

## Usage

* Add new todo items by entering a task and some additional information.
* Delete todo items by clicking the delete button.
* Update todo items by clicking the edit button and modifying the task details.


## API Reference

This API provides endpoints to manage todo items in the todo application.

### Base URL
```bash
  http://localhost:3000
```

#### Create a new todo item

```http
POST /api/todos
```

**Request Body:**

```json
{
  "task": "New Task",
  "date": "2024-05-03T12:00:00.000Z",
  "priority": 3,
  "isCompleted": false,
  "collection": "default"
}
```

**Response Body:**

```json
{
  "id": 2,
  "task": "New Task",
  "date": "2024-05-03T12:00:00.000Z",
  "priority": 3,
  "isCompleted": false,
  "collection": "default"
}
```


#### Get all todos

```http
  GET /api/todos
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `null` | `Array` | Retrieves all todo items. |


Response Body:
```code
[
  {
    "id": 1,
    "task": "Sample Task",
    "date": "2024-05-01T12:00:00.000Z",
    "priority": 1,
    "isCompleted": false,
    "collection": "default"
  },
  ...
]
```

#### Get all todo items sorted

```http
  GET /api/todos/sort/:criteria
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `criteria`      | `string` | Retrieves all todo items sorted by the provided criteria |

criteria = `priority`, `date`

Response Body: 
```output
[
  {
    "id": 1,
    "task": "Sample Task",
    "date": "2024-05-01T12:00:00.000Z",
    "priority": 1,
    "isCompleted": false,
    "collection": "default"
  },
  ...
]
```



#### Delete todo items by collection

```http
DELETE /api/todos/:collection
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| \`collection\`| \`string\` | Collection name                   |

**Response Body:**

```json
[
  {
  "message": "Records deleted successfully"
}
]
```

#### Delete todo item by ID

```http
DELETE /api/todos/delete/:id
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| \`id\`      | \`number\` | Todo item ID                |

**Response Body:**

```json
{
  "message": "Records deleted successfully"
}
```

#### Update todo item by ID

```http
PUT /api/todos/:id
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| \`id\`      | \`number\` | Todo item ID                |

**Request Body:**

```json
{
  "task": "Updated Task",
  "date": "2024-05-02T12:00:00.000Z",
  "priority": 2,
  "isCompleted": true,
  "collection": "default"
}
```

**Response Body:**

```json
{
  "id": 1,
  "task": "Updated Task",
  "date": "2024-05-02T12:00:00.000Z",
  "priority": 2,
  "isCompleted": true,
  "collection": "default"
}
```


#### Update todo item by ID

```http
PATCH /api/todos/:id
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| \`id\`      | \`number\` | Todo item ID                |

**Request Body:**

```json
{
  "task": "Updated Task",
  "date": "2024-05-02T12:00:00.000Z",
  "priority": 2,
  "isCompleted": true,
  "collection": "default"
}
```

**Response Body:**

```json
{
  "id": 1,
  "task": "Updated Task",
  "date": "2024-05-02T12:00:00.000Z",
  "priority": 2,
  "isCompleted": true,
  "collection": "default"
}
```
