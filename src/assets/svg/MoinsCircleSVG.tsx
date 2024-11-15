import { SVGPropsType } from "./StockSVG";

const MoinsCircleSVG = ({ width, height, onClick }: SVGPropsType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      onClick={onClick}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M17 13H7v-2h10m-5-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"
      />
    </svg>
  );
};

export default MoinsCircleSVG;
