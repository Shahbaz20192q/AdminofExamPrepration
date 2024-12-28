import React, { useContext, useEffect, useState } from "react";
import PrimaryBtn from "../../Components/Buttons/PrimaryBtn";
import "./Auth.css";
import { toast } from "react-toastify";
import { StoreContext } from "../../Context/ContextStore";
import { useNavigate } from "react-router-dom";
import BtnLoader from "../../Components/Loader/BtnLoader";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { url, token, setToken, user, loader, setLoader } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const [forgetPassword, setForgetPassword] = useState(false);
  const [sendCode, setSendCode] = useState(false);
  const [isverify, setIsverify] = useState(false);
  const [email, setEmail] = useState();

  useEffect(() => {
    setLoader(false);
    if (user?.role == "user") {
      navigate("/");
    }
  }, [token]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(
        `${url}/users/${isLogin ? "adminLogin" : "register"}`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setLoader(false);
      if (result.success) {
        toast.success(result.message);
        setToken(result.token);
        sessionStorage.setItem("token", result.token);
        e.target.reset();
        navigate("/");
      } else {
        toast.error(result.message);
        e.target.reset();
      }
    } catch (error) {
      toast.error(result.message);
    }
  };

  const forgotHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    setEmail(data.email);
    try {
      const res = await fetch(
        `${url}/users/${sendCode ? "verify" : "forgrt"}/otp/${data.email}${
          sendCode ? "/" + data.otp : ""
        }`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.json();
      setLoader(false);
      if (result.success && result.verify) {
        setIsverify(true);
        e.target.reset();
        toast.success(result.message);
      } else if (result.success) {
        setSendCode(true);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);

      toast.success(
        "Error submiting the form,check your internet or tyr again.."
      );
    }
  };

  const changePasswordHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    setLoader(true);

    try {
      const res = await fetch(
        `${url}/users/changPassword/${email}/${data.password}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.json();
      setLoader(false);
      if (result.success) {
        toast.success(result.message);
        setForgetPassword(false);
        setIsverify(false);
        setSendCode(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("error during changing password try again");
    }
  };

  return (
    <div className="auth-page">
      {!forgetPassword ? (
        <form className="form" onSubmit={(e) => submitHandler(e)}>
          <h1>Admin {isLogin ? "Login" : "Register"} </h1>
          {isLogin ? (
            <></>
          ) : (
            <>
              <label htmlFor="username">Username:</label>
              <br />
              <input type="text" id="username" name="username" required />
            </>
          )}
          <br />
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            autoComplete="email"
            id="email"
            name="email"
            required
          />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            autoComplete="new-password"
            name="password"
            required
          />
          <br />

          {isLogin ? (
            <p>
              {" "}
              Don't have an account?{" "}
              <span className="link" onClick={() => setIsLogin(false)}>
                Register
              </span>{" "}
            </p>
          ) : (
            <p>
              {" "}
              Have an account?{" "}
              <span className="link" onClick={() => setIsLogin(true)}>
                Login
              </span>{" "}
            </p>
          )}

          {isLogin ? (
            <p>
              <span className="link" onClick={() => setForgetPassword(true)}>
                Forgot Password
              </span>{" "}
            </p>
          ) : (
            <></>
          )}

          <PrimaryBtn
            text={loader ? <BtnLoader /> : isLogin ? "Login" : "Register"}
            type="submit"
          />
        </form>
      ) : isverify ? (
        <>
          <form className="form" onSubmit={(e) => changePasswordHandler(e)}>
            <h1>Change Password</h1>
            <label htmlFor="password">Password :</label>
            <br />
            <input
              type="password"
              autoComplete="password"
              id="password"
              name="password"
              required
            />

            <PrimaryBtn
              text={loader ? <BtnLoader /> : "Submit"}
              type="submit"
            />
          </form>
        </>
      ) : (
        <form className="form" onSubmit={(e) => forgotHandler(e)}>
          <h1>Forgot Password</h1>
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            autoComplete="email"
            id="email"
            name="email"
            required
          />

          {sendCode ? (
            <>
              <p>
                <span className="link" onClick={() => setSendCode(false)}>
                  send otp again
                </span>{" "}
              </p>
              <label htmlFor="otp">OTP:</label>
              <br />
              <input
                type="number"
                autoComplete="otp"
                id="otp"
                name="otp"
                required
              />
            </>
          ) : (
            <></>
          )}

          <p>
            <span className="link" onClick={() => setForgetPassword(false)}>
              Login with Password
            </span>{" "}
          </p>

          <PrimaryBtn
            text={loader ? <BtnLoader /> : sendCode ? "Submit" : "Send OTP"}
            type="submit"
          />
        </form>
      )}
    </div>
  );
};

export default Auth;
