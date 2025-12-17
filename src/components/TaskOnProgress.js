import React from "react";
import { Card } from "react-bootstrap";
import { TaskStatus } from "../models/Status";
import TaskItem from "./Task.item";

export default function TaskOnProgress({ tasks, handleDelete, handleToggle }) {
  return tasks
    .filter((task) => task.status === TaskStatus.ONPROGRESS)
    .map((task, index) => (
      <div className="tasks">
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
      </div>
    ));
}
