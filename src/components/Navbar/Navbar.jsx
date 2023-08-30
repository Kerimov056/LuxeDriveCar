import { BsSearch } from 'react-icons/bs'
import { AiOutlineCar } from 'react-icons/ai'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './navbarr.scss'
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from '../Redux/Slices/authSlice'
import { Button, Input, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getBasketItemCount } from "../Services/basketServices";
import { MdYoutubeSearchedFor } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import { getNameCar } from "../Services/carServices";


const Navbar = () => {

    const navigate = useNavigate();

    const [marka, setMarka] = useState('');
    const [model, setModel] = useState('');

    const handleMarkaChange = (event) => {
        setMarka(event.target.value);
    };

    const handleModelChange = (event) => {
        setModel(event.target.value);
    };

    const { data: searchResult, isLoading, isError } = useQuery(
        ['searchCar', marka, model],
        () => getNameCar(marka, model),
        {
            enabled: marka !== '' || model !== '',
        }
    );

    const handleSearchClick = () => {
        let url = '/FilterPage';

        if (marka && model) {
            url += `/${marka}${model}`;
        } else if (marka) {
            url += `/${marka}`;
        } else if (model) {
            url += `/${model}`;
        }

        navigate(url);
    };
    const [search, setSearch] = useState(false);
    useEffect(() => {
        AOS.init({
            offset: 130,
            duration: 3500,
            delay: 60,
        });
        AOS.refresh();
    }, [search]);

    const { token, username, appuserid } = useSelector((x) => x.authReducer);
    const dispatch = useDispatch();

    const { data: basketCount } = useQuery({
        queryKey: ["basketsCountT", appuserid],
        queryFn: () => getBasketItemCount(appuserid),
        staleTime: 0,
    });


    return (
        <>
            <nav class="navbar">
                <div data-aos="fade-down" id='SearcParlax' style={search == true ? { display: "block" } : { display: "none" }}>
                    <div className='XButton'>
                        <p></p>
                        <Button backgroundColor={"gray"} onClick={() => setSearch(!search)}>X</Button>
                    </div>
                    <div className='Serachhh'>
                        <div>
                            <div>
                                <Input value={marka} onChange={handleMarkaChange} placeholder='Search for marka...' type='text' /><br />
                                <Input value={model} onChange={handleModelChange} placeholder='Search for model...' type='text' />
                            </div>
                            <button onClick={handleSearchClick} className="buttonSearcCarS">
                                <MdYoutubeSearchedFor />
                            </button>
                        </div>
                    </div>
                </div>
                <div class="navbar-container container" >
                    <input type="checkbox" name="" id="" />
                    <div class="hamburger-lines">
                        <span class="line line1"></span>
                        <span class="line line2"></span>
                        <span class="line line3"></span>
                    </div>
                    <ul style={{ order: 1 }} class="menu-items">
                        <li><a href='/'>LUXEDRIVE</a></li>
                        <li><a href='/'>Home</a></li>
                        <li><a href='/AboutUs'>About Us</a></li>
                        <li><a href='VehicleFleet'>VEHICLE FLEET</a></li>
                        <li><a href='/Blogs'>BLOG</a></li>
                        <li><a href='/Shop'>SHOP</a></li>
                    </ul>
                    <ul style={{ order: 2 }}>
                        <li>
                            <Link to={'/Basket'} className='BasketCar'><AiOutlineCar id='SumCar' /><span className='SumC'>
                                {basketCount && basketCount.data !== 0 ? basketCount.data : ""}</span>
                            </Link>
                        </li>
                    </ul>
                    <Text fontSize={"2xl"}>
                        {username}
                    </Text>
                    <h1 class="logo"><BsSearch onClick={() => setSearch(!search)} /></h1>
                    {!token &&
                        <Link to={'/Login'}><Button backgroundColor={"white"}>LogIn</Button></Link>
                    }
                    {token &&
                        <Link to={'/Login'}><Button onClick={() => dispatch(logoutAction())}>Log out</Button></Link>
                    }
                </div>
            </nav>
        </>
    )
}

export default Navbar