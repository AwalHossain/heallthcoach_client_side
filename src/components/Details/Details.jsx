import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import Appointment from "../Body/Appointment/Appointment";

const Details = () => {
  const { serviceId } = useParams();
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.user);
  console.log(serviceId);
  const history = useHistory();
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/findUserProduct/${serviceId}`,
          {
            headers: { authentication: `Bearer ${token}` },
          }
        );
        setFile(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err.response.data);
        if (err) {
          history.push("/login");
        }
      }
    };
    makeRequest();
  }, [token, serviceId, history]);
  // const logFile = file.find((data) => data.id == serviceId);

  return (
    <div className=" container my-5 justify-content-center">
      {/* Details & dynamic route */}
      {loading ? (
        <div class="spinner-grow text-danger text-center mx-auto" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          <div className="d-md-flex justify-content-center ">
            <img src={file?.img} className="img-fluid" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{file?.title}</h5>
              <p className="card-text">{file?.desc}</p>
            </div>
          </div>
          <div>
            <Appointment service={file} />
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
