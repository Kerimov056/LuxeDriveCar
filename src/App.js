import './App.css';
import * as React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
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
import FilterPage from "./components/CarFilterPage/FilterPage";
import MyProfile from "./components/Profile/MyProfile";
import ResetPassword from "./components/Auth/ResetPassword";
import ResertPassword from "./components/Auth/ResertPassword";
import { useDispatch, useSelector } from 'react-redux';
// import StaticMap from "./components/Map/StaticMap"
// import GoogleLoginComponent from "./components/Auth/GoogleLoginComponent ";

function App() {

  const dispatch = useDispatch();
  const { token } = useSelector(x => x.authReducer);

  return (
    <>
      <ChakraProvider>

        <Router>

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/AboutUs' element={<AboutUs />} />
            {token === null &&
              <Route path='/Login' element={<Login />} />
            }
            {token === null &&
              <Route path='/Register' element={<Register />} />
            }
            <Route path='/VehicleFleet' element={<VehicleFleet />} />
            <Route path='/Blogs' element={<Blogs />} />
            <Route path='/Shop' element={<Shop />} />
            <Route path='/CarDetail/:id' element={<CarDetail />} />
            <Route path='/BlogDetails/:id' element={<BlogDetails />} />
            <Route path='/Basket' element={<Basket />} />
            <Route path='/Chat' element={<Chat />} />
            <Route path='/FilterPage/:car/:model' element={<FilterPage />} />
            <Route path='/MyProfile' element={<MyProfile />} />
            <Route path='/ResetPassword' element={<ResetPassword />} />
            <Route path='/ResertPassword/:userId/:resetToken' element={<ResertPassword />} />

          </Routes >

          <Footer />
        </ Router >

      </ChakraProvider >
    </>
  );
}

export default App;

