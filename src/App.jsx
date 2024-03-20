import React, { useState, useEffect } from "react";
import Login from "./Components/loginPage/Login";
import "./App.css";
import Register from "./Components/Register/Register";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dash from "./Components/adminDash/Dash";
import Dashboard from "./Components/DashPages/Dashboard";
import Database from "./Components/DashPages/Database";
import Events from "./Components/DashPages/Events";
import HR from "./Components/DashPages/HRmanagment";
import Activity from "./Components/DashPages/LatestActivity";
import Marketing from "./Components/DashPages/Marketing";
import User from "./Components/DashPages/User";
import PrivateRoute from "./Components/PageNotFound/PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import axiosInstance from "./Components/axiosInstance";
function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  console.log(isLogged);
  const checkAuth = async () => {
    try {
      axiosInstance.get("/checkAuth", { withCredentials: true }).then((res) => {
        console.log("chechAuth:", res.data);
        if (res.data.authenticated) {
          setIsLogged(true);
          setUsername(res.data.username);
        } else {
          setIsLogged(false);
          setUsername("");
        }
      });
    } catch (err) {
      console.log(err);
      setIsLogged(false);
      setUsername("");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  useEffect(() => {
    if (isLogged) {
      navigate("/Dash");
    }
  }, []);
  return (
    <div className="container">
      <Routes>
        <Route
          path="/Dash"
          element={
            <ProtectedRoute isLogged={isLogged}>
              <Dash />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard username={username} />} />
          <Route path="database" element={<Database />} />
          <Route path="events" element={<Events />} />
          <Route path="HR" element={<HR />} />
          <Route path="activities" element={<Activity />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="user" element={<User />} />
        </Route>
        <Route path="/" element={<Login setIsLogged={setIsLogged} />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/not_Connected" element={<PrivateRoute />} />
      </Routes>
    </div>
  );
}

export default App;
