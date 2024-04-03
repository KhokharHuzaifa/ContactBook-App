import './App.css'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import OutletRoute from './Components/OutletRoute';
import About from './Pages/About';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import ErrorPage from './Pages/ErrorPage';
import Records from './Pages/Records';
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<OutletRoute />}>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/records' element={<Records />} />
        <Route path='*' element={<ErrorPage />} />
      </Route>
    )
  )
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
