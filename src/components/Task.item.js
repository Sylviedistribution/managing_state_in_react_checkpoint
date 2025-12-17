import { Card, Form } from "react-bootstrap";
import { Trash,  } from "react-bootstrap-icons";
import { TaskStatus } from "../models/Status";

export default function TaskItem({ index, task, handleToggle, handleDelete }) {
  return (
    <div className="task-item">
        
      <div className="task-info">
        <Card.Title className="name">{task.name}</Card.Title>
        <Card.Text className="description">{task.description}</Card.Text>
        <Card.Text className="duedate">Due date: {task.dueDate}</Card.Text>
      </div>

      <div className="task-action">
        <Form.Check
          inline
          label={
            task.status === TaskStatus.ONHOLD
              ? "Progress"
              : task.status === TaskStatus.ONPROGRESS
              ? "Done"
              : "Back"
          }
          type="radio"
          onChange={() => handleToggle(index, task)}
        />

        <Trash className="trash"
          onClick={() => {
            if (
              window.confirm(`Are you sure you want to delete "${task.title}"?`)
            ) {
              handleDelete(index);
            }
          }}
        />
      </div>
    </div>
  );
}
