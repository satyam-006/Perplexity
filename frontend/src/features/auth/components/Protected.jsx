import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Loading from "./Loading";

const Protected = ({ children }) => {
  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Loading/>;
  }
  if (!user) {
    navigate("/login");
  }

  return children;
};

export default Protected;
