import React from "react";
import { useHistory } from "react-router-dom";
import { axiosPostRequest } from "../../utils";
import LogoSmall from "../../../images/StLogo.png";
import { useForm } from "react-hook-form";
const Form = ({ type = "", inputs, btns, submitFnc }) => {
  const { register, handleSubmit } = useForm();
  let history = useHistory();
  const onSubmit = async (data) => {
    submitFnc(
      await axiosPostRequest(
        `users/${type.replace(" ", "").toLowerCase()}`,
        data
      )
    );
    if (type !== "Sign in") {
      history.push("/Register/Signin");
    }
  };

  return (
    <>
      <img src={LogoSmall} alt="Logo small SmartSt" />
      <h4>{type}</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(inputs).map((i) => (
          <div key={i}>
            {inputs[i].type === "submit" ? (
              <input type="submit" value={type} />
            ) : (
              <>
                <label>{inputs[i].label}</label>
                <input
                  type={inputs[i].type}
                  {...register(inputs[i].name)}
                  placeholder={inputs[i].placeholder}
                />
              </>
            )}
          </div>
        ))}
      </form>
      {Object.keys(btns).length > 0 &&
        Object.keys(btns).map((b) => (
          <div key={b} onClick={btns[b].onClick} className="btn-cont">
            {btns[b].html}
          </div>
        ))}
    </>
  );
};
export default Form;
