import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import "./TaskCard.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import TaskModal from "../AddTaskModal/TaskModal";
import DeleteWarning from "../DeleteWarning/DeleteWarning";

type TaskCardProps = {
  description: string;
  priority: string;
  id: string;
  status: boolean;
};

const TaskCard: React.FC<TaskCardProps> = ({
  description,
  priority,
  id,
  status,
}) => {
  const queryClient = useQueryClient();
  const [showControl, setShowControl] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const mutation = useMutation({
    mutationFn: () =>
      axios.put("http://localhost:8080/api/tasks/updateTask", {
        id: id,
        description: description,
        status: !status,
        priority: priority,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  return (
    <div className="task-container">
      <div className="task-detail">
        <div
          className="check-task"
          onClick={() => {
            mutation.mutate();
          }}
        >
          <div className={status ? "circle-check done" : "circle-check"}></div>
        </div>
        <div className="task-description">
          <p className="description">{description}</p>
          <p className="priority">{priority + " priority"}</p>
        </div>
      </div>
      <div className="edit-container-buttons">
        {showControl && (
          <div className="edit-buttons">
            <span
              onClick={() => {
                setShowEdit(!showEdit);
                setShowControl(!showControl);
              }}
            >
              Edit
            </span>
            <span
              onClick={() => {
                setShowDelete(!showDelete);
                setShowControl(!showControl);
              }}
            >
              Delete
            </span>
          </div>
        )}
        <div className="edit-task">
          <HiDotsVertical
            size={"25px"}
            cursor={"pointer"}
            onClick={() => setShowControl(!showControl)}
          />
        </div>
      </div>
      {showEdit && (
        <TaskModal
          id={id}
          showAddModal={showEdit}
          setShowAddModal={setShowEdit}
          title="Edit task"
          type="edit"
          description={description}
          priority={priority}
        />
      )}
      {showDelete && (
        <DeleteWarning
          showDeleteWarning={showDelete}
          setShowDeleteWarning={setShowDelete}
          taskId={id}
        />
      )}
    </div>
  );
};

export default TaskCard;
