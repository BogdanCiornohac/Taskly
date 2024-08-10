import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import { IoClose } from "react-icons/io5";
import "./DeleteWarning.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type DeleteWarningProps = {
  showDeleteWarning: boolean;
  setShowDeleteWarning: React.Dispatch<React.SetStateAction<boolean>>;
  taskId: string;
};

const DeleteWarning: React.FC<DeleteWarningProps> = ({
  showDeleteWarning,
  setShowDeleteWarning,
  taskId,
}) => {
  const queryClient = useQueryClient();
  const handleCloseModal = (prev: any) => setShowDeleteWarning(!prev);

  const mutation = useMutation({
    mutationFn: () =>
      axios.delete(`http://localhost:8080/api/tasks/deleteTask/${taskId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  const handleDeleteTask = (prev: any) => {
    mutation.mutate();
    setShowDeleteWarning(!prev);
  };

  return (
    <Backdrop setIsActive={setShowDeleteWarning} isActive={showDeleteWarning}>
      <div
        className="delete-container"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="close">
          <IoClose
            onClick={handleCloseModal}
            size={"22px"}
            className="close-delete"
          />
        </div>
        <p>Are you sure you want to delete this task?</p>
        <div className="delete-buttons">
          <button className="warning-btn" onClick={handleDeleteTask}>
            Yes
          </button>
          <button onClick={handleCloseModal}>No</button>
        </div>
      </div>
    </Backdrop>
  );
};

export default DeleteWarning;
