import React from 'react';
import './strutur.scss'
import RecentPost from './RecentPost';
import BlogPost from '../Blogs/BlogPost';
import { useQuery } from "react-query";
import ShopCarCard from '../Shop/ShopCarCard';
import { getCarImage } from "../Services/shopCarardServices";

const Strutur = (props) => {


    const { data } = useQuery({
        queryKey: ["Faqs"],
        queryFn: getCarImage,
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
                                            <h1>What Are The Benefits Of Hiring A Private Driver And Traveling</h1>
                                            <h3>JAN 8. 2022. DRIVELUXURY</h3>
                                        </p>
                                        <div>
                                            <img src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/b-l-img-1.jpg' />
                                        </div>
                                    </div>

                                    <div className='blogDetails_2'>
                                        <div>
                                            Suspendisse ultrices gravida dictum fusce ut placerat orci nulla. Enim ut tellus elementum sagittis vitae et le duiso ut. Habitasse platea dictumst quisque sagitti puruse sit. Lorem ipsum dolor sit amet consectetur adip icing elit ut. Amet justo donec enim diam vulputate. Donec adipiscing tristique risus nec. Egestas purus viver a accu san in. Feugiat vivamus at augue eget arcu dictum varius duis at. Purs usit amet luctus venenatis. Lectu smagn do diam maecenas se denim ut sem. Vive ra mauris in aliquam sem feugiat in ani. <br /><br />

                                            Semper auctor neque vitae tempus quam pellentesque. Vel facilisis volut at est velit. Porta lorem mollis aliquail uto porttitor. Feugiat pretium nibh ipsum conseq ut nisl vel pretium lectus. Est pa leract in egestas erat imperd sed. Adipiscing elit duis tristique sollici udinn nibh. Ultrices eros in cursus turpis tincidunt massa. Dui ut dign ssimo suspendisse in est ante. Auctor urna nunc id cursus metus aliquam. Dui nunc mattiso nim ut tellus eleme sagitt is vitae. Lectus ves tiblum ullamcorper mattis velit. Viverra aliquet eget.
                                        </div>
                                        <div className='ortaq'>
                                            <div>Sed viverra tellus in hac habitasse platea lacus ai dictumst vesti buli sed arcu non odio euismod at lacinia sem nulla pharetra diam sit ame mattis ullamcorper velit sed ulam. </div>
                                        </div>
                                        <div>Sit amet commodo nulla facilisi nullam vehicula ipsum a. At volutpat venenatis diam ut tellus in. Tristique sollici tudin nibh sit amet commodo. Fames ac turpis egestas integer eget. Aliquet mau ris augue in neque gravid fi emen tum. Blandit quis turpis cursus in hac habitasse platea. Fames ac turpis egestas integer eget.</div>
                                        <div className='endimg'>
                                            <img src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/b-s-img-2.jpg' />
                                        </div>
                                        <div>Dui vivamus arcu felis bibendum ut tristique et. Urna porttitor rhoncus non dolor purus. Et netus malesuada et fai es ac turpis egestas maecenas pharetra. Nunc sed velit dignissim sodales conv.</div>
                                    </div>

                                    <BlogPost title={"What Are The Benefits Of Hiring A Private Driver And Traveling"} date={"Jan 8.   2022./   DRIVE, LUXURY"} img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/b-l-img-1.jpg"} desc={"Nisl condimentum id venenatis a condimentum vitae sapien pellent esque habitant. Massa id neque aliquam vestibulum. Diam quam nulla porttitor massa id neque aliquam. Tortor at auctor urna nunc id cursus metus aliquam eleifend. At tellus at urna condimentum mattis pellentesque. Tristique sollicitudin nibh sit amet commodo nulla. Erat nam at lectus urna duis convallis. Vestibulum lectus mauris ultrices eros in cursus turpis. Volutpat commodo"} />

                                </div> :


                                props.blog === true ?
                                    <div>
                                        <BlogPost title={"What Are The Benefits Of Hiring A Private Driver And Traveling"} date={"Jan 8.   2022./   DRIVE, LUXURY"} img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/b-l-img-1.jpg"} desc={"Nisl condimentum id venenatis a condimentum vitae sapien pellent esque habitant. Massa id neque aliquam vestibulum. Diam quam nulla porttitor massa id neque aliquam. Tortor at auctor urna nunc id cursus metus aliquam eleifend. At tellus at urna condimentum mattis pellentesque. Tristique sollicitudin nibh sit amet commodo nulla. Erat nam at lectus urna duis convallis. Vestibulum lectus mauris ultrices eros in cursus turpis. Volutpat commodo"} />
                                        <BlogPost title={"What Are The Benefits Of Hiring A Private Driver And Traveling"} date={"Jan 8.   2022./   DRIVE, LUXURY"} img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/b-l-img-1.jpg"} desc={"Nisl condimentum id venenatis a condimentum vitae sapien pellent esque habitant. Massa id neque aliquam vestibulum. Diam quam nulla porttitor massa id neque aliquam. Tortor at auctor urna nunc id cursus metus aliquam eleifend. At tellus at urna condimentum mattis pellentesque. Tristique sollicitudin nibh sit amet commodo nulla. Erat nam at lectus urna duis convallis. Vestibulum lectus mauris ultrices eros in cursus turpis. Volutpat commodo"} />
                                        <BlogPost title={"What Are The Benefits Of Hiring A Private Driver And Traveling"} date={"Jan 8.   2022./   DRIVE, LUXURY"} img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/b-l-img-1.jpg"} desc={"Nisl condimentum id venenatis a condimentum vitae sapien pellent esque habitant. Massa id neque aliquam vestibulum. Diam quam nulla porttitor massa id neque aliquam. Tortor at auctor urna nunc id cursus metus aliquam eleifend. At tellus at urna condimentum mattis pellentesque. Tristique sollicitudin nibh sit amet commodo nulla. Erat nam at lectus urna duis convallis. Vestibulum lectus mauris ultrices eros in cursus turpis. Volutpat commodo"} />
                                    </div> :
                                    <div className='Shoppp'>
                                        {data?.data.map((carImages, index) => (
                                            <ShopCarCard marka={carImages.id} img={carImages.imagePath[1]} />
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
                                        <RecentPost img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/side-b-l-img-2.jpg"} name={"BMW M4 croup"} date={"28 may 2023"} />
                                        <RecentPost img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/side-b-l-img-2.jpg"} name={"BMW M4 croup"} date={"28 may 2023"} />
                                        <RecentPost img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/side-b-l-img-2.jpg"} name={"BMW M4 croup"} date={"28 may 2023"} />
                                    </div> :
                                    <div>
                                        <RecentPost img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/side-b-l-img-2.jpg"} name={"BMW M4 croup"} date={"28 may 2023"} />
                                        <RecentPost img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/side-b-l-img-2.jpg"} name={"BMW M4 croup"} date={"28 may 2023"} />
                                        <RecentPost img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/side-b-l-img-2.jpg"} name={"BMW M4 croup"} date={"28 may 2023"} />
                                    </div>
                            }
                        </div>


                        <div className='Catagories'>
                            <h1>Catagories</h1>
                            <span>salam</span>
                            <span>Qaqa</span>
                            <span>Necesen</span>
                            <span>Saqol</span>
                            <span>Brat</span>
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
