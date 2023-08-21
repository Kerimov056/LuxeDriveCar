import React from 'react';
import './blogs.scss'
import Strutur from '../BlogShopSturuktur/Strutur';
import Navbar from '../Navbar/Navbar';

const Blogs = () => {
    return (
        <>
            <div className='BlogNavbar'>
                <Navbar />
            </div>
            <div>
                <Strutur details={false} blog={true} />
            </div>
        </>
    );
}

export default Blogs;
