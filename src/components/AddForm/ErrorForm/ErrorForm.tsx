type ErrorFormPropsType = {
  error: string;
  errors: string | undefined;
};

const ErrorForm = ({ error, errors }: ErrorFormPropsType) => {
  return (
    <>
      {error ? (
        <p className="error">{error}</p>
      ) : errors ? (
        <p className="error">{errors}</p>
      ) : null}
    </>
  );
};

export default ErrorForm;
