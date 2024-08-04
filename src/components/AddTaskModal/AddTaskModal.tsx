import React, { useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import { IoClose } from "react-icons/io5";
import "./AddTaskModal.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type AddTaskModalProps = {
  showAddModal: boolean;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  showAddModal,
  setShowAddModal,
}) => {
  const [taskDescription, setTaskDescription] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () =>
      axios.post("http://localhost:8080/api/tasks/addTask", {
        description: taskDescription,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  return (
    <Backdrop isActive={showAddModal} setIsActive={setShowAddModal}>
      {showAddModal && (
        <div
          className="addtask-container"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="header-addtask">
            <h2>Add new task</h2>
            <IoClose
              size={"22px"}
              onClick={(prev) => setShowAddModal(!prev)}
              className="close-addmodal"
            />
          </div>
          <div className="task-data">
            <label htmlFor="task-description">Task description: </label>
            <textarea
              id="task-description"
              rows={20}
              cols={50}
              onChange={(event) => {
                event.preventDefault();
                setTaskDescription(event.target.value);
              }}
            />
            <div className="bottom-settings">
              <select>
                <option value="Low">Low</option>
                <option value="Mediu">Mediu</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
              <button
                className="save-btn-task"
                onClick={() => {
                  mutation.mutate();
                  setShowAddModal(!showAddModal);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </Backdrop>
  );
};

export default AddTaskModal;
