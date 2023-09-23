import React, { useState, useEffect } from 'react';
import './Unsplash.scss'


const Unsplash = (props) => {
    const [images, setImages] = useState([]);

    console.log(props.query);

    useEffect(() => {
        // props.query değiştiğinde bu blok çalışacak
        if (props.query) {
            const apiUrl = `https://api.unsplash.com/search/photos?page=1&query=${props.query}&client_id=7VpM8-RI2TsEMiiJ35HwcXUayF_nImX6z5VVpU75dVo`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    setImages(data.results);
                })
                .catch(error => console.error("Error:", error));
        }
    }, [props.query]);

    return (
        <div id='Unsplash' >
            {images.slice(0,5).map(image => (
                <div key={image.id}>
                    <img src={image.urls.small} />
                </div>
            ))}
        </div>
    );
};

export default Unsplash;
