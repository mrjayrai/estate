import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import api from "./apilink.mjs";
import Bookingwidget from "../widgets/Bookingwidget";

export default function PropertyPage() {
    const { id } = useParams();
    const [place,setplace] = useState(null);
    const [showallphotos,setshowallphotos] = useState(false);

    useEffect(()=>{
        if(!id){
            return;
        }
        // console.log("hi"+id);
        axios.get(`places/${id}`).then(response => {
            setplace(response.data);
        })
    },[id]);

    if(showallphotos){
      return (
        <div className="absolute inset-0 bg-black text-white ">
          <div className=" bg-black p-8 grid gap-4">
            <div>
              <h2 className="text-3xl mb-2">Photos of {place.title}</h2>
              <button onClick={() => setshowallphotos(false)} className="fixed right-12 top-8 shadow shadow-gray-400 flex gap-2 items-center text-md py-2 px-4 rounded-2xl bg-gray-300 bg-opacity-55">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
                Close Photos
              </button>
            </div>
            {place.photos?.length > 0 && place.photos.map(photo => (
              <div key={photo}>
                <img src={api + photo} alt="" />
              </div>
            ))}
          </div>
        </div>
      );      
    }

  return (
   <>
   {place && (
   <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
    <h1 className="text-3xl font-bold">{place.title}</h1>
    <a href={"https://www.google.com/maps/place/"+place.address} target="_blank" className="flex font-semibold underline my-2  items-center gap-1">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
  <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
</svg>
    {place.address}</a>
    <div className="relative">
    <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden cursor-pointer">
      <div>
        {place.photos?.[0] &&(
          <div>
          <img onClick={()=> setshowallphotos(true)} className="aspect-square object-cover" src={api+place.photos[0]}/>
          </div>
        )}
      </div>
      <div className="grid">
      {place.photos?.[1] &&(
          <img onClick={()=> setshowallphotos(true)} className="aspect-square object-cover" src={api+place.photos[1]}/>
        )}
        <div className="overflow-hidden">
        {place.photos?.[2] &&(
          <img onClick={()=> setshowallphotos(true)} className="aspect-square object-cover relative top-2" src={api+place.photos[2]}/>
        )}
        </div>
      </div>
    </div>
    <button onClick={()=> setshowallphotos(true)} className="absolute bottom-2 right-2 py-2 px-4 bg-white  rounded-2xl text-sm font-semibold shadow shadow-gray-500 flex items-center gap-1 ">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
  <path fillRule="evenodd" d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clipRule="evenodd" />
</svg>
Show more photos</button>
    </div>
    <div className="my-4">
      <h2 className="text-3xl font-semibold mb-2 ">Description</h2>
      {place.description}
      </div>
      <div className="grid grid-cols-2 mt-10 mb-4">
        <div className="gap-1">
           <p>Check-In:</p> {place.checkIn}<br/>
           <p>Check-Out:</p>{place.checkOut} <br/>
           <p>Max-Guest:</p> {place.maxGuests}<br/>
          </div>
        <div>
          <Bookingwidget place={place}/>
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 pb-8 pt-4">
      <p className="mt-1 text-2xl">Extra Info:</p><div className="text-md text-gray-700 leading-4 mt-2">{place.extraInfo}</div>
      </div>
   </div>
    )}
   </>
  )
}
