import { Route, Routes } from "react-router-dom";
import Achat from "../pages/Achat/Achat";
import History from "../pages/History/History";
import Stock from "../pages/Stock/Stock";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Stock />} />
      <Route path="/achat" element={<Achat />} />
      <Route path="/history" element={<History />} />
      <Route path="*" element={<Stock />} />
    </Routes>
  );
};

export default AppRouter;
