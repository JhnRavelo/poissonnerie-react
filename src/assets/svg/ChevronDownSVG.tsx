import { SVGPropsType } from "./DashboardSVG";

const ChevronDownSVG = ({ width, height, svgRef, className }: SVGPropsType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      ref={svgRef}
      className={className}
    >
      <path
        fill="currentColor"
        d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z"
      />
    </svg>
  );
};

export default ChevronDownSVG;
