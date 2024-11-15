import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import "./nbrSachet.scss";
import MoinsCircleSVG from "../../assets/svg/MoinsCircleSVG";
import { useState } from "react";
import useAchat from "../../hooks/useAchat";
import { TypeData } from "../../context/StockContext";

type NbrSachetPropsType = {
  params: GridRenderCellParams<
    TypeData,
    number,
    string,
    GridTreeNodeWithRender
  >;
};
const NbrSachet = ({ params }: NbrSachetPropsType) => {
  const [value, setValue] = useState(params.value);
  const achatContext = useAchat();
  return (
    <div className="nbr-sachet-container">
      <span>{value ? value : 0}</span>
      <MoinsCircleSVG
        width="25"
        height="25"
        onClick={() => {
          setValue((prev) => {
            if (prev && prev > 0) {
              console.log(params.field, prev);
              achatContext?.setAchats((prev) => {
                const price =
                  params.field == "nbrDemiKg" && params?.row?.priceOneKg
                    ? params?.row?.priceOneKg / 2
                    : params.field == "nbrOneKg" && params?.row?.priceOneKg
                    ? params?.row?.priceOneKg
                    : 0;
                if (prev.length == 0) {
                  return [
                    {
                      id: params.row.id,
                      field: params.field,
                      productName: params.row.productName || "",
                      nbr: 1,
                      price,
                      total: price,
                    },
                  ];
                } else if (
                  prev.length > 0 &&
                  params?.row?.id &&
                  prev.find(
                    (item) =>
                      item.id === params.row.id && item.field === params.field
                  )
                ) {
                  return prev.map((item) => {
                    if (
                      item.id === params.row.id &&
                      item.field === params.field
                    ) {
                      return {
                        ...item,
                        nbr: item.nbr + 1,
                        total: price * (item.nbr + 1),
                      };
                    }
                    return item;
                  });
                } else {
                  return [
                    ...prev,
                    {
                      id: params.row.id,
                      field: params.field,
                      productName: params.row.productName || "",
                      nbr: 1,
                      price,
                      total: price,
                    },
                  ];
                }
              });
              return Number(prev) - 1;
            } else {
              return 0;
            }
          });
        }}
      />
    </div>
  );
};

export default NbrSachet;
