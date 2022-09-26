import React from "react";
import { useState } from "react";
import DateInput from "../dateInput/DateInput";
import SelectInput from "../selectInput/SelectInput";
import "./locationForm.css";
import { axiosCalls } from "../../_api";
import { showLoader, hideLoader } from "../../loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Toast } from "react-toastify/dist/components";
import { Toast } from "../../helpers/toast/index";

const LocationForm = ({ addData }) => {
  const [locationUp, setLocationUp] = useState("");
  const [equipmentUp, setEquipmentUp] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [statusUp, setStatusUp] = useState("");
  const [dateUp, setDateUp] = useState("");
  const [sbuNo, setSbuNo] = useState("");

  const addTableDetails = async (e) => {
    e.preventDefault();

    const data = {
      createdAt: dateUp,
      locationName: locationUp,
      equipmentName: equipmentType,
      status: statusUp,
      transactionId: equipmentUp,
      sbuName: sbuNo,
    };
    showLoader();
    const res = await axiosCalls("systemTypes", "POST", data);
    if (res) {
      hideLoader();
      console.log(res);
      if (res.er) {
        console.log(res.er);
        console.log(res.er.message);
        Toast("error", res.er.message);

        return;
      }
      console.log(">>>>>>>>RES", res);
      Toast("success", "Data Added Successfully ");

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  };

  // const onSubmit = (e) => {
  //   e.preventDefault();

  //   addData({
  //     dateUp,
  //     locationUp,
  //     equipmentType,
  //     statusUp,
  //     equipmentUp,
  //     sbuNo,
  //   });

  //   setDateUp("");
  //   setLocationUp("");
  //   setEquipmentUp("");
  //   setEquipmentType("");
  //   setStatusUp("");
  //   setSbuNo("");
  // };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={addTableDetails}>
        <div className="selectGenFam">
          <div className="selectGenLabel">Location</div>

          <select onChange={(e) => setLocationUp(e.target.value)}>
            <option value="">Location</option>
            <option value="Abuja">Abuja</option>
            <option value="Lagos">Lagos</option>
            <option value="Ibadan">Ibadan</option>
          </select>
        </div>

        <div className="selectGenFam">
          <div className="selectGenLabel">Equipment</div>

          <select onChange={(e) => setEquipmentUp(e.target.value)}>
            <option value="">Equipment</option>
            <option value="23-ww">23-ww</option>
            <option value="343-3ww">343-3ww</option>
            <option value="Erg-5">Erg-5</option>
          </select>
        </div>
        <div className="selectGenFam">
          <div className="selectGenLabel">Equipment Type</div>

          <select onChange={(e) => setEquipmentType(e.target.value)}>
            <option value="">Equipment Type</option>
            <option value="Equipment 1">Equipment 1</option>
            <option value="Equipment 2">Equipment 2</option>
            <option value="Desktop">Desktop</option>
            <option value="Engine">Engine</option>
            <option value="Tesla">Tesla</option>
          </select>
        </div>

        <div className="selectGenFam">
          <div className="selectGenLabel">SBU </div>

          <select onChange={(e) => setSbuNo(e.target.value)}>
            <option value="">SBU</option>
            <option value="Sbu 1">Sbu 1</option>
            <option value="Sbu 2">Sbu 2</option>
          </select>
        </div>
        <div className="selectGenFam">
          <div className="selectGenLabel">Select Status</div>

          <select onChange={(e) => setStatusUp(e.target.value)}>
            <option value="">Select Status</option>
            <option value="available">available</option>
            <option value="maintenance">maintenance</option>
            <option value="breakdown">breakdown</option>
          </select>
        </div>
        <div className="selectGenFam">
          <div className="dateInputMain">
            <input
              type="text"
              placeholder="Select Date"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              onChange={(e) => setDateUp(e.target.value)}
            />
          </div>
        </div>
        <div
          className="saveDetails"
          style={{
            opacity:
              !locationUp || !equipmentUp || !statusUp || !equipmentType
                ? "0.3"
                : "1",
          }}
        >
          <input
            type="submit"
            disabled={
              !locationUp || !equipmentUp || !statusUp || !equipmentType
            }
          />
        </div>
      </form>
    </div>
  );
};

export default LocationForm;
