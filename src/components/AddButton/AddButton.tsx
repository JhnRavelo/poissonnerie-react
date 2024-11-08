import PLusSVG from "../../assets/svg/PLusSVG";
import "./addButton.scss";

type AddButtonPropsType = {
  handleClick: () => void;
};

const AddButton = ({ handleClick }: AddButtonPropsType) => {
  return (
    <div className="add-button" onClick={() => handleClick()}>
      <span>Nouveau</span>
      <PLusSVG width="20" height="20" />
    </div>
  );
};

export default AddButton;
