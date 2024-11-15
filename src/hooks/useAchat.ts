import { useContext } from "react";
import AchatContext from "../context/AchatContext";

const useAchat = () => {
  return useContext(AchatContext);
};

export default useAchat;
