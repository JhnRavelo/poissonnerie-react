import { useRef } from "react";
import ChevronDownSVG from "../../assets/svg/ChevronDownSVG";
import "./inputYear.scss";

type InputYearPropsType = {
  values?: string[];
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  value?: string;
  name?: string;
};

const InputYear = ({ values, setValue, value, name }: InputYearPropsType) => {
  const chevronRef = useRef<SVGSVGElement | null>(null);
  const selectDateRef = useRef<HTMLDivElement | null>(null);

  const handleVisibleSelectYear = () => {
    selectDateRef.current?.classList.toggle("visible");
    chevronRef.current?.classList.toggle("up");
  };

  const handleClickYear = (value: string) => {
    if (!setValue) return;
    selectDateRef.current?.classList.remove("visible");
    chevronRef.current?.classList.remove("up");
    setValue(value);
  };

  return (
    <div className="date">
      <div className="selected__date" onClick={handleVisibleSelectYear}>
        <h2 onClick={handleVisibleSelectYear}>
          {name ? name + " " : ""}
          {value}
        </h2>
        <ChevronDownSVG
          width="35"
          height="30"
          className="chevron"
          svgRef={chevronRef}
        />
      </div>
      <div ref={selectDateRef} className="setect__date">
        {values && values.length > 0
          ? values.map((item, index) => (
              <label key={index} onClick={() => handleClickYear(item)}>
                <input name="year" type="radio" value={item} />
                {name ? name + " " : ""} {item}
              </label>
            ))
          : null}
      </div>
    </div>
  );
};

export default InputYear;
