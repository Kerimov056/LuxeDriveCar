import React from 'react';
import './strutur.scss'
import RecentPost from './RecentPost';
import BlogPost from '../Blogs/BlogPost';
import ShopCarCard from '../Shop/ShopCarCard';
import { getCarImage, } from "../Services/shopCarardServices";
import { useParams } from 'react-router-dom';
import { getCarAll } from "../Services/carServices";
import { getBlog, getByBlog } from "../Services/blogServices";
import { useQuery } from "react-query";


const Strutur = (props) => {

    const { id } = useParams();

    const { data: byCars } = useQuery(["Blogs", id], () =>
        getByBlog(id)
    );

    const { data: cars } = useQuery({
        queryKey: ["Cars"],
        queryFn: getCarAll,
        staleTime: 0,
    });

    const { data: CarImages } = useQuery({
        queryKey: ["Faqs"],
        queryFn: getCarImage,
        staleTime: 0,
    });

    const { data: blogs } = useQuery({
        queryKey: ["Blogs"],
        queryFn: getBlog,
        staleTime: 0,
    });


    return (
        <>
            <div id='Strutur'>
                <div className='Respppnnn'>
                    <div className='LeftBar'>
                        {
                            props.details === true ?
                                <div className='blogDetails'>
                                    <div className='blogDetails_1'>
                                        <p>
                                            <h1>{byCars?.data?.title}</h1>
                                            <h3>JAN 8. 2022. DRIVELUXURY</h3>
                                        </p>
                                        <div>
                                            <img style={{ objectFit: 'cover' }} src={`data:image/jpeg;base64,${byCars?.data?.blogImages[0]?.imagePath}`} />
                                        </div>
                                    </div>

                                    <div className='blogDetails_2'>
                                        <div>
                                            {byCars?.data?.description?.slice(0, 360)} <br /><br />
                                            {byCars?.data?.description?.slice(361, 500)}
                                        </div>
                                        <div className='ortaq'>
                                            <div>{byCars?.data?.description?.slice(501, 700)}</div>
                                        </div>
                                        <div>{byCars?.data?.description?.slice(701, 900)}</div>
                                        <div style={byCars?.data?.blogImages[1]?.imagePath ? {} : { display: "none" }} className='endimg'>
                                            <img style={byCars?.data?.blogImages[1]?.imagePath ? { objectFit: 'cover' } : { display: "none" }} src={`data:image/jpeg;base64,${byCars?.data?.blogImages[1]?.imagePath}`} />
                                        </div>
                                        <div style={byCars?.data?.blogImages[2]?.imagePath ? {} : { display: "none" }} className='endimg'>
                                            <img style={byCars?.data?.blogImages[2]?.imagePath ? { objectFit: 'cover' } : { display: "none" }} src={`data:image/jpeg;base64,${byCars?.data?.blogImages[2]?.imagePath}`} />
                                        </div>
                                        <div>{byCars?.data?.description?.slice(901)}</div>
                                    </div>


                                </div>

                                :

                                props.blog === true ?
                                    <div id='responSive'>
                                        {blogs?.data.map((byBlogs, index) => (
                                            <BlogPost key={index} Id={byBlogs?.id} title={byBlogs?.title} date={"Jan 8.   2022./   DRIVE, LUXURY"} img={`data:image/jpeg;base64,${byBlogs?.blogImages[0]?.imagePath}`} desc={byBlogs?.description} />
                                        ))}
                                    </div> :
                                    <div className='Shoppp'>
                                        {cars?.data?.map((car, index) => (
                                            <ShopCarCard key={index} Id={car?.id} img={`data:image/jpeg;base64, ${car?.carImages[0]?.imagePath}`} />
                                        ))}
                                    </div>
                        }
                    </div>


                    <div className='RightBar'>


                        <div className='Posts'>
                            <h1>Recent Post</h1>
                            {
                                props.blog === true ?
                                    <div>
                                        {blogs?.data.slice(-3).map((byBlogs, index) => (
                                            <RecentPost key={index} style={200} img={`data:image/jpeg;base64,${byBlogs?.blogImages[0].imagePath}`} Id={byBlogs.id} title={byBlogs.title} />
                                        ))}
                                    </div> :
                                    <div>
                                        {CarImages?.data.slice(-3).map((carImages, index) => (
                                            <RecentPost key={index} Id={carImages?.carId} style={200} img={`data:image/jpeg;base64, ${carImages?.imagePath}`} />
                                        ))}
                                    </div>
                            }
                        </div>


                        <div className='Catagories'>
                            <h1>Catagories</h1> <br />
                            <span>Lux</span>
                            <span>Business</span>
                            <span>Minivan</span>
                            <span>Premium</span>
                        </div>

                        <div className='ReklamImg'>
                            <img src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/b-s-s-img-1.jpg' />
                        </div>

                        <div className='tags'>
                            <h1>Tags</h1>
                            <div>
                                <button>Salam</button>
                                <button>Brat</button>
                                <button>Encesen</button>
                                <button>Eeded</button>
                                <button>Ders</button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
}

export default Strutur;
