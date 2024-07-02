/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Perks from "./Perks";
import UploadPhoto from "./UploadPhoto";
import axios from "axios";
import api from "./apilink.mjs";
import Account from "./Account";


export default function EditPlace() {
    const {id} = useParams();
    const [title,settitle] = useState('');
    const [address,setaddress] = useState('');
    const [addedphotos,setaddedphotos] = useState([]);
    
    const [desc,setdesc] = useState('');
    const [perks,setperks] = useState([]);
    const [extrainf,setextrainf] = useState('');
    const [checkin,setcheckin]= useState('');
    const[checkout,setcheckout] = useState('');
    const[max_guest,setmax_guest]= useState(1);
    const [redirect,setredirect] = useState('');
    const [price,setprice] = useState(0);
    const [places,setplaces]=useState([]);
    // console.log(action);
    useEffect(()=>{
        if(!id){
            return;
        }

          axios.get('places/'+id).then(response =>{
            const { data } = response;
            settitle(data.title);
            setaddress(data.address);
            setextrainf(data.extraInfo);
            setcheckin(data.checkIn);
            setcheckout(data.checkOut);
            setmax_guest(data.maxGuests);
            setperks(data.perks);
            setaddedphotos(data.photos);
            setdesc(data.description);
            setprice(data.price);
          });
    },[id]);

   async function uploadplace(ev){
        ev.preventDefault();
        const placeData = {
            title, address, addedphotos,
            desc, perks, extrainf,
            checkin, checkout, max_guest, price
          };
        await axios.put('places/edit/'+id,placeData);
        setredirect('/account');
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }

    

  return (
   <>
   <div>
    {id !== 'new' && (
        <>
<div className="mt-8">
            <form onSubmit={uploadplace}>
                <h2 className=" mt-4">Title</h2>
                <p className="text-gray-500 text-sm">Title of your place</p>
                <input type="text" placeholder="tilte of your place like ... My Lovely Paradise" value={title} onChange={ev => settitle(ev.target.value)}/>
                <h2 className=" mt-4">Address</h2>
                <p className="text-gray-500 text-sm">Address of your place</p>
                <input type="text" placeholder="Address of your place like ... ST Martin Road" value={address} onChange={ev => setaddress(ev.target.value)}/>
                <h2 className=" mt-4">Photos</h2>
                <p className="text-gray-500 text-sm">Photos of your place</p>
                <UploadPhoto addedphotos={addedphotos} onChange={setaddedphotos}/>
                <h2 className=" mt-4">Description</h2>
                <p>Description of your place</p>
                <textarea className="rounded-xl" value={desc} onChange={ev => setdesc(ev.target.value)}></textarea>
                <h2 className=" mt-4">Perks</h2>
                <p>Select All the perks of your place</p>
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4 lg:gird-cols-6 mt-5">
                    <Perks selected={perks} onChange={setperks}/>
                </div>
                <h2 className=" mt-4">Extra Info</h2>
                <p>Any other Specifications?</p>
                <textarea className="rounded-xl" value={extrainf} onChange={ev => setextrainf(ev.target.value)}></textarea>
                <h2 className=" mt-4">Check In time & check out time</h2>
                <p>Kindky specify with room cleaning and etc</p>
                <div className="grid gap-2 grid-col-2 md:grid-cols-4">
                <div>
                    <h3 className="mt-2 -mb-1">Check In Time</h3>
                    <input type="text" placeholder="14:00" value={checkin} onChange={ev => setcheckin(ev.target.value)} />
                </div>
                <div>
                <h3 className="mt-2 -mb-1">Check Out Time</h3>
                <input type="text" placeholder="11:00" value={checkout} onChange={ev => setcheckout(ev.target.value)}/>
                </div>
                <div>
                <h3 className="mt-2 -mb-1">Max Guests</h3>
                <input type="number" value={max_guest} onChange={ev => setmax_guest(ev.target.value)}/>
                </div>
                <div>
                <h3 className="mt-2 -mb-1">Price per night</h3>
                <input type="number" value={price} onChange={ev => setprice(ev.target.value)}/>
                </div>
                </div>
                <div>
                    <button className="w-full bg-primary rounded-full text-xl text-white my-4 p-2">Save</button>
                </div>
            </form>
        </div>
    </>
    )}
    
    {/* {action ==='new'&& (
        
    )} */}
   </div>
   </>
  )
}
