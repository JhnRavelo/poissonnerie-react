import { useContext } from "react";
import HistoryContext from "../context/HistoryContext";

const useHistory = () => {
  return useContext(HistoryContext);
};

export default useHistory;
