import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

function Login() {
  const [emailId, setEmailId] = useState("dhoni@gmail.com");
  const [password, setPass] = useState("Dhoni@123");
  const [error,setError]= useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL+"/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong")
    }
  };
  return (
    <div className="flex justify-center  my-15">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl ">Login</h2>
          <fieldset className="fieldset py-5 ">
            <label className="label text-[14px]" htmlFor="name">
              Email
            </label>
            <input
              type="text"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              id="name"
              className="input outline-0 mb-3.5"
            />

            <label className="label text-[14px]" htmlFor="name">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPass(e.target.value)}
              type="text"
              id="name"
              className="input outline-0"
            />
          </fieldset>
          <p className="text-red-500 font-semibold text-sm">{error}</p>
         
          <div className="card-actions justify-center">
            <button className="btn btn-primary my-1" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
