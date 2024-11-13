import { ToastContainer } from "react-toastify";
import "./App.scss";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Modal from "./components/Modal/Modal";
import useForm from "./hooks/useForm";
import AppRouter from "./routers/AppRouter";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const formContext = useForm();

  return (
    <div className="main-container">
      <ToastContainer theme="dark" />
      {formContext?.openForm ? <Modal /> : null}
      <Header />
      <div className="page-container">
        <Menu />
        <div className="page-content">
          <AppRouter />
        </div>
      </div>
    </div>
  );
}

export default App;
