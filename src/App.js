import './App.css';
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer';
import AboutUs from './components/AboutUs/AboutUs';

function App() {


  return (
    <>
      <ChakraProvider>

        <Router>

          
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/AboutUs' element={<AboutUs/>} />
          </Routes>

          <Footer />
        </Router>

      </ChakraProvider>
    </>
  );
}

export default App;
