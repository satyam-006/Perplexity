import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Protected = ({ children }) => {
  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    navigate("/login");
  }

  return children;
};

export default Protected;
