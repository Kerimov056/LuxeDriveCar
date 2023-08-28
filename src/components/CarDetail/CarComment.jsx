import React from 'react'
import './carcomment.scss'
import { BiLike } from "react-icons/bi";
// import { postLike } from "../Services/likeService";

const CarComment = (props) => {
    return (
        <>
            <div className='CarComment'>
                <div>
                    <div className='CommentPerson'>
                        <img src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/user-img-1.png' />
                    </div>
                    <div className='Commenttext'>
                        <div>
                            <h3>Leyla Dauge</h3>
                            <p>{props.comment}</p>
                        </div>
                        <div className='LikeButton'>
                            <button><span>{props.likeSum<1 ?"" : props.likeSum}</span><BiLike /></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CarComment