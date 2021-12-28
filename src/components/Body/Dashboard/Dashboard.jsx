import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const { userId, token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "https://new-health-coach.azurewebsites.net/api/payment",
          {
            tokenId: stripeToken.id,
            amount: 25000,
          }
        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken]);

  const KEY =
    "pk_test_51JvwJtAmkoGonD82vkkiVuJwbBdZcG2k4QH16OQO5nRI0IVcM71pwOGmHxriCTZXDKTfUKqi8cyjJ4XQ2Ebzo0au00e0vKIQOh";

  useEffect(() => {
    const makeReq = async () => {
      const res = await axios.get(
        `https://new-health-coach.azurewebsites.net/api/findSingleOrder/${userId}`,
        {
          headers: { authentication: `Bearer ${token}` },
        }
      );
      setData(res.data);
      console.log(res.data);
      setLoading(false);
    };
    makeReq();
  }, [userId, token, loading]);
  //Delete Orderid
  const handleDelete = (orderId) => {
    setLoading(true);
    const makeReq = async () => {
      const res = await axios.delete(
        `https://new-health-coach.azurewebsites.net/api/deleteOrder/${orderId}`,
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
              <div key={orders.address} className="col-sm-6 col-md-6 col-lg-4">
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
                    <div>
                      {stripeToken ? (
                        <span
                          style={{
                            margin: "0 auto",
                            backgroundColor: "black",
                            color: "white",
                            padding: "10px",
                          }}
                        >
                          Paid
                        </span>
                      ) : (
                        <StripeCheckout
                          billingAddress
                          shippingAddress
                          amount={2000}
                          description="You total is $20"
                          name="Awal shop"
                          token={onToken}
                          stripeKey={KEY}
                        >
                          <button
                            style={{
                              margin: "0 auto",
                              backgroundColor: "black",
                              color: "white",
                              padding: "10px",
                            }}
                          >
                            Pay Now
                          </button>
                        </StripeCheckout>
                      )}
                    </div>
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
