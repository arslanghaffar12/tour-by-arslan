import "./App.scss";
import Economic from "./Pages/Economic/Economic";
import Home from "./Pages/Home/Home";
import ListedProperty from "./Pages/ListedProperty/ListedProperty";
import Login from "./Pages/Login/Login";
import { Routes, Route, useLocation, Navigate, Router } from "react-router-dom";
import Realestate from "./Pages/Realestate/Realestate";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MainPage from "./Pages/Realestate/MainPage";
import Layout from "./Layout";
import Memories from "./Pages/Realestate/Memories";

const PrtectedRoute = ({ token, children }) => {
  if (token) {
    return <Navigate to={"/login"} />;
  } else {
    return children;
  }
};

function App() {
  const logintoken = localStorage.getItem("token");
  const istoken = logintoken ? logintoken : false;

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/schedule" element={<Realestate />} />
          <Route path="/memories" element={<Memories />} />


        </Route>

        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route  path="/" element={<Realestate />} /> */}
        {/* <Route
          path="/realestate"
          element={
              <Realestate />
            // <PrtectedRoute token={istoken}>
              
            // </PrtectedRoute>
          }
        /> */}
        {/* <Route
          path="/listedproperty"
          element={
              <ListedProperty />
            // <PrtectedRoute token={istoken}>
              
            // </PrtectedRoute>
          }
        /> */}
        {/* <Route
          path="/economic"
          element={
              <Economic />
            // <PrtectedRoute token={istoken}>
              
            // </PrtectedRoute>
          }
        /> */}
      </Routes>
    </div>
  );
}

export default App;
