import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const { userId, token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const makeReq = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/findSingleOrder/${userId}`,
        {
          headers: { authentication: `Bearer ${token}` },
        }
      );
      setData(res.data);
      setLoading(false);
    };
    makeReq();
  }, [userId, token, loading]);
  //Delete Orderid
  const handleDelete = (orderId) => {
    setLoading(true);
    const makeReq = async () => {
      const res = await axios.delete(
        `http://localhost:5000/api/deleteOrder/${orderId}`,
        {
          headers: { authentication: `Bearer ${token}` },
        }
      );
      console.log(res.data);
      setLoading(false);
    };
    makeReq();
  };
  useEffect(() => {}, []);

  if (loading) {
    return (
      <div
        style={{ marginLeft: "260px ", paddingTop: "20px", marginTop: "50px" }}
        class="spinner-grow text-danger "
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div className="mt-5 pt-5">
      <section className="main-content">
        <div className="container">
          <h1 className="my-5"> Your Appointment </h1>
          <div className="row">
            {data.map((orders) => (
              <div className="col-sm-6 col-md-6 col-lg-4">
                <div className="card bg-white p-3 mb-4 shadow">
                  <div className="d-flex justify-content-between mb-4">
                    <div className="user-info">
                      <div className="user-info__img">
                        {/* <img src="img/user1.jpg" alt="User Img"> */}
                      </div>
                      <div className="user-info__basic">
                        <h5
                          className="mb-0 "
                          style={{ textTransform: "uppercase" }}
                        >
                          {orders.address.displayName}
                        </h5>
                      </div>
                    </div>
                    <div className="dropdown open">
                      <h6
                        onClick={() => handleDelete(orders._id)}
                        className="text-danger"
                      >
                        Delete
                      </h6>
                    </div>
                  </div>
                  <h6 className="mb-0">{orders.address.number}</h6>
                  <h2>{orders.address.service.title}</h2>

                  <div className="d-flex justify-content-between mt-4">
                    <div>
                      <h5 className="mb-0">
                        {orders.address.time}
                        <small className="ml-1">{orders.address.date}</small>
                      </h5>
                    </div>
                    <Link to="/" className="text-success font-weight-bold">
                      PAY
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
