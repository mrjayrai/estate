/* eslint-disable react/no-unknown-property */

import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";


export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <div>
        <header className=" flex justify-between">
          <Link to={'/'} className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-16">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
          </svg>
          <span className="font-extrabold text-3xl ">Rentify</span>
          </Link>
          <div className="flex gap-2 border border-gray-400 rounded-full py-2 px-4 items-center shadow shadow-gray-400 text-xl font-semibold">
            <div>Anywhere</div>
            <div className="border border-l border-gray-600 h-6"></div>
            <div>Anyweek</div>
            <div className="border border-l border-gray-600 h-6"></div>
            <div>Add guest</div>
            <button className="bg-primary text-white p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

            </button>
          </div>
          <div className="flex gap-2 border border-gray-400 rounded-full py-2 px-4 items-center ">
            <button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
</button>
<Link to={user?'/account':'/login'} className="flex items-center gap-1">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
</svg>
{!! user && (
  <div>
    {user.name}
  </div>
)}
</Link>

          </div>
        </header>
      </div>
  )
}
