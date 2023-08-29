import React from 'react';
import './blogs.scss'
import Strutur from '../BlogShopSturuktur/Strutur';
import Navbar from '../Navbar/Navbar';
import Navbartwo from '../Navbar/Navbartwo';

const Blogs = () => {
    return (
        <>
            <div className='BlogNavbar'>
                <Navbar />
            </div>
            <div className='DisplayNavbar'>
                <Navbartwo />
            </div>

            <div>
                <Strutur details={false} blog={true} />
            </div>
        </>
    );
}

export default Blogs;
