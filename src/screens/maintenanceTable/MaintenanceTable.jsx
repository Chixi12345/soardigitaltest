import React, { useState, useEffect } from "react";
import "./maintenanceTable.css";
import { FaAngleLeft } from "react-icons/fa";
import MainTable from "./Table/MainTable";
import { showLoader, hideLoader } from "../../loader";
import { axiosCalls } from "../../_api";
import Modal from "../../components/maintenanceModal/MaintenanceModal";
import { Link } from "react-router-dom";
import { width } from "@mui/system";
import SystemData from "../../helpers/systemData/SystemData";

const MaintenanceTable = () => {
  const [loading1, setLoading1] = useState(true);

  const [totalAvailable, setTotalAvailable] = useState([]);
  const [totalRea, setTotalRea] = useState("");
  const [totalMaintenance, setTotalMaintenance] = useState();
  const [totalBreakDown, setTotalBreakDown] = useState();
  const [openAddMain, setOpenAddMain] = useState(false);
  // const [systemTypes, setSystemTypes] = useState([
  //   {
  //     id: "437dbe3e-eec5-40bb-a209-c0f895d4e28a",
  //     userId: "ffe25dbe-29ea-4759-8461-ed116f6739dd",
  //     transactionId: "SY-000006",
  //     serialId: 6,
  //     name: "system type",
  //     createdAt: "2022-07-23T09:53:42.198Z",
  //     updatedAt: "2022-07-23T09:53:42.225Z",
  //     locationName: "Abuja",
  //     sbuName: "Sbu 2",
  //     equipmentName: "TES-LA 01",
  //     status: "available",
  //   },
  //   {
  //     id: "6b5e8f93-0644-4860-bb87-0c1579f5b06b",
  //     userId: "15a6034d-39a2-4056-848a-705959c8c368",
  //     transactionId: "SY-5",
  //     serialId: 5,
  //     name: "Computer System",
  //     createdAt: "2022-07-05T09:08:46.365Z",
  //     updatedAt: "2022-07-05T09:08:46.371Z",
  //     locationName: "Lagos, Nigeria",
  //     sbuName: "Sbu 1",
  //     equipmentName: "TRACTOR 03",
  //     status: "maintenance",
  //   },
  //   {
  //     id: "859306f3-4533-45a2-b056-9d7d3bbf79f0",
  //     userId: "ffe25dbe-29ea-4759-8461-ed116f6739dd",
  //     transactionId: "SY-4",
  //     serialId: 4,
  //     name: "system type 3",
  //     createdAt: "2022-06-22T10:53:35.155Z",
  //     updatedAt: "2022-06-22T10:53:35.161Z",
  //     locationName: "Lagos",
  //     sbuName: "Sbu 1",
  //     equipmentName: "Equipment 1",
  //     status: "breakdown",
  //   },
  //   {
  //     id: "09d87fc4-638b-4797-9685-0e2a70129bff",
  //     userId: "ffe25dbe-29ea-4759-8461-ed116f6739dd",
  //     transactionId: "MMFRQ-3",
  //     serialId: 3,
  //     name: "System type 3",
  //     createdAt: "2022-06-21T08:30:22.348Z",
  //     updatedAt: "2022-06-21T08:30:22.352Z",
  //     locationName: "Jos Plateau, 932101, Nigeria",
  //     sbuName: "Sbu 3",
  //     equipmentName: "HP Tower",
  //     status: "available",
  //   },
  //   {
  //     id: "71089b46-0837-4669-b5b1-f736daab6e57",
  //     userId: "ffe25dbe-29ea-4759-8461-ed116f6739dd",
  //     transactionId: "MMFRQ-2",
  //     serialId: 2,
  //     name: "System type 2",
  //     createdAt: "2022-06-21T08:30:14.268Z",
  //     updatedAt: "2022-06-21T08:30:14.274Z",
  //     locationName: "Ibadan, Nigeria",
  //     sbuName: "Sbu 2",
  //     equipmentName: "765464",
  //     status: "breakdown",
  //   },
  //   {
  //     id: "7ac8124c-c75f-422b-98ad-1c56c4b0c90b",
  //     userId: "ffe25dbe-29ea-4759-8461-ed116f6739dd",
  //     transactionId: "MMFRQ-1",
  //     serialId: 1,
  //     name: "System type 1",
  //     createdAt: "2022-06-21T08:30:05.297Z",
  //     updatedAt: "2022-06-21T08:30:05.342Z",
  //     locationName: "Ondo, Nigeria",
  //     sbuName: "Sbu 2",
  //     equipmentName: null,
  //     status: "maintenance",
  //   },
  //   {
  //     createdAt: "2022-09-23",
  //     locationName: "Lagos",
  //     equipmentName: "Equipment 1",
  //     status: "maintenance",
  //     transactionId: "343-3ww",
  //     sbuName: "Sbu 2",
  //     id: "NF4qqtB",
  //   },
  //   {
  //     createdAt: "2022-09-15",
  //     locationName: "Abuja",
  //     equipmentName: "Equipment 2",
  //     status: "breakdown",
  //     transactionId: "343-3ww",
  //     sbuName: "Sbu 1",
  //     id: "_S7g6BL",
  //   },
  // ]);

  useEffect(() => {
    getAllMySubAccountsDat();
  }, []);

  const handleAddMain = () => {
    setOpenAddMain(!openAddMain);
  };

  const closeAddMain = () => {
    setOpenAddMain(false);
  };

  const getAllMySubAccountsDat = async () => {
    setLoading1(true);

    showLoader();
    const res = await axiosCalls("systemTypes", "get");
    if (res) {
      hideLoader();
      setTimeout(() => {
        setLoading1(false);
      }, 2000);
      if (res.er) {
        return;
      }
      console.log(">>>", res);
      setTotalAvailable(res);
      hideLoader();
    }
    setTimeout(() => {
      setLoading1(false);
    }, 2000);
  };
  // console.log(systemTypes);
  const availableStatusCount = totalAvailable.filter(
    (item) => item.status === "available"
  ).length;

  const breakdownStatusCount = totalAvailable.filter(
    (item) => item.status === "breakdown"
  ).length;

  const maintenanceStatusCount = totalAvailable.filter(
    (item) => item.status === "maintenance"
  ).length;

  // const addData = (systemTypes) => {
  //   const id = Math.floor(Math.random() * 10000) + 1;
  //   const newData = { id, ...systemTypes };
  //   setSystemTypes([...systemTypes, newData]);
  // };

  return (
    <div className="maintenance-bodyGen">
      <Link
        to="/"
        style={{ textDecoration: "none", width: "fit-content" }}
        className="maintenance-backGenFlex"
      >
        <div className="maintenance-backArrow">
          <FaAngleLeft />
        </div>
        <div className="maintenance-backText">Maintenance</div>
      </Link>
      {/* {totalAvailable.map((data) => { */}
      <div className="maintenance-InfoGen">
        <div className="maintenance-InfoSingleFir" onClick={handleAddMain}>
          <div className="maintenance-addBtn">+</div>
          <div className="maintenance-btnText">Maintenance</div>
        </div>

        <div className="maintenance-InfoSingle">
          <div className="maintenance-InfoSText">Total Available Equipment</div>
          <div className="maintenance-InfoRes">{availableStatusCount}</div>
        </div>

        <div className="maintenance-InfoSingle">
          <div className="maintenance-InfoSText">
            Total Maintenance Equipment
          </div>
          <div className="maintenance-InfoRes">{maintenanceStatusCount}</div>
        </div>
        <div className="maintenance-InfoSingle">
          <div className="maintenance-InfoSText">Total Breakdown Equipment</div>
          <div className="maintenance-InfoRes">{breakdownStatusCount}</div>
        </div>
      </div>
      {/* })} */}
      <div className="maintenanceTableGen">
        <MainTable />
      </div>
      {openAddMain && <Modal closeAddMain={closeAddMain} />}
    </div>
  );
};

export default MaintenanceTable;
