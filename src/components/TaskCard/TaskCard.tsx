import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import "./TaskCard.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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

  const mutation = useMutation({
    mutationFn: () =>
      axios.put("http://localhost:8080/api/tasks/updateTask", {
        id: id,
        description: description,
        status: !status,
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
      <div className="edit-task">
        <HiDotsVertical size={"25px"} cursor={"pointer"} />
      </div>
    </div>
  );
};

export default TaskCard;
