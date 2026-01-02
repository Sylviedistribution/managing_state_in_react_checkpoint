import { TaskStatus } from "../models/Status";
import TaskItem from "./TaskItem";

export default function TaskDone({
  tasks,
  handleToggle,
  handleDelete,
  handleEdit,
  updateTaskStatus,
}) {
 return (
    <div
      className="tasks"
      //Drag the task to Done section
      onDragOver={(e) => {
        e.preventDefault();
      }}
      //Drop the task to Done section
      onDrop={(e) => {
        const taskId = e.dataTransfer.getData("taskId");
        updateTaskStatus(taskId, TaskStatus.DONE);
      }}
    >
      { //Apply filter to show only the done
      tasks
        .filter((task) => task.status === TaskStatus.DONE)
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
