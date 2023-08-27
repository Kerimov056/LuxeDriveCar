import React from 'react'
import './carcomment.scss'
import { BiLike } from "react-icons/bi";

const CarComment = () => {
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
                            <p>Massa placerat duis ultricies lacus. Volutpat blandit aliquam etiam er velite.</p>
                        </div>
                        <div className='LikeButton'>
                            <button><BiLike /></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CarComment