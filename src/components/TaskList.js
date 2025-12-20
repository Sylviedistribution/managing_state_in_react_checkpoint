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
        //Drag the task to Onhold section
      onDragOver={(e) => {
        e.preventDefault();
      }}
      //Drop the task to Onhold section
      onDrop={(e) => {
        const taskId = e.dataTransfer.getData("taskId");
        updateTaskStatus(taskId, TaskStatus.ONHOLD);
      }}
    >
      {
        //Apply filter to show only the done
        tasks
          .filter((task) => task.status === TaskStatus.ONHOLD)
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))
      }
    </div>
  );
}
