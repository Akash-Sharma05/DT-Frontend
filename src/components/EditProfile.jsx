import React, { use, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

function EditProfile({ user }) {
  const [firstName, setFirstName] = useState(user.user.firstName);
  const [lastName, setLastName] = useState(user.user.lastName);
  const [age, setAge] = useState(user.user.age || "");
  const [gender, setGender] = useState(user.user.gender || "");
  const [about, setAbout] = useState(user.user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.user.photoUrl);
  const [error, setError] = useState("");
  const [showToast, setToast] = useState(false);
  const dispatch = useDispatch();

  const handleClick = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res?.data)); 
      setToast(true);
      const interval = setTimeout(()=>{
        setToast(false)
      },3000)
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-10">
        <div className="flex justify-center  mx-20">
          <div className="card card-border bg-base-300 w-96">
            <div className="card-body">
              <h2 className="card-title justify-center text-2xl ">
                Edit Profile
              </h2>
              <fieldset className="fieldset py-5 ">
                <label className="label text-[14px]" htmlFor="name">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  id="name"
                  className="input outline-0 mb-3.5"
                />
                <label className="label text-[14px]" htmlFor="name">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  id="name"
                  className="input outline-0 mb-3.5"
                />
                <label className="label text-[14px]" htmlFor="name">
                  Age
                </label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  id="name"
                  className="input outline-0 mb-3.5"
                />
                <label className="label text-[14px]" htmlFor="name">
                  Gender
                </label>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  id="name"
                  className="input outline-0 mb-3.5"
                />
                <label className="label text-[14px]" htmlFor="name">
                  About
                </label>
                <input
                  type="text"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  id="name"
                  className="input outline-0 mb-3.5"
                />
                <label className="label text-[14px]" htmlFor="name">
                  Photo Url
                </label>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  id="name"
                  className="input outline-0 mb-3.5"
                />
              </fieldset>
              <p className="text-red-500 font-semibold text-sm">{error}</p>

              <div className="card-actions justify-center">
                <button
                  onClick={() => handleClick()}
                  className="btn btn-primary my-1"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <UserCard
          user={{ firstName, lastName, age, gender, about, photoUrl }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Updated Successfully.</span>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfile;
