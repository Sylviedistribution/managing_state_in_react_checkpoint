import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskDone from "./components/TaskDone";
import TaskOnProgress from "./components/TaskOnProgress";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WarningBox from "./utils/WarningBox";
import { TaskStatus } from "./models/Status";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(
    localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : []
  );

  const [showWarning, setShowWarning] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("Tasks: ", tasks);
  }, [tasks]);

  function handleToggle(task) {
    const newItems = tasks.map((item) => {
      if (item.id !== task.id) return item;

      if (item.status === TaskStatus.ONHOLD)
        return { ...item, status: TaskStatus.ONPROGRESS };

      if (item.status === TaskStatus.ONPROGRESS)
        return { ...item, status: TaskStatus.DONE };

      if (item.status === TaskStatus.DONE)
        return { ...item, status: TaskStatus.ONPROGRESS };

      return { ...item, status: TaskStatus.ONHOLD };
    });

    setTasks(newItems);
  }

  function updateTaskStatus(taskId, newStatus) {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  }

  function handleEdit(updatedTask) {
    console.log("Editing task: ", updatedTask);
    setTaskToEdit({ ...updatedTask });
  }

  function confirmEdit(updatedTask) {
    const newItems = tasks.map((item) => {
      if (item.id === updatedTask.id) return { ...item, ...updatedTask }; // Merge updated fields with existing task
      return item; // Keep other tasks unchanged
    });
    setTasks(newItems); // Update state to re-render UI
    localStorage.setItem("tasks", JSON.stringify(newItems)); // Save updated tasks to localStorage
    setTaskToEdit(null); // reset edit state
  }

  // Delete task with confirmation

  // Show warning box before deletion
  function handleDelete(id) {
    setTaskToDelete(id);
    setShowWarning(true);
  }

  // Confirm deletion
  function confirmDelete() {
    const newItems = tasks.filter((item) => item.id !== taskToDelete);
    setTasks(newItems);
    localStorage.setItem("tasks", JSON.stringify(newItems));
    setTaskToDelete(null);
    setShowWarning(false);
  }

  function cancelDelete() {
    setTaskToDelete(null);
    setShowWarning(false);
  }

  return (
    <div className="App">
      <Header firstname={"Sylvestre"} />

      <h1 className="text-center">My To Do App</h1>

      <section className="container-tasks">
        <div className="tasks-onhold">
          <h2>Tasks on hold</h2>
          <TaskForm
            tasks={tasks}
            setTasks={setTasks}
            taskToEdit={taskToEdit}
            confirmEdit={confirmEdit}
          />
          <TaskList
            tasks={tasks}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            updateTaskStatus={updateTaskStatus}
          />
        </div>

        <div className="tasks-onprogress">
          <h2>Tasks on progress</h2>
          <TaskOnProgress
            tasks={tasks}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            updateTaskStatus={updateTaskStatus}
          />
        </div>

        <div className="tasks-done">
          <h2>Tasks done</h2>
          <TaskDone
            tasks={tasks}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            updateTaskStatus={updateTaskStatus}
          />
        </div>
      </section>

      {showWarning && (
        <WarningBox onConfirm={confirmDelete} onCancel={cancelDelete} />
      )}
      <Footer />
    </div>
  );
}

export default App;
