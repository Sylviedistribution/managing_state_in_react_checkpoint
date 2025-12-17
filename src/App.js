import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskDone from "./components/TaskDone";
import TaskOnProgress from "./components/TaskOnProgress";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { TaskStatus } from "./models/Status";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(
    localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("Tasks: ", tasks);
  }, [tasks]);

  function handleToggle(index, task) {
    const items = [...tasks];

    if (task.status === TaskStatus.ONHOLD) {
      items[index].status = TaskStatus.ONPROGRESS;
      localStorage.setItem("tasks", JSON.stringify(items));
    } else if (task.status === TaskStatus.ONPROGRESS) {
      items[index].status = TaskStatus.DONE;
      localStorage.setItem("tasks", JSON.stringify(items));
    } else if (task.status === TaskStatus.DONE) {
      items[index].status = TaskStatus.ONHOLD;
      localStorage.setItem("tasks", JSON.stringify(items));
    }
    setTasks(items);
  }

  function handleDelete(index) {
    const items = JSON.parse(localStorage.getItem("tasks"));
    const newItems = items.filter((item, i) => i !== index);
    localStorage.setItem("tasks", JSON.stringify(newItems));
    setTasks(newItems);
  }

  return (
    <div className="App">
      <Header firstname={"Sylvestre"} />

      <h1 className="text-center">My TO DO APP</h1>
      <section className="container-tasks">
        <div className="tasks-onhold">
          <h2>Tasks on hold</h2>
          <TaskForm tasks={tasks} setTasks={setTasks} />
          <TaskList
            tasks={tasks}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
          />
        </div>
        <div className="tasks-onprogress">
          <h2>Tasks on progress</h2>
          <TaskOnProgress
            tasks={tasks}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
          />
        </div>
        <div className="tasks-done">
          <h2>Tasks done</h2>
          <TaskDone
            tasks={tasks}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
          />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default App;
