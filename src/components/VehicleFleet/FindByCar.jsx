import React from 'react'
import './FindCar.scss'
import { getByCar } from "../Services/carServices";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";



const FindByCar = () => {

    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: byCars } = useQuery(["Car", id], () =>
        getByCar(id)
    );

    // if (byCars) {

    return (
        <>
            <div className='FindBYCar'>
                <div>
                    <div className='FindBYCar_Image'>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrtJ-Lr6wgcg8N5OBFhXqW_Sjw0GvWU8B_OQ&usqp=CAU' />
                    </div>
                    <div className='FindBYCar_Info'>
                        <h2>Marka<span>BMW</span></h2>
                        <h2>Model<span>e46</span></h2>
                        <h2>Year<span>2003</span></h2>
                        <h2>Price<span>14000</span></h2>
                    </div>
                </div>
            </div>
        </>
    );
    // }
}

export default FindByCar