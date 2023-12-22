import React, { useState } from "react";
import logo from "../../assets/loginglogo.png";
import loginBg from "../../assets/loginbg.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { toastFunction } from "../../helpers/utils";
import { loginRequest } from "../../helpers/request";
import "./Login.scss";
import { Spin } from "antd";

const Login = () => {
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginValues, setLoginValues] = useState({
    username: "",
    password: "",
  });

  async function submitLogin(event) {
    event.preventDefault(); // Prevents form submission

    if (!loginValues.username || !loginValues.password) {
      toast.error("Please Fill All Fields", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: true,
      });
    } else {
      setLoading(true);
      const res = await loginRequest(loginValues);
      console.log("dioqwhdiqd", res);
      if (res.error !== null) {
        toast.error("Something is wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
        });
      } else {
        setLoading(false);
        toast.success("Login Successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: true,
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      }
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setLoginValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      submitLogin(event);
    }
  };

  return (
    <Spin spinning={loading} size="large">
      <ToastContainer />
      <div className="main_login">
        <div className="login_bg"></div>
        <div className="login_card">
          <div className="loging_logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="input_group">
            <label>Enter Your Email</label>
            <input
              onChange={handleChange}
              name="username"
              value={loginValues.username}
              type="text"
            />
          </div>
          <div className="input_group">
            <div className="icon" onClick={() => setEye(!eye)}>
              {eye ? (
                <AiOutlineEye className="eye_icon" />
              ) : (
                <AiOutlineEyeInvisible className="eye_icon" />
              )}
            </div>
            <label>Enter Your Password</label>
            <input
              onChange={handleChange}
              name="password"
              value={loginValues.password}
              type={eye ? "text" : "password"}
              onKeyPress={handleKeyPress}
            />
          </div>

          <button onClick={submitLogin}>Sign In</button>
        </div>
      </div>
    </Spin>
  );
};

export default Login;
