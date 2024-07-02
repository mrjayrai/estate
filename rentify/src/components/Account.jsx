/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AllBooking from "./AllBooking";

export default function Account() {
    const [redirect,setRedirect] = useState(false); 
    const {ready,user,setuser} = useContext(UserContext);
    let {subpage} = useParams();

    if(subpage === undefined){
        subpage = 'profile';
    }

    async function logout(){
      await axios.post('logout');
      setRedirect(true);
      setuser(null);
    }
    if(redirect){
      return <Navigate to={'/'}/>;
    }
    if(!ready){
        return "Loading .....";
    }
    if(ready && !user){
        return <Navigate to={'/'}/>
    }

    

    function linkcls(type=null){
        let cls = 'inline-flex py-2 px-6 rounded-full gap-2 ';
        if(type === subpage){
            cls +='bg-primary text-white  font-bold';
        }else{
          cls += 'bg-gray-200';
        }
        return cls;
    }
  return (
    <div>
      <nav className="w-full flex gap-4 mt-8 justify-center mb-8">
      <Link className =   {linkcls('profile')} to={'/account'}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
      My Account</Link>
        <Link className = {linkcls('bookings')} to={'/account/bookings'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
</svg>
        My Bookings</Link>
        <Link className = {linkcls('places')} to={'/account/places'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
</svg>
        My Accomodation</Link>
      </nav>
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br/>
          <button onClick={logout} className="w-full bg-primary rounded-full text-xl text-white mt-2 p-2 max-w-sm ">Log Out</button>
        </div>
      )}

      {subpage === 'bookings' && (
        <>
        <AllBooking/>
        </>
      )}

{subpage === 'places' && (
        <PlacesPage/>
      )}
    </div>
  )
}
