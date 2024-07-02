/* eslint-disable react/no-unknown-property */
import { Routes,Route } from "react-router-dom"
import LoginPage from "./components/LoginPage"
import Layout from "./Layout"
import LandingPage from "./components/LandingPage"
import axios from "axios"
import { UserContextProvider } from "./UserContext"
import Account from "./components/Account"
import EditPlace from "./components/EditPlace"
import PropertyPage from "./components/PropertyPage"
import MyBooking from "./components/MyBooking"

axios.defaults.baseURL = 'https://estate-0rer.onrender.com/';
axios.defaults.withCredentials= true;

function App() {

  return (
    <>
    <UserContextProvider>
      <Routes>
        <Route path="/" element = {<Layout/>}>
        <Route index element = {<LandingPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/account/:subpage?" element={<Account/>}/>
        <Route path="/account/:subpage/:action" element={<Account/>}/>
        <Route path="/account/myplaces/:id" element={<EditPlace/>}/>
        <Route path="/place/:id" element={<PropertyPage/>}/>
        <Route path="/mybookings/:id" element={<MyBooking />}/>
        </Route>
      </Routes>
      </UserContextProvider>
    </>
  )
}

export default App
