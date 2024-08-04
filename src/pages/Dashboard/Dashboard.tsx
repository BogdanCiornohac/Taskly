import React from "react";
import Layout from "../../components/Layout/Layout";
import "./Dashboard.css";
import TaskCard from "../../components/TaskCard/TaskCard";
import { useQuery } from "@tanstack/react-query";

const Dashboard: React.FC = () => {
  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () =>
      fetch("http://localhost:8080/api/tasks/getAll").then((response) =>
        response.json()
      ),
    queryKey: ["tasks"],
  });

  console.log(tasks);

  return (
    <Layout>
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        {isLoading && (
          <div className="loader-container">
            <h2>Loading...</h2>
            <div className="circle-load"></div>
          </div>
        )}

        {isError && (
          <div className="loader-container">
            <h2>An error has occurred while trying to fetch backend</h2>
          </div>
        )}
        <div className="tasks-container">
          {tasks?.map(
            (todo: { description: string; id: string; status: boolean }) => (
              <TaskCard
                description={todo.description}
                id={todo.id}
                key={todo.id}
                status={todo.status}
                priority="High"
              />
            )
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
