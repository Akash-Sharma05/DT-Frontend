import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

function Connections() {
  const connections = useSelector((store) => store.connections);

  const dispatch = useDispatch();
  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connections) return;
  if (connections.length === 0) {
    return <div className="text-center font-bold text-2xl mt-60">No connections found</div>;
  }
  return (
    <div className=" flex flex-col items-center my-10 jus">
      <h1 className="font-bold text-3xl">Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, about, age, gender } =
          connection;
        return (
          <div
            key={_id}
            className="flex border border-white m-4 p-4 rounded-md bg-base-300 px-4 w-1/2 mt-10"
          >
            <div>
              <img
                className="w-20 h-20 p-1 rounded-full"
                src={photoUrl}
                alt="photo"
              />
            </div>
            <div className="text-left ml-4 mt-1">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + " , " + gender}</p>}
              <h2>{about}</h2>
            </div>
           
          </div>
        );
      })}
    </div>
  );
}

export default Connections;
