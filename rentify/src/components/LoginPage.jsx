import axios from "axios";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const { setuser } = useContext(UserContext);
  async function login(event){
    event.preventDefault()
    try{
       const res = await axios.post('login',{email,password});
      const data = res.data;
      // console.log(data);
      setuser(data);
      alert("Login Successfull");
      setRedirect(true);
    }catch(e){
      alert("Incorrect email or passowrd");
      console.log(e);
    }
  }

  if(redirect){
    return <Navigate to={'/'}/>;
  }
  return (
   <>
   <div className="mt-10 grow flex items-center justify-around">
    <div className="mb-64">
    <h1 className="text-4xl text-center mb-5 font-bold text-primary">Login</h1>
    <form className="max-w-md mx-auto " onSubmit={login}>
      <input type="email" 
      placeholder="your@email.com"
      value={email}
      onChange={ev => setEmail(ev.target.value)} />
      <input type="password"
      placeholder="password"
      value={password}
      onChange={ev => setPassword(ev.target.value)} />
      <button className="w-full bg-primary rounded-full text-xl text-white mt-2 p-2">Login</button>
    </form>
    </div>
   </div>
   </>
  )
}
