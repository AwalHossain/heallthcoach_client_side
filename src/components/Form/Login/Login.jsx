import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../../Redux/userRedux";

const Login = () => {
  //React Hooks being used here
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  //Email
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  //Password
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  //Sign in with email & password
  const handleLogin = (e) => {
    e.preventDefault();

    console.log("its working");
    dispatch(signIn({ email, password }));
  };

  return (
    <div>
      <main class="">
        <div class="w-50 mx-auto my-5">
          <section class="wrapper">
            <div class="heading">
              <h1 class="text text-large">Sign In</h1>
            </div>
            {/* Login form */}
            <form>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Email address
                </label>
                <input
                  onChange={handleEmail}
                  type="email"
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
                  onChange={handlePassword}
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div class="mb-3 form-check">
                <p class="text text-normal">
                  New user?{" "}
                  <span>
                    <Link to="/register">Create a new account</Link>
                  </span>
                </p>
              </div>
              <div>
                <h2>{error}</h2>
              </div>
              {loading ? (
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                <button
                  type="submit"
                  onClick={handleLogin}
                  class="btn btn-primary"
                >
                  Submit
                </button>
              )}
            </form>
            <div class="striped">
              <h2>{error}</h2>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Login;
