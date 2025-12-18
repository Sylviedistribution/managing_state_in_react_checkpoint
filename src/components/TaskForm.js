import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Task from "../models/Task";
import { TaskStatus } from "../models/Status";

export default function TaskForm({ tasks, setTasks, taskToEdit, confirmEdit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [saveError, setSaveError] = useState(null);

  const errors = getErrors(name, description, dueDate);
  const isValid = Object.keys(errors).length === 0; // Verifier si le formulaire est valide

  // Synchroniser les champs avec la tâche à éditer
  useEffect(() => {
    if (taskToEdit && taskToEdit.id) {
      setName(taskToEdit.name || "");
      setDescription(taskToEdit.description || "");
      setDueDate(taskToEdit.dueDate || "");
      console.log("Formulaire chargé avec : ", taskToEdit);
    } else {
      setName("");
      setDescription("");
      setDueDate("");
      console.log("Formulaire réinitialisé");
    }
  }, [taskToEdit]); // <-- déclenche uniquement si l'id change

  function clean() {
    setName("");
    setDescription("");
    setDueDate("");
  }

  function getErrors(name, description, dueDate) {
    const result = {};
    if (!name) result.city = "City is required.";
    if (!description) result.description = "description is required.";
    if (!dueDate) result.dueDate = "Due date is required.";
    if (name.length > 50)
      result.city = "The task name must contain less than 50 caracters ";
    if (dueDate < Date.now())
      result.dueDate = "You cannot select a date earlier than today.";
    return result;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (taskToEdit) {
      console.log("Je suis bien dans le formulaire:", taskToEdit);
      confirmEdit({
        // passer la tâche mise à jour
        ...taskToEdit,
        name,
        description,
        dueDate,
      });
      return;
    }
    const newTask = new Task(
      crypto.randomUUID(),
      name,
      description,
      dueDate,
      TaskStatus.ONHOLD
    );
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    clean();
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
        {!isValid && (
          <Form.Label>
            {errors[name]}
          </Form.Label>
        )}
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
        <strong>Due Date</strong>
        <Form.Control
          type="date"
          onChange={(e) => setDueDate(e.target.value)}
          value={dueDate}
        />
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit">
          {taskToEdit && taskToEdit.id ? "Update Task" : "Add Task"}
        </Button>
      </div>
    </Form>
  );
}
