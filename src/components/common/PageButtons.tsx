import React from 'react';

interface PageButtonsProps {
	selectedPage: number;
	setSelectedPage: (page: number) => void;
	totalPages: number;
	isHomePage: boolean;
}

export default function PageButtons({
	selectedPage,
	setSelectedPage,
	totalPages,
	isHomePage,
}: PageButtonsProps) {
  const handlePageClick = (page: number) => {
    setSelectedPage(page);
  };

  if (totalPages > 5 && isHomePage) totalPages = 5;

  // Define the range of page numbers to display
  const getPageNumbers = () => {
    const maxVisiblePages = 5; // Number of visible page buttons
    const pageNumbers: (number | string)[] = [];

    // Always show the first page
    pageNumbers.push(1);

    // Add ellipsis if the selected page is far from the first page
    if (selectedPage > 3) {
      pageNumbers.push("...");
    }

    // Add the middle pages around the selected page
    const startPage = Math.max(2, selectedPage - 1);
    const endPage = Math.min(totalPages - 1, selectedPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis if the selected page is far from the last page
    if (selectedPage < totalPages - 2) {
      pageNumbers.push("...");
    }

    // Always show the last page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

 return (
   <div
     id="market-page-numbers"
     className="flex flex-row justify-center items-center gap-2"
   >
     {/* Previous Button */}
     <button
       className={`font-bold rounded-full ${
         selectedPage === 1
           ? "bg-gray-300 text-gray-500 cursor-not-allowed"
           : "bg-white hover:bg-gray-200 active:bg-gray-300 text-black"
       } pt-2 pb-2 pr-4 pl-4`}
       onClick={() => selectedPage > 1 && handlePageClick(selectedPage - 1)}
       disabled={selectedPage === 1}
     >
       Previous
     </button>

     {/* Page Numbers */}
     {pageNumbers.map((pageNumber, index) => (
       <button
         key={index}
         className={`font-bold rounded-full ${
           selectedPage === pageNumber
             ? "primary-btn text-white"
             : "bg-white hover:bg-gray-200 active:bg-gray-300 text-black"
         } pt-2 pb-2 pr-4 pl-4`}
         onClick={() =>
           typeof pageNumber === "number" && handlePageClick(pageNumber)
         }
         disabled={typeof pageNumber !== "number"}
       >
         {pageNumber}
       </button>
     ))}

     {/* Next Button */}
     <button
       className={`font-bold rounded-full ${
         selectedPage === totalPages
           ? "bg-gray-300 text-gray-500 cursor-not-allowed"
           : "bg-white hover:bg-gray-200 active:bg-gray-300 text-black"
       } pt-2 pb-2 pr-4 pl-4`}
       onClick={() =>
         selectedPage < totalPages && handlePageClick(selectedPage + 1)
       }
       disabled={selectedPage === totalPages}
     >
       Next
     </button>
   </div>
 );
}
