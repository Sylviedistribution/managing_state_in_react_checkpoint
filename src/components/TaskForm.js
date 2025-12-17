import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import Task from "../models/Task";
import { TaskStatus } from "../models/Status";

export default function TaskForm({ tasks, setTasks }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [errors, setErrors] = useState([]);

  function clean(){
    setName("");
    setDescription("");
    setDueDate("")
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newTask = new Task(
      tasks.length,
      name,
      description,
      dueDate,
      TaskStatus.ONHOLD
    );
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    clean()
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Control
          type="text"
          placeholder="Enter task name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Control
          type="text"
          placeholder="Enter task description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <label>Due Date</label>
        <Form.Control
          type="date"
          onChange={(e) => setDueDate(e.target.value)}
          value={dueDate}
        />
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit">
          Add Task
        </Button>
      </div>

    </Form>
  );
}
