import React from 'react'
import './carcomment.scss'
import { BiLike } from "react-icons/bi";
import { postLike } from "../Services/likeService";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";

const CarComment = (props) => {

    const { token, username, appuserid } = useSelector((x) => x.authReducer);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();


    // const mutation = useMutation(postLike, {
    //     onSuccess: () => {
    //         queryClient.invalidateQueries("Likes");
    //         queryClient.invalidateQueries("Comments");
    //     },
    // });

    const { mutate } = useMutation(() => postLike(props.commentId, appuserid), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['Likes']);
            queryClient.invalidateQueries(['Car']);
        },
        onError: (error) => {
        }
    });

   
    const likeCreate = async () => {
        mutate({ carCommentId: props.Id, AppUserId: appuserid });
    }

    return (
        <>
            <div className='CarComment'>
                <div>
                    <div className='CommentPerson'>
                        <img src='https://as1.ftcdn.net/v2/jpg/02/01/33/54/1000_F_201335438_CNpY0iWaXXAV95Gj8BPB0tEJlMcxWeaZ.jpg' />
                    </div>
                    <div className='Commenttext'>
                        <div>
                            <h3>{props.username}</h3>
                            <p>{props.comment}</p>
                            <h3 style={{ display: "none" }}>{props.commentId}</h3>
                        </div>
                        <div className='LikeButton'>
                            <button onClick={likeCreate}><span>{props.likeSum < 1 ? "" : props.likeSum}</span><BiLike /></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CarComment