import React, { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import MaterialTable from "material-table";
import icons from "./icons";
import "./mainTable.css";
// import { showLoader, hideLoader } from "./loader.js";
import { showLoader, hideLoader } from "../../../loader";
import { axiosCalls } from "../../../_api";

const MainTable = () => {
  const [loading1, setLoading1] = useState(true);

  const [allMySubAccountsData, setAllMySubAccountsData] = useState([]);

  //   const allMySubAccountsData = [
  //     {
  //       id: "121091",
  //       date: "24 February, 2021",
  //       customer: "Ebere McCoy",
  //       amount: "₦42,500.00",
  //       vendor: "Vendor Name",
  //       status: "Delivered",
  //     },
  //     {
  //       id: "121091",
  //       date: "24 February, 2021",
  //       customer: "Joe McCoy",
  //       amount: "₦42,500.00",
  //       vendor: "Vendor Name",
  //       status: "Delivered",
  //     },
  //     {
  //       id: "121091",
  //       date: "24 February, 2021",
  //       customer: "Mac McCoy",
  //       amount: "₦42,500.00",
  //       vendor: "Vendor Name",
  //       status: "Delivered",
  //     },
  //     {
  //       id: "121091",
  //       date: "24 February, 2021",
  //       customer: "Roland McCoy",
  //       amount: "₦42,500.00",
  //       vendor: "Vendor Name",
  //       status: "Delivered",
  //     },
  //     {
  //       id: "121091",
  //       date: "24 February, 2021",
  //       customer: "Eze McCoy",
  //       amount: "₦42,500.00",
  //       vendor: "Vendor Name",
  //       status: "Delivered",
  //     },
  //     {
  //       id: "121091",
  //       date: "24 February, 2021",
  //       customer: "Okeke McCoy",
  //       amount: "₦42,500.00",
  //       vendor: "Vendor Name",
  //       status: "Delivered",
  //     },
  //     {
  //       id: "121091",
  //       date: "24 February, 2021",
  //       customer: "Andrew McCoy",
  //       amount: "₦42,500.00",
  //       vendor: "Vendor Name",
  //       status: "Delivered",
  //     },
  //     {
  //       id: "121091",
  //       date: "24 February, 2021",
  //       customer: "Tony McCoy",
  //       amount: "₦42,500.00",
  //       vendor: "Vendor Name",
  //       status: "Delivered",
  //     },
  //     {
  //       id: "121091",
  //       date: "24 February, 2021",
  //       customer: "Tony McCoy",
  //       amount: "₦42,500.00",
  //       vendor: "Vendor Name",
  //       status: "Delivered",
  //     },
  //     {
  //       id: "121091",
  //       date: "24 February, 2021",
  //       customer: "Tony McCoy",
  //       amount: "₦42,500.00",
  //       vendor: "Vendor Name",
  //       status: "Delivered",
  //     },
  //   ];

  useEffect(() => {
    getAllMySubAccountsDat();
  }, []);

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
      setAllMySubAccountsData(res);
      hideLoader();
    }
    setTimeout(() => {
      setLoading1(false);
    }, 2000);
  };

  return (
    <div>
      <MaterialTable
        components={{
          Container: (props) => <Paper {...props} elevation={0} />,
        }}
        icons={icons}
        options={{
          exportButton: true,
          pageSize: 5,
        }}
        columns={[
          { title: "Date", field: "date" },
          { title: "Equipment Id", field: "equipment_id" },
          { title: "Location", field: "location" },
          { title: "SBU", field: "sbu" },
          { title: "Equipment", field: "equipment" },
          { title: "Status", field: "status" },
        ]}
        data={allMySubAccountsData.map((data) => {
          // console.log(data);
          return {
            equipment_id: !data?.transactionId ? "-" : data?.transactionId,
            date: !data?.createdAt ? "-" : data?.createdAt.slice(0, 10),
            location: !data?.locationName ? "-" : data?.locationName,
            sbu: !data?.sbuName ? "-" : data?.sbuName,
            equipment: !data?.equipmentName ? "-" : data?.equipmentName,
            status: (
              <div
                style={{
                  cursor: "pointer",
                  color:
                    data?.status === "available"
                      ? "#68AA69"
                      : data?.status === "breakdown"
                      ? "#FD5655"
                      : data?.status === "maintenance"
                      ? "#8D8648"
                      : "#000",

                  border: `1px solid ${
                    data?.status === "available"
                      ? "#68AA69"
                      : data?.status === "breakdown"
                      ? "#FD5655"
                      : data?.status === "maintenance"
                      ? "#8D8648"
                      : "#000"
                  } `,

                  background:
                    data?.status === "available"
                      ? "#D8F1D9"
                      : data?.status === "breakdown"
                      ? "#F8D6D4"
                      : data?.status === "maintenance"
                      ? "#FAF6D9"
                      : "#000",
                }}
                // onClick={() => {

                //   getSingleOrder(data);
                // }}
                className="order_status_famGen"
              >
                {!data?.status ? "-" : data?.status}
              </div>
            ),

            Check: (
              <div className="publicationCheckbox">
                <input id="c1" type="checkbox" />
              </div>
            ),
          };
        })}
        title=""
      />
    </div>
  );
};

export default MainTable;
