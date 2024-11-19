/* eslint-disable react-hooks/exhaustive-deps */
import { toast, ToastContainer } from "react-toastify";
import "./App.scss";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Modal from "./components/Modal/Modal";
import useForm from "./hooks/useForm";
import AppRouter from "./routers/AppRouter";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import useStock from "./hooks/useStock";
import { axiosDefault } from "./api/axios";
import useHistory from "./hooks/useHistory";

function App() {
  const formContext = useForm();
  const stockContext = useStock();
  const historyContext = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const fetchStocks = await axiosDefault.get("/stock");

        if (fetchStocks.data.success) {
          stockContext?.setStocks(fetchStocks.data.datas);
        } else toast.error(fetchStocks.data.message);
        const fetchAchats = await axiosDefault.get("/achat");

        if (fetchAchats.data.success) {
          historyContext?.setHistories(fetchAchats.data.datas);
          formContext?.setYears(fetchAchats.data.years);
        } else toast.error(fetchStocks.data.message);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [formContext?.isFetch]);

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
