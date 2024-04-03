import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "../Components/Footer"
const OutletRoute = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default OutletRoute
