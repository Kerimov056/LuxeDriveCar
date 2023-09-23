import React, { useState, useEffect } from 'react';
import './Unsplash.scss'
import { UNSPLASH_API_KEY } from "../Export/Export";

const Unsplash = (props) => {
    const [images, setImages] = useState([]);


    useEffect(() => {
        if (props.query) {
            const apiUrl = `https://api.unsplash.com/search/photos?page=1&query=${props.query}&client_id=${UNSPLASH_API_KEY}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    setImages(data.results);
                })
                .catch(error => console.error("Error:", error));
        }
    }, [props.query]); 

    useEffect(() => {
        props.onImagesChange(images[0]?.urls.small); 
    }, [images, props]);

    return (
        <div id='Unsplash' >
            {images.slice(0, 5).map(image => (
                <div key={image.id}>
                    <img src={image.urls.small} />
                </div>
            ))}
        </div>
    );
};

export default Unsplash;
