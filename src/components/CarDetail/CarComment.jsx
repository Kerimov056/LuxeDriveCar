import React from 'react'
import './carcomment.scss'
import { BiLike } from "react-icons/bi";
import { postLike } from "../Services/likeService";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useQuery, useMutation, useQueryClient } from "react-query";

const CarComment = (props) => {

    const { token, username, appuserid } = useSelector((x) => x.authReducer);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();


    const mutation = useMutation(postLike, {
        onSuccess: () => {
            queryClient.invalidateQueries("Likes");
            queryClient.invalidateQueries("Comments");
        },
    });

    const formik = useFormik({
        initialValues: {
            CarCommentId: "037fd0b1-cd14-4a2e-3731-08dba71c16d6",
            AppUserId: appuserid,
        },
        onSubmit: async (values) => {
            try {
                mutation.mutateAsync(values);
            } catch (error) {
                console.log(error);
            }
        },
    });

    const likeCreate = async () => {
        await formik.handleSubmit(); // Beğeni gönderimi için formik işlemini çağır
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
                            <h3>Leyla Dauge</h3>
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