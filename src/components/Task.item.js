import { Card, Form } from "react-bootstrap";
import { Trash, Pencil, Eye } from "react-bootstrap-icons";
import { TaskStatus } from "../models/Status";

export default function TaskItem({
  task,
  handleToggle,
  handleDelete,
  handleEdit,
}) {
  return (
    <div
      className="task-item"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("taskId", task.id);
      }}
    >
      <Card>
        <Card.Body>
          <div className="task-info">
            <Card.Title className="name">{task.name}</Card.Title>
            <Card.Text className=" mb-1">{task.description}</Card.Text>
            <Card.Text className="duedate">
              <strong>Due date:</strong> {task.dueDate}
            </Card.Text>
          </div>

          <div className="task-action">
            <Form.Check
              inline
              label={
                task.status === TaskStatus.ONHOLD
                  ? "Start"
                  : task.status === TaskStatus.ONPROGRESS
                  ? "Done"
                  : "Reset"
              }
              type="radio"
              onChange={() => handleToggle(task)}
            />

            <Eye className="eye" />

            <Pencil className="pencil" onClick={() => handleEdit(task)} />

            <Trash
              className="trash"
              onClick={() => {
                // if (
                //   window.confirm(
                //     `Are you sure you want to delete the task: "${task.name}"?`
                //   )
                // ) {
                //   handleDelete(task.id);
                // }

                handleDelete(task.id);
              }}
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
