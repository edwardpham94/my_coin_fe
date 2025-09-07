/** @format */

"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { set } from "zod";
import axiosInstance from "@/apis/axiosInstance";
import TransactionsMarket from "@/components/common/market/TransactionsMarket";
import PageButtons from "@/components/common/PageButtons";
import MyTransactions from "@/components/common/market/MyTransactions";

const Profile = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(10);

  useEffect(() => {
    setUserInfo({
      username: Cookies.get("username") || "Guest",
      email: Cookies.get("username") || "Guest",
    });

    setWalletAddress(Cookies.get("walletAddress") || walletAddress);

    const fetchWalletDetails = async () => {
      try {
        const dataUser = await axiosInstance.get(
          `/wallet/my-wallet?walletAddress=${Cookies.get("walletAddress")}`
        );

        const dataUserTransactions = await axiosInstance.get(
          `/transactions/${Cookies.get("walletAddress")}?page=${
            selectedPage - 1
          }&size=10`
        );

        setTransactions(dataUserTransactions?.data?.content);
        setTotalPages(dataUserTransactions?.data?.totalPages);
        setBalance(dataUser.data.balance);
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

  const content = (
    <>
      <MyTransactions
        transactions={transactions}
        selectedPage={selectedPage}
        pageItemCount={false ? 10 : 100}
        isHomePage={false}
      />
    </>
  );

  return (
    <main className="w-full">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-primary via-primary/90 to-primary/60 px-4">
        {/* Title & Subtitle */}
        <h1 className="font-extrabold text-4xl md:text-5xl leading-tight text-center text-white drop-shadow-lg mb-4">
          User Information
        </h1>

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

        <div className="py-4 text-md">
          <h4 className="font-extrabold text-2xl md:text-3xl leading-tight text-center text-white drop-shadow-lg mb-4">
            {transactions.length > 0
              ? "My transactions"
              : "No transaction found!"}{" "}
          </h4>
        </div>
        {transactions.length > 0 && (
          <>
            <div
              id="crypto-list"
              className="flex flex-col gap-4 w-full py-3 mt-4"
            >
              {content}
            </div>
            <div className="py-5">
              <PageButtons
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                totalPages={totalPages}
                isHomePage={false}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Profile;
