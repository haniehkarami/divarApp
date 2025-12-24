import { ToastContainer } from "react-toastify";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <div>
      <h1>پروژه دیوار</h1>
      <AuthPage />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
