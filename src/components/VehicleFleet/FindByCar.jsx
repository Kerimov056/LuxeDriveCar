import React from 'react'
import './FindCar.scss'
import { getByCar } from "../Services/carServices";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";



const FindByCar = (props) => {

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
                        <img src={props.img} />
                    </div>
                    <div className='FindBYCar_Info'>
                        <div>
                            <h2>Marka: <span>{props.marka}</span></h2>
                            <h2>Model: <span>{props.model}</span></h2>
                            <h2>Year: <span>{props.year}</span></h2>
                            <h2>Price: <span style={props.campaignsPrice===null ? {display:"none"} : {}}>${props.campaignsPrice}/Day</span>   <span style={props.campaignsPrice!==null ? {textDecoration:"line-through", marginLeft:'190px'} : {}}>${props.price}/Day</span></h2>
                            <button><Link to={`/CarDetail/${props.Id}`} >Show Car {">"}</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    // }
}

export default FindByCar