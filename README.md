# React To-Do List Application

This is a **React-based To-Do List application** designed to demonstrate modern state management, component-based architecture, form validation, and browser storage persistence. The app allows users to **add, edit, delete, and track tasks**, providing a clear workflow with tasks divided into three statuses: **On Hold**, **On Progress**, and **Done**. Each status has its own column, and tasks can be moved between columns using drag & drop.

Tasks include a **name**, **description**, and **due date**, with validation to ensure all fields are completed correctly. Completed tasks are visually distinguished, and deleting a task triggers a confirmation prompt. All tasks are saved in the browser's **localStorage**, ensuring persistence between sessions.

## Key Features

- **Add Tasks:** Users can create tasks with a name, description, and due date.
- **Edit Tasks:** Clicking the edit icon pre-fills the form to update task details.
- **Delete Tasks:** Tasks can be deleted with a confirmation modal to prevent accidental removal.
- **Task Status Management:** Tasks can be toggled between On Hold, On Progress, and Done.
- **Drag & Drop:** Move tasks between columns by dragging them.
- **Form Validation:** Ensures task name and description are not empty, limits text length, and prevents due dates in the past.
- **Persistent Storage:** Uses `localStorage` to save tasks across browser sessions.
- **Responsive UI:** Distinct colors for each task column and clear layout for better usability.

## Components Overview

- **App:** Main component managing state, task operations, and layout.
- **TaskForm:** Handles adding and editing tasks with validation.
- **TaskItem:** Displays individual tasks with actions (edit, delete, toggle status).
- **TaskList, TaskOnProgress, TaskDone:** Display tasks filtered by their current status.
- **WarningBox:** Modal to confirm task deletion.
- **Header & Footer:** Basic layout and branding components.

## Installation and Setup

1. **Clone the repository:**

git clone https://github.com/your-username/react-todo-app.git

Navigate to the project folder:
cd react-todo-app

Install dependencies:
npm install
# or
yarn install
Run the application locally:
npm start
# or
yarn start
Visit http://localhost:3000 to see the app in action.

Project Structure
src/
├── components/       # All React components (TaskForm, TaskItem, TaskList, etc.)
├── models/           # Task model and TaskStatus constants
├── utils/            # Utility components (e.g., WarningBox)
├── App.js            # Main application component
├── App.css           # Application-wide styling
└── index.js          # Entry point

Notes
Uses React Bootstrap for UI components and icons.

Drag & drop is implemented to move tasks between status columns.

The app is designed to be readable, maintainable, and easy to extend, e.g., you can add task priority, sorting, or filters easily.

Clearing browser storage will remove all saved tasks.

This project is open-source under the MIT License.
