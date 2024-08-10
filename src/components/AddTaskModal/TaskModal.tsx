import React, { useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import { IoClose } from "react-icons/io5";
import "./AddTaskModal.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type AddTaskModalProps = {
  showAddModal: boolean;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  type: "edit" | "add";
  id?: string;
  status?: boolean;
  priority: string;
};

const TaskModal: React.FC<AddTaskModalProps> = ({
  showAddModal,
  setShowAddModal,
  title,
  description,
  type,
  status,
  id,
  priority,
}) => {
  const [taskDescription, setTaskDescription] = useState(description);
  const [taskPriority, setTaskPriority] = useState(priority);

  const handlePostTask = () =>
    axios.post("http://localhost:8080/api/tasks/addTask", {
      description: taskDescription,
      priority: taskPriority,
    });

  const handleUpdateTask = () =>
    axios.put("http://localhost:8080/api/tasks/updateTask", {
      id: id,
      description: taskDescription,
      status: status,
      priority: taskPriority,
    });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: type === "edit" ? handleUpdateTask : handlePostTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  const handlePriority = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTaskPriority(event.target.value);
  };

  const handleSubmitTask = () => {
    if (taskDescription === "") {
      alert("You can not add a empty task");
    } else {
      mutation.mutate();
      setShowAddModal(!showAddModal);
    }
  };

  return (
    <Backdrop isActive={showAddModal} setIsActive={setShowAddModal}>
      {showAddModal && (
        <div
          className="addtask-container"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="header-addtask">
            <h2>{title}</h2>
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
              value={taskDescription}
              onChange={(event) => {
                event.preventDefault();
                setTaskDescription(event.target.value);
              }}
            />

            <div className="bottom-settings">
              <select onChange={handlePriority} value={taskPriority}>
                <option value="Low">Low</option>
                <option value="Mediu">Mediu</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
              <button className="save-btn-task" onClick={handleSubmitTask}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </Backdrop>
  );
};

export default TaskModal;
