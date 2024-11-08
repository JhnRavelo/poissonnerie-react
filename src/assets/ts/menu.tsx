import FactureSVG from "../svg/FactureSVG";
import LivraisonSVG from "../svg/LivraisonSVG";
import StockSVG from "../svg/StockSVG";

type TypeMenus = { url: string; name: string; SVG: React.ReactNode }[];

export const menus: TypeMenus = [
  {
    url: "/",
    name: "Gestion de stock",
    SVG: <StockSVG width="30" height="30" />
  },
  {
    url: "/achat",
    name: "Faire un achat",
    SVG: <LivraisonSVG width="30" height="30" />
  },
  {
    url: "/history",
    name: "Historique des achats",
    SVG: <FactureSVG width="30" height="30" />
  },
];
