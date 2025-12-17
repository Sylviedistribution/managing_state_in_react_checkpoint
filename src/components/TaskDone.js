import React from "react";
import { Card } from "react-bootstrap";
import { TaskStatus } from "../models/Status";
import TaskItem from "./Task.item";

export default function TaskDone({ tasks, handleToggle, handleDelete }) {
  return tasks.filter((task) => task.status === TaskStatus.DONE)
    .map((task,index) => (
      <Card key={task.id ?? index}>
        <Card.Body>
          <TaskItem
            index={index}
            task={task}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
          />
        </Card.Body>
      </Card>
    ));
}
