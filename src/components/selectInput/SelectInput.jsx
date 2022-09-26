import React from "react";
import "./selectInput.css";

const SelectInput = ({ label, option }) => {
  console.log(option);
  return (
    <div className="selectGenFam">
      <div className="selectGenLabel">{label}</div>
      {/* {option.map((datas) => { */}
      <select>
        <option>
          {/* {datas.customer} */}
          {option}
        </option>
      </select>
      {/* ;})} */}
    </div>
  );
};

export default SelectInput;
