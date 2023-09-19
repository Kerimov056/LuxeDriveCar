import React, { useEffect, useState } from 'react';
import './GameCarCard.scss'
import CarCard from "./CarCard";
import { GameGetTenCar } from "../Services/carServices";
import { useQuery } from "react-query";
import axios from 'axios';



const GameCarCard = () => {

    const { data: GameCar } = useQuery({
        queryKey: ["GameCar"],
        queryFn: GameGetTenCar,
        staleTime: 0,
    });

    const [qrCode, setQrCode] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://localhost:7152/api/Car/GameQRCode?id=${byCars?.data?.id}`);
          setQrCode(response);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);
    console.log("Buuuu",qrCode?.data?.imageSrc);

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
                    <div className='GameCarCards'>
                        <div className='GameCarCard_Card4'>
                            {GameCar?.data?.slice(0, 4).map((byCar, index) => (
                                <CarCard
                                    key={index}
                                    Id={byCar?.id}
                                    img={byCar?.carImages[0]?.imagePath}
                                    marka={byCar?.marka}
                                    model={byCar?.model}
                                    year={byCar?.year} />
                            ))}
                        </div>
                        <div className='GameCarCard_Card3'>
                            {GameCar?.data?.slice(4, 7).map((byCar, index) => (
                                <CarCard
                                    key={index}
                                    Id={byCar?.id}
                                    img={byCar?.carImages[0]?.imagePath}
                                    marka={byCar?.marka}
                                    model={byCar?.model}
                                    year={byCar?.year} />
                            ))}
                        </div>
                        <div className='GameCarCard_Card2'>
                            {GameCar?.data?.slice(7, 9).map((byCar, index) => (
                                <CarCard
                                    key={index}
                                    Id={byCar?.id}
                                    img={byCar?.carImages[0]?.imagePath}
                                    marka={byCar?.marka}
                                    model={byCar?.model}
                                    year={byCar?.year} />
                            ))}
                        </div>
                        <div className='GameCarCard_Card1'>
                            {GameCar?.data?.slice(9, 10).map((byCar, index) => (
                                <CarCard
                                    key={index}
                                    Id={byCar?.id}
                                    img={byCar?.carImages[0]?.imagePath}
                                    marka={byCar?.marka}
                                    model={byCar?.model}
                                    year={byCar?.year} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GameCarCard