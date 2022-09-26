import React from "react";
import "./dateInput.css";

const DateInput = ({ label, placeHolder }) => {
  return (
    <div className="selectGenFam">
      <div className="dateInputMain">
        <input
          type="text"
          placeholder={placeHolder}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
        />
      </div>
    </div>
  );
};

export default DateInput;
