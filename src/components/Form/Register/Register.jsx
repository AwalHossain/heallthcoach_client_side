import { getAuth, updateProfile } from "@firebase/auth";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Location from "../../../Hooks/Location";
import useAuth from "../../../Hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../../Redux/userRedux";

const Register = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setName] = useState("");
  const [errormessge, setError] = useState("Heolll");
  const [bool, setBool] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, mail, displayName } = useSelector(
    (state) => state.user
  );

  console.log(errormessge);

  const path = Location();
  const history = useHistory();
  //Push
  if (mail) {
    history.push("/");
  }
  const handleEmail = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleUserName = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
  };

  if (mail) {
    history.push("/");
  }
  // Registration with email, password & name
  const { register } = useAuth();
  const handleRegistration = (e) => {
    e.preventDefault();
    // register(email, password)
    //   .then(async (result) => {
    //     // Signed in
    //     await setUserName();
    //     history.push(path);
    //     window.location.reload();

    // fetch("http://localhost:5000/api/auth/register")
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
    dispatch(signUpUser({ username, email, password }));
  };
  // const setUserName = () => {
  //   updateProfile(auth.currentUser, { displayName: name }).then((result) => {});
  // };

  return (
    <div className="w-50 mx-auto my-5">
      <form onSubmit={handleRegistration}>
        <div>
          <div class="heading">
            <h1 class="text text-large">Sign Up</h1>
          </div>
          <div className="mb-3">
            <label class="form-label">Username</label>
            <input
              required
              onChange={handleUserName}
              type="text"
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              onChange={handleEmail}
              type="email"
              required
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              required
              onChange={handlePassword}
              type="password"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 form-check">
            <p class="text text-normal">
              Existing user?{" "}
              <span>
                <Link to="/login">Sign in</Link>
              </span>
            </p>
          </div>
          <span>
            <h3 className="text-warning">{error}</h3>
          </span>
          {loading ? (
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          ) : (
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Register;
