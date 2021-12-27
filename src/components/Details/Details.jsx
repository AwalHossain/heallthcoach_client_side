import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const Details = () => {
  const { serviceId } = useParams();
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.user);
  console.log(serviceId);
  useEffect(() => {
    fetch("https://awalhossain.github.io/host-file/service.json")
      .then((res) => res.json())
      .then((data) => {
        setFile(data);
        setLoading(false);
      });
    const makeRequest = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/findUserProduct/${serviceId}`,
          {
            headers: { authentication: `Bearer ${token}` },
          }
        );
        setFile(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, [token, serviceId]);
  // const logFile = file.find((data) => data.id == serviceId);

  return (
    <div className="d-flex container my-5 justify-content-center">
      {/* Details & dynamic route */}
      <div className="d-md-flex justify-content-center ">
        <img src={file?.img} className="img-fluid" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{file?.title}</h5>
          <p className="card-text">{file?.desc}</p>
          <Link className="btn btn-primary" to="/appointment">
            Make an Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Details;
