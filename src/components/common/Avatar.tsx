/** @format */

import React, { useState } from "react";
import Cookies from "js-cookie";

interface AvatarProps {
  src?: string; // URL for the avatar image
  alt?: string; // Alt text for the image
  size?: number; // Size of the avatar (width and height)
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "User Avatar",
  size = 40,
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const username = Cookies.get("username") || "User";

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  const handleLogout = () => {
    // Remove the token from cookies
    Cookies.remove("isLoggedIn");
    Cookies.remove("accessToken");
    Cookies.remove("walletAddress");
    Cookies.remove("username");
    Cookies.remove("publicKey");
    Cookies.remove("privateKey");

    console.log("Token cleared, user logged out.");
    window.location.href = "/";
  };

 const initials = username
   ? username.trim().substring(0, 2).toUpperCase()
   : "U";

 return (
   <div className="relative flex items-center">
     <div className="flex items-center cursor-pointer" onClick={toggleMenu}>
       <div
         className="flex items-center justify-center rounded-full border border-gray-300 bg-gray-200 text-gray-700 font-semibold"
         style={{ width: size, height: size }}
       >
         <span className="text-sm">{initials}</span>
       </div>
       <div className="flex flex-col ml-2">
         <span className="text-[16px] font-medium">{username}</span>
         <span className="text-sm font-medium text-gray-500">User</span>
       </div>
     </div>

     {isMenuVisible && (
       <div className="absolute top-full right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-lg border border-gray-200 z-10">
         <ul className="py-2">
           <li
             className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
             onClick={handleLogout}
           >
             Logout
           </li>
         </ul>
       </div>
     )}
   </div>
 );
};

export default Avatar;
