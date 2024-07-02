/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { useState } from "react"
import { Navigate } from "react-router-dom";


export default function Bookingwidget( { place } ) {
  const [checkIn,setchecin] = useState('');
  const [checkOut,setcheckout] = useState('');
  const [maxGuests,setmaxGuests]= useState(1);
  const [name,setname] = useState('');
  const [number,setnumber] = useState('');
  const [redirect,setredirect] = useState('');
  let noofdays = 0;
  if(checkIn&& checkOut){
    noofdays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function submitbook(){
    // event.preventDefault();
    const bookdata = {checkIn,checkOut,maxGuests,name,phone:number,price:noofdays*place.price,place:place._id};
    if(checkIn===''||checkOut===''||maxGuests===''||name===''||number===''||noofdays*place.price===''||place===''){
      alert("Please Fill all the information");
      return;
    }
    // const { data } =await axios.post('bookings',bookdata);
    setredirect('/');
  }

  if(redirect){
    return <Navigate to={redirect}/>;
  }
  
  return (
    <>
      <div className="bg-white p-4 rounded-3xl shadow">
            <div className="text-2xl text-center">
            Price: {place.price} /per night
            </div>
            <div className="border ">
            <div className="flex justify-around my-2 py-2 text-lg font-semibold text-center">
            <div>
              <label>Check In: </label>
              <input type="date" value={checkIn} onChange={(ev)=>setchecin(ev.target.value)}/>
            </div>
            <div>
              <label>Check Out: </label>
              <input type="date" value={checkOut} onChange={(ev)=>setcheckout(ev.target.value)}/>
            </div>
            </div>
            <div className="flex justify-around my-2 py-2 text-lg font-semibold text-center">
            <div>
              <label>No of Guests: </label>
              <input type="number" value={maxGuests} onChange={(ev)=>setmaxGuests(ev.target.value)}/>
            </div>
            </div>
            <div className="flex justify-around my-2 py-2 text-lg font-semibold text-center gap-2">
            {noofdays>0 && (
              <>
            <div>
              <label>Name: </label>
              <input type="text" value={name} onChange={(ev)=>setname(ev.target.value)}/>
            </div>
            <div>
            <label>Phone Number: </label>
            <input type="tel" value={number} onChange={(ev)=>setnumber(ev.target.value)}/>
          </div>
          </>
            )}
            </div>
            {/* <div className="flex justify-around my-2 py-2 text-lg font-semibold text-center">
            {noofdays>0 && (
            <div>
              <label>Phone Number: </label>
              <input type="tel" value={number} onChange={(ev)=>setnumber(ev.target.value)}/>
            </div>
            )}
            </div> */}
            </div>
            <button onClick={submitbook} className="w-full bg-primary rounded-full text-xl text-white my-4 p-2">Book This Place
              {noofdays && (
                <>
                <span> in &#8377;{noofdays*place.price}</span>
                </>
              )}
            </button>
          </div>
    </>
  )
}
