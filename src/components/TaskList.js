import { TaskStatus } from "../models/Status";
import TaskItem from "./Task.item";

export default function TaskList({
  tasks,
  handleToggle,
  handleDelete,
  handleEdit,
  updateTaskStatus,
}) {
  return (
    <div
      className="tasks"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        const taskId = e.dataTransfer.getData("taskId");
        updateTaskStatus(taskId, TaskStatus.ONHOLD);
      }}
    >
      {tasks
        .filter((task) => task.status === TaskStatus.ONHOLD)
        .map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
    </div>
  );
}
