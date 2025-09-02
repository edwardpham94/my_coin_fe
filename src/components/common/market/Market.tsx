/** @format */

"use client";

import React, { useEffect, useState } from "react";
import PageButtons from "../PageButtons";
import ResourceLoader from "../../../lib/ResourceLoader";
import CoinsMarket from "./CoinsMarket";
import ExchangesMarket from "./ExchangesMarket";
import CategoriesMarket from "./CategoriesMarket";
import Link from "next/link";
import axios from "axios";
import axiosInstance from "@/apis/axiosInstance";
import TransactionsMarket from "./TransactionsMarket";
import BlocksMarket from "./BlocksMarket";

interface MarketProps {
  isHomePage: boolean;
}

export default function Market({ isHomePage }: MarketProps) {
  const [currentMarketSelection, setCurrentMarketSelection] =
    useState("cryptocurrencies");
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(10);
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    const fetchData = async (page: number) => {
      try {
        if (currentMarketSelection === "cryptocurrencies") {
          const data = await axiosInstance.get(
            `/transactions?page=${page - 1}&size=20`
          );
          console.log(data?.data?.totalPages);
          setTransactions(data?.data?.content);
          setTotalPages(data?.data?.totalPages);
        } else if (currentMarketSelection === "exchanges") {
          const data = await axiosInstance.get(
            `/blocks?page=${page - 1}&size=20`
          );
          console.log(data?.data);
          setBlocks(data?.data?.content);
          setTotalPages(data?.data?.totalPages);
        } else if (currentMarketSelection === "categories") {
          const data = await ResourceLoader(
            `https://api.coingecko.com/api/v3/coins/categories?vs_currency=usd&order=market_cap_desc`
          );
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to fetch market data", error);
      }
    };

    fetchData(selectedPage);
  }, [selectedPage, currentMarketSelection, isHomePage]);

  useEffect(() => {
    setSelectedPage(1);
  }, [currentMarketSelection]);

  const updatecurrentMarketSelection = (selection: string) => {
    setCurrentMarketSelection(selection.toLowerCase());
  };

  const content = (
    <>
      {currentMarketSelection === "cryptocurrencies" ? (
        <>
          <TransactionsMarket
            transactions={transactions}
            selectedPage={selectedPage}
            pageItemCount={isHomePage ? 10 : 100}
            isHomePage={isHomePage}
          />
        </>
      ) : null}

      {currentMarketSelection === "exchanges" ? (
        <>
          <BlocksMarket
            blocks={blocks}
            selectedPage={selectedPage}
            pageItemCount={isHomePage ? 10 : 100}
            isHomePage={isHomePage}
          />
        </>
      ) : null}

      {currentMarketSelection === "categories" ? (
        <>
          <CategoriesMarket
            categories={categories}
            selectedPage={selectedPage}
            pageItemCount={isHomePage ? 10 : 100}
            isHomePage={isHomePage}
          />
        </>
      ) : null}
    </>
  );

  return (
    <section
      id="market"
      className={`relative pt-16 pb-16 pl-4 pr-4 bg-primary z-40 w-full ${
        isHomePage ? "shadow-marketShadow" : null
      }`}
    >
      <div
        className={`mx-auto gap-16 ${
          isHomePage ? "max-w-7xl" : "max-w-[1920px]"
        } max-w-7xl flex flex-col`}
      >
        {isHomePage ? (
          <>
            <h1 className="font-bold text-4xl md:text-5xl leading-tight text-center">
              Market Update
            </h1>
          </>
        ) : null}
        <div
          id="market-btns"
          className="flex pageItemCount-center justify-center gap-6 md:gap-12 text-secondary"
        >
          <button
            onClick={(e) => updatecurrentMarketSelection("Cryptocurrencies")}
            className="relative"
          >
            Transactions
            <div
              className={`absolute bottom-0 top-[34px] left-0 w-full h-1 bg-accent ${
                currentMarketSelection === "cryptocurrencies"
                  ? "opacity-100"
                  : "opacity-0"
              } transition-opacity duration-100`}
            ></div>
          </button>

          <button
            onClick={(e) => updatecurrentMarketSelection("Exchanges")}
            className="relative"
          >
            Blocks
            <div
              className={`absolute bottom-0 top-[34px] left-0 w-full h-1 bg-accent ${
                currentMarketSelection === "exchanges"
                  ? "opacity-100"
                  : "opacity-0"
              } transition-opacity duration-100`}
            ></div>
          </button>

          <button
            onClick={(e) =>
              updatecurrentMarketSelection(e.currentTarget.innerText)
            }
            className="relative"
          >
            Categories
            <div
              className={`absolute bottom-0 top-[34px] left-0 w-full h-1 bg-accent ${
                currentMarketSelection === "categories"
                  ? "opacity-100"
                  : "opacity-0"
              } transition-opacity duration-100`}
            ></div>
          </button>
        </div>

        <div id="crypto-list" className="flex flex-col gap-4 w-full">
          {content}
        </div>

        {isHomePage ? (
          <>
            <Link
              href="/cryptocurrencies"
              className="primary-btn font-bold pl-6 pr-6 pt-4 pb-4 rounded-full self-center"
            >
              See More
            </Link>
          </>
        ) : (
          <PageButtons
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            totalPages={totalPages}
            isHomePage={isHomePage}
          />
        )}
      </div>
    </section>
  );
}
