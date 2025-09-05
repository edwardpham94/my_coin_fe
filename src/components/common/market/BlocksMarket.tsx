import Image from "next/image";

interface BlocksMarketProps {
  blocks: Block[];
  selectedPage: number;
  pageItemCount: number;
  isHomePage: boolean;
}

export default function BlocksMarket({
  blocks,
  selectedPage,
  pageItemCount,
}: BlocksMarketProps) {
  return (
    <>
      <div
        className={`grid grid-cols-twoCols md:grid-cols-fiveCols lg:grid-cols-sixCols`}
      >
        <div className="flex place-self-start h-full pr-4 lg:pl-4 lg:pr-4">
          <p className="text-center text-secondary font-bold">#</p>
        </div>
        <div className="flex place-self-start h-full lg:pl-4 lg:pr-4">
          <p className="text-center font-bold">Block Id</p>
        </div>
        <div className="hidden lg:flex place-self-end h-full lg:pl-4 lg:pr-4">
          <p className="text-center font-bold">Nonce</p>
        </div>
        <div className="flex place-self-end h-full lg:pl-4 lg:pr-4">
          <p className="text-center font-bold">Hash</p>
        </div>
        <div className="hidden md:flex place-self-end h-full lg:pl-4 lg:pr-4">
          <p className="text-center font-bold">Previous Hash</p>
        </div>
        <div className="hidden md:flex place-self-end h-full lg:pl-4 lg:pr-4">
          <p className="text-center font-bold">Date time</p>
        </div>
        <div className="hidden md:flex place-self-end h-full lg:pl-4 lg:pr-4">
          <p className="text-center font-bold">Number of transactions</p>
        </div>
      </div>

      {blocks.map((transaction, index) => {
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
                <p className="text-center text-xs lg:text-base text-yellow-500 bg-yellow-200 bg-opacity-10 p-2 rounded-lg font-bold">
                  {transaction.nonce}
                </p>
              </div>

              <div className="place-self-end flex items-center h-full lg:pl-4 lg:pr-4">
                <div className={`flex items-center gap-1`}>
                  <p className="truncate max-w-[200px] overflow-hidden whitespace-nowrap">
                    {transaction.hash}
                  </p>
                </div>
              </div>

              <div className="place-self-end text-sm hidden md:flex lg:text-base items-center h-full lg:pl-4 lg:pr-4">
                <p className="truncate max-w-[200px] overflow-hidden whitespace-nowrap">
                  {transaction.previousHash}
                </p>{" "}
              </div>

              <div className="text-sm lg:text-base place-self-end hidden md:flex items-center h-full lg:pl-4 lg:pr-4">
                <p>{new Date(transaction.timestamp).toLocaleString()}</p>
              </div>

              <div className="place-self-end hidden md:flex items-center h-full lg:pl-4 lg:pr-4 lg:pt-2 lg:pb-2">
                <div
                  className={`flex items-center gap-1 ${
                    transaction.transactions.length === 0
                      ? "text-red-500 bg-red-400 bg-opacity-10 p-2 rounded-lg font-bold"
                      : "text-blue-500 bg-blue-200 bg-opacity-10 p-2 rounded-lg font-bold"
                  }`}
                >
                  <p className="hidden lg:block">
                    {transaction.transactions.length} transactions
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
