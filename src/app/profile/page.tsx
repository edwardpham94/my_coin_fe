/** @format */

"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { set } from "zod";
import axiosInstance from "@/apis/axiosInstance";

const Profile = () => {
  const [walletAddress, setWalletAddress] = useState(""); // Example wallet address
  const [balance, setBalance] = useState(0); // Example balance
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
  }); // Example user info

  // Fetch wallet details (mock example)
  useEffect(() => {
    setUserInfo({
      username: Cookies.get("username") || "Guest",
      email: Cookies.get("username") || "Guest",
    });

    setWalletAddress(Cookies.get("walletAddress") || walletAddress);

    const fetchWalletDetails = async () => {
      try {
        // Replace with your API call
        const data = await axiosInstance.get(
          `/wallet/my-wallet?walletAddress=${Cookies.get("walletAddress")}`
        );
        console.log(data?.data);

        console.log(data);
        // setWalletAddress(data.walletAddress);
        setBalance(data.data.balance);
        // setUserInfo(data.userInfo); // Assuming the API returns user info
      } catch (error) {
        console.error("Error fetching wallet details:", error);
      }
    };

    fetchWalletDetails();
  }, []);

  // Copy wallet address to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    alert("Wallet address copied to clipboard!");
  };

  return (
    <main className="flex-grow w-full">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-primary via-primary/90 to-primary/60 px-4">
        {/* Title & Subtitle */}
        <h1 className="font-extrabold text-4xl md:text-5xl leading-tight text-center text-white drop-shadow-lg mb-4">
          User Information
        </h1>
        <p className="text-center text-secondary/80 text-lg max-w-xl mb-10">
          With <span className="font-semibold text-white">CryptoCove</span>,
          manage all your crypto assets from one secure and intuitive interface.
        </p>

        {/* User Information Card */}
        <div className="backdrop-blur-xl bg-slate-800/80 border border-white/10 rounded-2xl shadow-2xl max-w-md w-full p-8 transition-transform transform hover:scale-[1.02] hover:shadow-primary/40">
          <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Wallet Details
          </h2>

          {/* Username */}
          <div className="mb-4">
            <p className="text-sm text-gray-400">Username</p>
            <p className="text-xl font-semibold text-white">
              {userInfo.username}
            </p>
          </div>

          {/* Wallet Address */}
          <div className="mb-4">
            <p className="text-sm text-gray-400">Wallet Address</p>
            <div className="flex items-center justify-between bg-slate-700/50 px-3 py-2 rounded-lg border border-slate-600">
              <span className="text-sm md:text-base font-mono truncate text-white">
                {walletAddress.slice(0, 10)}...{walletAddress.slice(-10)}
              </span>
              <button
                onClick={copyToClipboard}
                className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Balance */}
          <div>
            <p className="text-sm text-gray-400">Balance</p>
            <p className="text-2xl font-bold text-green-400">{balance} MCoin</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
