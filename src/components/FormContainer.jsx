import React from "react";

const FormComponent = ({ children }) => {
  return (
    <div className="formContainer">
      <div className="formWrapper">{children}</div>
    </div>
  );
};

export default FormComponent;
