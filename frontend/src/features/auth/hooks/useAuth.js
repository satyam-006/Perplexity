import {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  logout,
} from "../services/auth.service";
import { useDispatch } from "react-redux";
import { setUser, setLoading, setError } from "../auth.slice";

export const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = async ({ username, email, password }) => {
    try {
      dispatch(setLoading(true));
      const response = await register({ username, email, password });
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Registration Failed"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogin = async ({ email, password }) => {
    try {
      dispatch(setLoading(true));
      const response = await login({ email, password });
      dispatch(setUser(response.user));
    } catch (error) {
      dispatch(setError(error.response?.data?.message || "Login failed"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetMe = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getMe();
      dispatch(setUser(response.user));
    } catch (error) {
      // dispatch(
      //   setError(
      //     error.response?.data?.message || "Failed to fetch user details",
      //   ),
      // );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleForgotPassword = async ({ email }) => {
    try {
      dispatch(setLoading(true));
      const response = await forgotPassword({ email });
      // Handle success (e.g., show a success message)
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            "Failed to send password reset email",
        ),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleResetPassword = async ({ token, newPassword }) => {
    try {
      dispatch(setLoading(true));
      const response = await resetPassword({ token, newPassword });
      // Handle success (e.g., show a success message)
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || "Failed to reset password try again",
        ),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      const response = await logout();
      dispatch(setUser(null))
      dispatch(setError(null))
    } catch (error) {
      dispatch(setError(error.response?.data?.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    handleRegister,
    handleLogin,
    handleGetMe,
    handleForgotPassword,
    handleResetPassword,
    handleLogout,
  };
};
