import './App.css';
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer';
import AboutUs from './components/AboutUs/AboutUs';
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import VehicleFleet from './components/VehicleFleet/VehicleFleet';
import Blogs from './components/Blogs/Blogs';
import Shop from './components/Shop/Shop';
import CarDetail from './components/CarDetail/CarDetail';
import BlogDetails from './components/blogDetails/BlogDetails';
import Basket from './components/Basket/Basket';
import Chat from './components/Chat/Chat';
import Profile from "./components/myProfile/Profile";
import FilterPage from "./components/CarFilterPage/FilterPage";


function App() {


  return (
    <>
      <ChakraProvider>

        <Router>

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/AboutUs' element={<AboutUs />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/VehicleFleet' element={<VehicleFleet />} />
            <Route path='/Blogs' element={<Blogs />} />
            <Route path='/Shop' element={<Shop />} />
            <Route path='/CarDetail/:id' element={<CarDetail />} />
            <Route path='/BlogDetails/:id' element={<BlogDetails />} />
            <Route path='/Basket' element={<Basket />} />
            <Route path='/Chat' element={<Chat />} />
            <Route path='/Profile' element={<Profile />} />
            <Route path='/FilterPage/:car/:model' element={<FilterPage />} />
          </Routes>

          <Footer />
        </Router>

      </ChakraProvider>
    </>
  );
}

export default App;
