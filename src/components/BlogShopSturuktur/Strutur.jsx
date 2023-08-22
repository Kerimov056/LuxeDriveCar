import React from 'react';
import './strutur.scss'
import RecentPost from './RecentPost';
import BlogPost from '../Blogs/BlogPost';
import ShopCarCard from '../Shop/ShopCarCard';
import { getCarImage } from "../Services/shopCarardServices";
import { useNavigate, useParams } from 'react-router-dom';
import { getCategorie } from "../Services/categorieServices";
import { getCar } from "../Services/carServices";
import { getBlog, getByBlog } from "../Services/blogServices";
import { useQuery, useQueryClient } from "react-query";


const Strutur = (props) => {

    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: byCars } = useQuery(["Blogs", id], () =>
        getByBlog(id)
    );

    const { data: cars } = useQuery({
        queryKey: ["Cars"],
        queryFn: getCar,
        staleTime: 0,
    });

    const { data: categorie } = useQuery({
        queryKey: ["Categorie"],
        queryFn: getCategorie,
        staleTime: 0,
    });


    const { data:Faqs } = useQuery({
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
                <div>
                    <div className='LeftBar'>
                        {
                            props.details === true ?
                                <div className='blogDetails'>
                                    <div className='blogDetails_1'>
                                        <p>
                                            <h1>{byCars.data.title}</h1>
                                            <h3>JAN 8. 2022. DRIVELUXURY</h3>
                                        </p>
                                        <div>
                                            <img src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/b-l-img-1.jpg' />
                                        </div>
                                    </div>

                                     <div className='blogDetails_2'>
                                        <div>
                                            {byCars.data.description.slice(0, 9)} <br /><br />
                                            {byCars.data.description.slice(9, 23)}
                                        </div>
                                        <div className='ortaq'>
                                            <div>{byCars.data.description.slice(23, 27)}</div>
                                        </div>
                                        <div>{byCars.data.description.slice(27, 32)}</div>
                                        <div className='endimg'>
                                            <img src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/b-s-img-2.jpg' />
                                        </div>
                                        <div>{byCars.data.description.slice(32)}</div>
                                    </div> 

                                    {blogs?.data.slice(-1).map((byBlogs, index) => (
                                        <BlogPost Id={byBlogs.id} title={byBlogs.title} date={"Jan 8.   2022./   DRIVE, LUXURY"} img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/b-l-img-1.jpg"} desc={byBlogs.description} />
                                    ))}
                                </div> 

                                            :

                                props.blog === true ?
                                    <div>
                                        {blogs?.data.map((byBlogs, index) => (
                                            <BlogPost Id={byBlogs.id} title={byBlogs.title} date={"Jan 8.   2022./   DRIVE, LUXURY"} img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/b-l-img-1.jpg"} desc={byBlogs.description} />
                                        ))}
                                    </div> :
                                    <div className='Shoppp'>
                                        {Faqs?.data.map((carImages, index) => (
                                            <ShopCarCard Id={carImages?.carId} img={carImages.imagePath[1]} />
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
                                            <RecentPost key={index} img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/b-l-img-1.jpg"} Id={byBlogs.id} title={byBlogs.title} date={"28 may 2023"} />
                                        ))}
                                    </div> :
                                    <div>
                                        {cars?.data.slice(-3).map((byCar, index) => (
                                            <RecentPost key={index} img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/side-b-l-img-2.jpg"} name={byCar.model} category={byCar.carCategory ? byCar.carCategory.category : "No Category"} date={"28 may 2023"} />
                                        ))}
                                    </div>
                            }
                        </div>


                        <div className='Catagories'>
                            <h1>Catagories</h1>
                            {categorie?.data.map((category, index) => (
                                <span key={index}>{category.category}</span>
                            ))}
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
