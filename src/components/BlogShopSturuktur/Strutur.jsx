import React from 'react';
import './strutur.scss'
import RecentPost from './RecentPost';

const Strutur = () => {
    return (
        <>
            <div id='Strutur'>
                <div>
                    <div className='LeftBar'></div>
                    <div className='RightBar'>

                        <div className='Search'>
                            <h1>Search Post</h1>
                            <div class="container">
                                <div class="search-container">
                                    <input class="input" type="text" />
                                    <svg viewBox="0 0 24 24" class="search__icon">
                                        <g>
                                            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
                                            </path>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>


                        <div className='Posts'>
                            <h1>Recent Post</h1>
                            <div>
                                <RecentPost />
                                <RecentPost />
                                <RecentPost />
                            </div>
                        </div>


                        <div className='Catagories'>
                            <h1>Catagories</h1>
                            <span>salam</span>
                            <span>Qaqa</span>
                            <span>Necesen</span>
                            <span>Saqol</span>
                            <span>Brat</span>
                        </div>

                        <div className='ReklamImg'>
                            <img src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/b-s-s-img-1.jpg' />
                        </div>

                        <div className='tags'>
                            <h1>Tags</h1>
                            <div>
                                <button>Salam</button>
                                <button>Brat</button>
                                <button>Encesen</button>
                                <button>Eeded</button>
                                <button>Ders</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Strutur;
