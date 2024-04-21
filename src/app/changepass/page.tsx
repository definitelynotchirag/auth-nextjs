"use client";

import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function ChangePassword() {
  // const router = useRouter()
  // const [token, setToken] = useState("");
  const [user, setUser] = useState({
    token:"",
    newpassword: "",
    confirmpassword: "",
  });
  const [isChanged, setChanged] = useState(false);
  const [error, setError] = useState(false);

  const Changefunc = async () => {
    try {
      await axios.post("/api/users/changepass", {user});
      setChanged(true);
      // router.push('/login');
    } catch (error: any) {
      setError(true);
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    console.log("here")
    console.log(urlToken)
    setUser({ ...user, token: urlToken })
  }, []);

  // useEffect(() => {
  //   if (token.length > 0) {
  //     // verifyUserEmail();
  //   }
  // }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Update Password</h1>
      <label htmlFor="password">New Password</label>
      <input
        className="p-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
        id="newpassword"
        type="password"
        value={user.newpassword}
        onChange={(e) => setUser({ ...user, newpassword: e.target.value })}
        placeholder="New Password"
      />
      <br/>
      <label htmlFor="password">Confirm Password</label>
      <input
        className="p-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
        id="confirmpassword"
        type="password"
        value={user.confirmpassword}
        onChange={(e) => setUser({ ...user, confirmpassword: e.target.value })}
        placeholder="Confirm Password"
      />
      <br/>
      <button onClick={Changefunc} className="p-2 border border-gray-300 mb-4 bg-blue-500 text-white rounded-lg">Submit</button>
    </div>
  );
}
