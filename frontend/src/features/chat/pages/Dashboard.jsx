import { useChat } from "../hooks/useChat";
import { useEffect } from "react";

const Dashboard = () => {
  const { initializeSocketConnection } = useChat();

  useEffect(() => {
    initializeSocketConnection();
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
