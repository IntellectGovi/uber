import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start.jsx";
import UserLogin from "./pages/UserLogin";
import CaptainLogin from "./pages/CaptainLogin";
import UserRegister from "./pages/UserRegister";
import CaptainRegister from "./pages/CaptainRegister";
import Home from "./pages/Home.jsx";
import UserProtectedRoute from "./pages/UserProtectedRoute.jsx";
import UserLogout from "./pages/UserLogout.jsx";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/captainLogin" element={<CaptainLogin />} />
        <Route path="/userSignup" element={<UserRegister />} />
        <Route path="/captainSignup" element={<CaptainRegister />} />
        <Route
          path="/home"
          element={
            <UserProtectedRoute>
              <Home />
            </UserProtectedRoute>
          }
        />

        <Route path="/user/logout" element={<UserProtectedRoute>
              <UserLogout/>
            </UserProtectedRoute>}>

        </Route>
      </Routes>
    </div>
  );
};

export default App;
