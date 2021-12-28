import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Appointment.css";
const Appointment = ({ service }) => {
  console.log(service);
  const { mail, displayName, userId, token } = useSelector(
    (state) => state.user
  );
  console.log(userId);
  const [number, setNumber] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [confirm, setconfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const address = {
      mail,
      displayName,
      date,
      confirm,
      time,
      number,
      service,
    };
    const appointment = {
      userId,
      address,
      amount: 250,
      productId: "",
    };
    const makeReq = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/order",
          appointment,
          {
            headers: { authentication: `Bearer ${token}` },
          }
        );
        console.log(res.data.userId);
        if (res.data) {
          setLoading(false);
          history.push("/");
        }
      } catch (err) {
        console.log(err);
      }
    };
    makeReq();
  };
  return (
    <div>
      <h1 className="text-center my-5">Make an Appointment</h1>
      <div className="container my-5">
        <form
          onSubmit={handleSubmit}
          id="ft-form"
          method="POST"
          accept-charset="UTF-8"
        >
          <fieldset>
            <legend>For person</legend>
            <label>
              Name
              <input value={displayName} type="text" name="name" required />
            </label>
            <div class="two-cols">
              <label>
                Email address
                <input value={mail} type="email" name="email" required />
              </label>
              <label>
                Phone number
                <input
                  onBlur={(e) => setNumber(e.target.value)}
                  type="tel"
                  name="phone"
                />
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend>Appointment request</legend>

            <div class="two-cols">
              <label>
                Datum
                <input
                  onBlur={(e) => setDate(e.target.value)}
                  type="date"
                  name="Appointment request"
                  required
                />
              </label>

              <div class="inline">
                <label>
                  <input
                    onBlur={(e) => setTime(e.target.value)}
                    type="hidden"
                    name="Morning desired"
                    value="no"
                  />
                  <input
                    onBlur={(e) => setTime(e.target.value)}
                    type="checkbox"
                    name="Morning desired"
                    value="Monrning"
                  />
                  Morning
                </label>
                <label>
                  <input
                    onBlur={(e) => setTime(e.target.value)}
                    type="hidden"
                    name="Afternoon desired"
                    value="no"
                  />
                  <input
                    onBlur={(e) => setTime(e.target.value)}
                    type="checkbox"
                    name="Afternoon desired"
                    value="afternoon"
                  />
                  Afternoon
                </label>
              </div>
            </div>
            <p>Confirmation requested by</p>
            <div class="inline">
              <label>
                <input
                  onChange={(e) => setconfirm(e.target.value)}
                  type="radio"
                  name="Confirmation requested by"
                  value="email"
                  required
                />
                Email
              </label>
              <label>
                <input
                  type="radio"
                  onChange={(e) => setconfirm(e.target.value)}
                  name="Confirmation requested by"
                  value="phone"
                  required
                />
                Phone call
              </label>
            </div>
          </fieldset>
          {loading ? (
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          ) : (
            <div class="btns">
              <input type="submit" value="Submit request" />
            </div>
          )}
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </form>
        {loading ? (
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          " "
        )}
      </div>
    </div>
  );
};

export default Appointment;
