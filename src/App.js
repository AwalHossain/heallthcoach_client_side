import "./App.css";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import About from "./components/Body/About/About";
import Package from "./components/Body/Package/Package";
import Login from "./components/Form/Login/Login";
import Register from "./components/Form/Register/Register";
import AuthProvider from "./contex/AuthProvider";
import Services from "./components/Body/Services/Services";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Blog from "./components/Body/Blog/Blog";
import Appointment from "./components/Body/Appointment/Appointment";
import NotFound from "./components/NotFound/NotFound";
import Details from "./components/Details/Details";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Dashboard from "./components/Body/Dashboard/Dashboard";
import Payment from "./components/Payment/Payment";
function App() {
  const { token } = useSelector((state) => state.user);

  useEffect(() => {}, []);
  return (
    <div className="">
      {/*  React router used here */}
      <BrowserRouter>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <PrivateRoute path="/appointment">
            <Appointment></Appointment>
          </PrivateRoute>
          <PrivateRoute path="/details/:serviceId">
            <Details></Details>
          </PrivateRoute>
          <PrivateRoute path="/blog">
            <Blog></Blog>
          </PrivateRoute>
          <Route path="/services">
            <Services></Services>
          </Route>
          <Route path="/about">
            <About></About>
          </Route>
          <Route path="/package">
            <Package></Package>
          </Route>
          <Route path="/payment">
            <Payment></Payment>
          </Route>
          <Route path="/login">
            {token ? <Redirect to="/" /> : <Login></Login>}
          </Route>
          <Route path="/dashboard">
            {token ? <Dashboard /> : <Redirect to="/login" />}
          </Route>
          <Route path="/register">
            <Register></Register>
          </Route>
          <Route exact path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
