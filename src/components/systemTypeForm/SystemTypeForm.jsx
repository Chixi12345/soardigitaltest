import React, { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
// import { multiApi } from "../../multiApi";
import { showLoader, hideLoader } from "../../loader";
// import { axiosCalls } from "../../_api";
import { axiosCalls } from "../../multiApi";
import "./systemTypeForm.css";
const SystemTypeForm = () => {
  const [allMySubAccountsData, setAllMySubAccountsData] = useState([]);
  const [loading1, setLoading1] = useState(true);

  useEffect(() => {
    getAllMySubAccountsDat();
  }, []);

  const getAllMySubAccountsDat = async () => {
    setLoading1(true);

    showLoader();
    const res = await axiosCalls("users", "get");
    if (res) {
      hideLoader();
      setTimeout(() => {
        setLoading1(false);
      }, 2000);
      if (res.er) {
        return;
      }
      console.log(">>>", res);
      setAllMySubAccountsData(res);
      hideLoader();
    }
    setTimeout(() => {
      setLoading1(false);
    }, 2000);
  };

  return (
    <div>
      <Multiselect
        displayValue="name"
        onKeyPressFn={function noRefCheck() {}}
        onRemove={function noRefCheck() {}}
        onSearch={function noRefCheck() {}}
        onSelect={function noRefCheck() {}}
        options={allMySubAccountsData}
      />
    </div>
  );
};

export default SystemTypeForm;
