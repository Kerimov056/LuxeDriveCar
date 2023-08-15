import React from 'react';
import './RecentPost.scss'

const RecentPost = (props) => {
    return (
        <>
            <div id='RecentPost'>
                <div className='PostImg'>
                    <img src={props.img} />
                </div>
                <div className='PostText'>
                    <h3>{props.name}</h3>
                    <h4>{props.date}</h4>
                </div>
            </div>
        </>
    );
}

export default RecentPost;
