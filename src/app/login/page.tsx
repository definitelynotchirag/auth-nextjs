"use client";
import React, { useEffect } from "react";
// import { Link } from 'react-router-dom';
import Link from "next/link";
import axios from 'axios';
import {useRouter} from 'next/navigation';
import toast from "react-hot-toast";
// import router from "next/router";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log("Login Response", response.data);
      router.push('/profile');
    } catch (error:any) {
      console.log("Login failed", error);
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
  };


  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false);
    }
    else{
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        className="p-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
        id="username"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />

      <label htmlFor="password">Password</label>
      <input
        className="p-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />
      <br />
      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 mb-4 bg-blue-500 text-white rounded-lg "
      >
        Login Here
      </button>
      <Link href="/signup">Visit SignUp</Link>
      <Link href="/forgotpassword">Forgot Password?</Link>
    </div>
  );
}
