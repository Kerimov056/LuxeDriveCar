import React from 'react';
import './blogpost.scss'

const BlogPost = (props) => {
    return (
        <>
            <div id='BlogPost'>
                <div className='postName'>
                    <h1>{props.title}</h1>
                    <h4>{props.date}</h4>
                </div>
                <div className='postImg'>
                    <div class="container noselect">
                        <div class="canvas">
                            <div class="tracker tr-1"></div>
                            <div class="tracker tr-2"></div>
                            <div class="tracker tr-3"></div>
                            <div class="tracker tr-4"></div>
                            <div class="tracker tr-5"></div>
                            <div class="tracker tr-6"></div>
                            <div class="tracker tr-7"></div>
                            <div class="tracker tr-8"></div>
                            <div class="tracker tr-9"></div>
                            <div class="tracker tr-10"></div>
                            <div class="tracker tr-11"></div>
                            <div class="tracker tr-12"></div>
                            <div class="tracker tr-13"></div>
                            <div class="tracker tr-14"></div>
                            <div class="tracker tr-15"></div>
                            <div class="tracker tr-16"></div>
                            <div class="tracker tr-17"></div>
                            <div class="tracker tr-18"></div>
                            <div class="tracker tr-19"></div>
                            <div class="tracker tr-20"></div>
                            <div class="tracker tr-21"></div>
                            <div class="tracker tr-22"></div>
                            <div class="tracker tr-23"></div>
                            <div class="tracker tr-24"></div>
                            <div class="tracker tr-25"></div>
                            <div id="card">
                                <img src={props.img} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='postDesc'>
                    <h4>{props.desc}</h4>
                </div>
                <div className='postButton'>
                    <button>+ DISCOVER</button>
                </div>
            </div>
        </>
    );
}

export default BlogPost;
