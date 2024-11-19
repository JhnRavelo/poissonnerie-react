import { useEffect, useState } from "react";
import { HistoryTypes } from "../context/HistoryContext";

const useFilter = (datas?: HistoryTypes, year?: string, month?: string) => {
  const [filterDatas, setFilterDatas] = useState<HistoryTypes>([]);
  useEffect(() => {
    if (datas && datas.length > 0 && year && month) {
      const filterDatas = datas.filter(
        (data) => data.year == year && data.month == month 
      );

      if (filterDatas) {
        setFilterDatas(filterDatas);
      }
    }
  }, [datas, year, month]);

  return filterDatas;
};

export default useFilter;
