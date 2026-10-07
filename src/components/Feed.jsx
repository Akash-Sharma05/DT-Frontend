import axios from "axios";
import React, { useEffect } from "react";
import { legacy_connect, useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

function Feed() {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) {
    return;
  }
  if (feed.length <= 0) {
    return <div className="flex justify-center my-60 font-bold text-2xl">No new users founds!</div>
  }
  return (
    feed && (
      <div className="flex justify-center items-center my-10 ">
        <UserCard user={feed[0]} />
      </div>
    )
  );
}

export default Feed;
