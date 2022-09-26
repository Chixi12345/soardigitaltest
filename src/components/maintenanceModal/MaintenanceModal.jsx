import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import LocationForm from "../locationForm/LocationForm";
import SystemTypeForm from "../systemTypeForm/SystemTypeForm";

const Modal = ({ closeAddMain, addData }) => {
  const [tab, setTab] = useState(1);

  const handleTab1 = () => {
    setTab(1);
  };

  const handleTab2 = () => {
    setTab(2);
  };
  return (
    <div className="menTag-tag-modal">
      <div className="menTag-tag-modal-content">
        <div className="closeBody-FamGen">
          <div className="closeBody-FamText">Maintenance Input</div>
          <div className="cancel-icon-btn" onClick={closeAddMain}>
            <FaTimes />
          </div>
        </div>
        <div className="line-Bottom"></div>
        <div className="login-fammm">
          <div className="toggleFormGen">
            <div
              style={{
                background: tab === 1 ? "#fff" : "",
                color: tab === 1 ? "#b42930" : "#000",
              }}
              className="locationToggleF"
              onClick={handleTab1}
            >
              Location
            </div>
            <div
              style={{
                background: tab === 2 ? "#fff" : null,
                color: tab === 2 ? "#b42930" : "#000",
              }}
              className="systemToggleF"
              onClick={handleTab2}
            >
              System Type
            </div>
          </div>

          <div className="dfdfdfdf">
            {tab === 1 && <LocationForm addData={addData} />}
            {tab === 2 && <SystemTypeForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
