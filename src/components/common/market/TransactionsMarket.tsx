import Image from "next/image";

interface TransactionsMarketProps {
  transactions: Transaction[];
  selectedPage: number;
  pageItemCount: number;
  isHomePage: boolean;
}

export default function TransactionsMarket({
  transactions,
  selectedPage,
  pageItemCount,
}: TransactionsMarketProps) {
  return (
    <>
      <div
        className={`grid grid-cols-twoCols md:grid-cols-fiveCols lg:grid-cols-sixCols`}
      >
        <div className="flex place-self-start h-full pr-4 lg:pl-4 lg:pr-4">
          <p className="text-center text-secondary font-bold">#</p>
        </div>
        <div className="flex place-self-start h-full lg:pl-4 lg:pr-4">
          <p className="text-center font-bold">Transaction Id</p>
        </div>
        <div className="hidden lg:flex place-self-end h-full lg:pl-4 lg:pr-4">
          <p className="text-center font-bold">Amount</p>
        </div>
        <div className="flex place-self-end h-full lg:pl-4 lg:pr-4">
          <p className="text-center font-bold">From</p>
        </div>
        <div className="hidden md:flex place-self-end h-full lg:pl-4 lg:pr-4">
          <p className="text-center font-bold">To</p>
        </div>
        <div className="hidden md:flex place-self-end h-full lg:pl-4 lg:pr-4">
          <p className="text-center font-bold">Date time</p>
        </div>
        <div className="hidden md:flex place-self-end h-full lg:pl-4 lg:pr-4">
          <p className="text-center font-bold">Status</p>
        </div>
      </div>

      {transactions.map((transaction, index) => {
        const counter = index + 1 + (selectedPage - 1) * pageItemCount;
        return (
          <div key={index} className="hover:bg-gray-900">
            <div
              key={transaction.id}
              className={`grid grid-cols-twoCols md:grid-cols-fiveCols lg:grid-cols-sixCols`}
            >
              <div className="flex place-self-start items-center h-full pr-4 lg:pl-4 lg:pr-4">
                <p className="text-secondary text-sm lg:text-base">{counter}</p>
              </div>

              <div className="place-self-start flex gap-2 lg:gap-6 items-center h-full lg:pl-4 lg:pr-4 lg:pt-2 lg:pb-2">
                <p className="text-center hidden lg:block">
                  {"#" + transaction.id}
                </p>
              </div>

              <div className="hidden lg:flex place-self-end items-center h-full lg:pl-4 lg:pr-4">
                <p className="text-center text-xs lg:text-base text-green-500 bg-green-400 bg-opacity-10 p-2 rounded-lg font-bold">
                  {"$ " + transaction.amount}
                </p>
              </div>

              <div className="place-self-end flex items-center h-full lg:pl-4 lg:pr-4">
                <div className={`flex items-center gap-1`}>
                  <p className="hidden lg:block">{transaction.fromAddress}</p>
                </div>
              </div>

              <div className="place-self-end text-sm hidden md:flex lg:text-base items-center h-full lg:pl-4 lg:pr-4">
                <p>{transaction.toAddress}</p>
              </div>

              <div className="text-sm lg:text-base place-self-end hidden md:flex items-center h-full lg:pl-4 lg:pr-4">
                <p>{new Date(transaction.timestamp).toLocaleString()}</p>
              </div>

              <div className="place-self-end hidden md:flex items-center h-full lg:pl-4 lg:pr-4 lg:pt-2 lg:pb-2">
                <div
                  className={`flex items-center gap-1 ${
                    transaction.status == "PENDING"
                      ? "text-red-500 bg-red-400 bg-opacity-10 p-2 rounded-lg font-bold"
                      : "text-green-500 bg-green-400 bg-opacity-10 p-2 rounded-lg font-bold"
                  }`}
                >
                  <p className="hidden lg:block">{transaction.status}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
