import "./formButton.scss";

type FormButtonPropsType = {
  title: string;
  onClick: () => void;
  type?: "submit" | "reset" | "button";
  style?: React.CSSProperties;
};

const FormButton = ({ title, onClick, type, style }: FormButtonPropsType) => {
  return (
    <div className="button-container">
      <button type={type} onClick={() => onClick()} style={style ? style : {}}>
        {title}
      </button>
    </div>
  );
};

export default FormButton;
