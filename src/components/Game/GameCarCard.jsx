import React, { useEffect, useState } from 'react';
import './GameCarCard.scss'
import CarCard from "./CarCard";



const GameCarCard = () => {

    const [carData, setCarData] = useState(null);
    const [carDataView, setCarDataView] = useState(null);
    const [viewHandler, setViewHandler] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://localhost:7152/api/Car/GameGetTenAsync');
                const data = await response.json();
                setCarData(data);
                setCarDataView(data);
            } catch (error) {
                console.error('Hata:', error);
            }
        }

        fetchData();
    }, []);


    const CarOption = (Id) => {
        for (let i = 0; i < carData.length; i++) {
            const car = carData[i];
            if (car.id === Id) {
                setCarDataView(car);
                setViewHandler(true);
                break;
            }
        }
    }
    return (
        <>
            <div id='GameCarCard'>
                <div>
                    <div className='GameText'>
                        <h1>CarQuest</h1>
                        <div>
                            <h2>1{")"} Welcome! Take the first step to start our car booking game. 10 different vehicle cards are waiting for you!</h2>
                            <h2>2{")"} Vehicle cards we selected specially for you! Which one will be your favorite?</h2>
                            <h2>3{")"} We chose 10 different vehicles for you. Now it's your turn! Choose which vehicle suits you best!</h2>
                            <h2>4{")"} Choose one of these 10 vehicles. Which one will be your companion?</h2>
                        </div>
                    </div>
                    {viewHandler === true &&
                        <div>
                            <h1></h1>
                            <CarCard
                                Id={carDataView?.id}
                                img={carDataView?.carImages[0]?.imagePath}
                                marka={carDataView?.marka}
                                model={carDataView?.model}
                                year={carDataView?.year}
                                testFunction={() => CarOption(carDataView?.id)}
                            />
                        </div>
                    }
                    {viewHandler === false &&
                        <div className='GameCarCards'>
                            <div className='GameCarCard_Card4'>
                                {carDataView?.length > 1 && carDataView?.slice(0, 4).map((byCar, index) => (
                                    <CarCard
                                        key={index}
                                        Id={byCar?.id}
                                        img={byCar?.carImages[0]?.imagePath}
                                        marka={byCar?.marka}
                                        model={byCar?.model}
                                        year={byCar?.year}
                                        testFunction={() => CarOption(byCar?.id)} />
                                ))}
                            </div>
                            <div className='GameCarCard_Card3'>
                                {carDataView?.length > 1 && carDataView?.slice(4, 7).map((byCar, index) => (
                                    <CarCard
                                        key={index}
                                        Id={byCar?.id}
                                        img={byCar?.carImages[0]?.imagePath}
                                        marka={byCar?.marka}
                                        model={byCar?.model}
                                        year={byCar?.year}
                                        testFunction={() => CarOption(byCar?.id)} />
                                ))}
                            </div>
                            <div className='GameCarCard_Card2'>
                                {carDataView?.length > 1 && carDataView?.slice(7, 9).map((byCar, index) => (
                                    <CarCard
                                        key={index}
                                        Id={byCar?.id}
                                        img={byCar?.carImages[0]?.imagePath}
                                        marka={byCar?.marka}
                                        model={byCar?.model}
                                        year={byCar?.year}
                                        testFunction={() => CarOption(byCar?.id)} />
                                ))}
                            </div>
                            <div className='GameCarCard_Card1'>
                                {carDataView?.length > 1 && carDataView?.slice(9, 10).map((byCar, index) => (
                                    <CarCard
                                        key={index}
                                        Id={byCar?.id}
                                        img={byCar?.carImages[0]?.imagePath}
                                        marka={byCar?.marka}
                                        model={byCar?.model}
                                        year={byCar?.year}
                                        testFunction={() => CarOption(byCar?.id)} />
                                ))}
                            </div>
                        </div>
                    }

                    {/* <div className='GameCarCards'>
                        <div className='GameCarCard_Card4'>
                            {carDataView?.slice(0, 4).map((byCar, index) => (
                                <img key={index} style={{ width: "250px", height: "254px", borderRadius: "1rem" }} src={byCar?.imageSrc} />
                            ))}
                        </div>
                        <div className='GameCarCard_Card3'>
                            {carDataView?.slice(4, 7).map((byCar, index) => (
                                <img key={index} style={{ width: "250px", height: "254px", borderRadius: "1rem" }} src={byCar?.imageSrc} />
                            ))}
                        </div>
                        <div className='GameCarCard_Card2'>
                            {carDataView?.slice(7, 9).map((byCar, index) => (
                                <img key={index} style={{ width: "250px", height: "254px", borderRadius: "1rem" }} src={byCar?.imageSrc} />
                            ))}
                        </div>
                        <div className='GameCarCard_Card1'>
                            {carDataView?.slice(9, 10).map((byCar, index) => (
                                <img key={index} style={{ width: "250px", height: "254px", borderRadius: "1rem" }} src={byCar?.imageSrc} />
                            ))}
                        </div>
                    </div> */}

                </div>
            </div>
        </>
    )
}

export default GameCarCard