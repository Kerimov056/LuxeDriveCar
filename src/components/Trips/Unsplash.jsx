import React, { useState } from 'react';

const Unsplash = () => {
    const [query, setQuery] = useState("");
    const [images, setImages] = useState([]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        const apiUrl = `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=7VpM8-RI2TsEMiiJ35HwcXUayF_nImX6z5VVpU75dVo`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setImages(data.results);
            })
            .catch(error => console.error("Error:", error));
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Arama yap..."
            />
            <button onClick={handleSearch}>Ara</button>

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
