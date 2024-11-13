import { useContext } from "react";
import StockContext from "../context/StockContext";

const useStock = () => {
  return useContext(StockContext);
};

export default useStock;
