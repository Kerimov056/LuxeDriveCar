import React from 'react';
import './RecentPost.scss'
import { Link } from 'react-router-dom';

const RecentPost = (props) => {


    return (
        <>
        <Link to={`/CarDetail/${props.Id}`}>
            <div id='RecentPost'>
                <div style={{width:`${props.style}px`}} className='PostImg'>
                    <img style={{objectFit:"cover"}} src={props.img} />
                </div>
                <div className='PostText'>
                    <h3>{props.name} {props.category}</h3>
                    <h4>{props.date}</h4>
                </div>
            </div>
        </Link>
        </>
    );
}

export default RecentPost;
