import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

function Login() {
  const [emailId, setEmailId] = useState("");
  const [password, setPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true },
      );
      // console.log(res)
      dispatch(addUser(res.data));
      return navigate("/profile")
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex justify-center  my-15">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <fieldset className="fieldset py-5 ">
            {!isLoginForm && (
              <>
                <label
                  className="label text-[14px] font-semibold"
                  htmlFor="name"
                >
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  id="name"
                  className="input outline-0 mb-3.5"
                />
                <label
                  className="label text-[14px] font-semibold"
                  htmlFor="name"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  id="name"
                  className="input outline-0 mb-3.5"
                />
              </>
            )}
            <label className="label text-[14px] font-semibold" htmlFor="name">
              Email
            </label>
            <input
              type="text"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              id="name"
              className="input outline-0 mb-3.5"
            />

            <label className="label text-[14px] font-semibold" htmlFor="name">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              id="name"
              className="input outline-0"
            />
          </fieldset>
          <p className="text-red-500 font-semibold text-sm">{error}</p>

          <div className="card-actions justify-center">
            <button
              className="btn btn-primary my-1"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            className="cursor-pointer text-center py-2"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? SignUp here "
              : "Existing User? Login here"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
