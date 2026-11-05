import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { useEffect, useState } from "react";
import { useAuth } from "./features/auth/hooks/useAuth";
import { authToast } from "./utils/toast";
import Toast from "./features/auth/components/Toast";

const App = () => {
  const auth = useAuth();
  const [toastData, setToastData] = useState(null);

  useEffect(() => {
    auth.handleGetMe();
    authToast((message, type) => {
      setToastData({ message, type });
    });

    return () => authToast(null);
  }, []);

  return (
    <>
      {toastData && (
        <Toast
          message={toastData.message}
          type={toastData.type}
          onClose={() => setToastData(null)}
        />
      )}
      <RouterProvider router={router} />
    </>
  );
};

export default App;
