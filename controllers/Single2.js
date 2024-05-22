import "./single2.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import useFetch from "../../hooks/useFetch";
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import cors from "cors";
const Single2 = ({ item, onChange }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { setData, data, loading, error } = useFetch(
    `/properties/find/${path}`
  );

  function handle(e) {
    setData(e.target.value);
    if (typeof onChange === "function") {
      onChange(e.target.value);
    }
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div
          style={{
            padding: 14,
            float: "right",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <button
            style={{
              backgroundColor: "#008000",
              border: "none",
              padding: "12px",
              color: "#fff",
            }}
          >
            <Link to={`/properties/editproperties`} style={{ color: "#fff" }}>
              Edit Properties
            </Link>{" "}
          </button>
        </div>
        {loading ? (
          "Loading"
        ) : (
          <>
            <div className="item" key={data._id}>
              <div className="detailItem">
                <span className="itemKey">
                  <strong> Name:</strong>

                  <input
                    placeholder="hi"
                    onChange={(e) => handle(e)}
                    value={data.name}
                    type="text"
                    name="name"
                  />
                </span>
                <br></br>
                <span className="itemValue"></span>
              </div>

              <div className="detailItem">
                <span className="itemKey">
                  <strong> Address:</strong>
                </span>
                <br></br>
                <span className="itemValue">{data.address}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">
                  <strong> City:</strong>
                </span>
                <br></br>
                <span className="itemValue">{data.city}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">
                  <strong> Distance:</strong>
                </span>
                <br></br>
                <span className="itemValue">{data.distance}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">
                  <strong> Details:</strong>
                </span>
                <br></br>
                <span className="itemValue">{data.detail}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">
                  <strong> Description:</strong>
                </span>
                <br></br>
                <span className="itemValue">{data.desc}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">
                  <strong> Price:</strong>
                </span>
                <br></br>
                <span className="itemValue">{data.cheapestPrice}</span>
              </div>

              <div className="detailItem">
                <span className="itemKey">
                  <strong> Featured:</strong>
                </span>
                <br></br>
                <span className="itemValue">{data.featured}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Single2;
