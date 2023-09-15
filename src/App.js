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
import FindCarQuickly from "./components/FindCarQuickly/FindCarQuickly";
import Communication from "./components/Communication/Communication";
import RentalConditions from "./components/RentalConditions/RentalConditions";
import { useDispatch, useSelector } from 'react-redux';
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import StaticMap from "./components/Map/StaticMap"
// import GoogleLoginComponent from "./components/Auth/GoogleLoginComponent ";

function App() {

  // const stripePromise = loadStripe('pk_test_51NpYaKB2AWkOD0IHgKCsciOitUcBE8xHNqXflRBwSptRVnSvu0HOPY6UmPMohmkCTLJHaF7YiZIoIuZvkEoXGJ1P00j8HH04jb');
  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret: 'sk_test_51NpYaKB2AWkOD0IHNUV1wExXiWjVKZSAnoB1RhMQsxsCRVHGoIJbkJWKZchha7qlAFMFmxz84LvSZh1f7o10XmvO00LskDay4k',
  // };

  const dispatch = useDispatch();
  const { token } = useSelector(x => x.authReducer);

  return (
    <>
      <ChakraProvider>
        {/* <Elements stripe={stripePromise} options={options}> */}

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
            <Route path='/FilterPage/:car/:model' element={<FilterPage />} />
            <Route path='/MyProfile' element={<MyProfile />} />
            <Route path='/ResetPassword' element={<ResetPassword />} />
            <Route path='/Communication' element={<Communication />} />
            <Route path='/RentalConditions' element={<RentalConditions />} />
            <Route path='/FindCarQuickly/:city' element={<FindCarQuickly />} />
            <Route path='/ResertPassword/:userId/:resetToken' element={<ResertPassword />} />
          </Routes >
          <Footer />
        </ Router >
        {/* </Elements> */}
      </ChakraProvider >
    </>
  );
}

export default App;

