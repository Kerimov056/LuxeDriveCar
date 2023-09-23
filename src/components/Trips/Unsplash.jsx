import React, { useState, useEffect } from 'react';

const Unsplash = (props) => {
    const [images, setImages] = useState([]);

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
        <div>
            <div>
                {images.map(image => (
                    <div key={image.id}>
                        <img src={image.urls.small} alt={image.alt_description} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Unsplash;
