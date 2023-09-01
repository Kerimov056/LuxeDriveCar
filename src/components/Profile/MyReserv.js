import React, { useState, useEffect } from 'react';
import "./MyReserv.scss";

const MyReserv = (props) => {

    const [pickupDate, setPickupDate] = useState(props.remainingTime);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {

        const interval = setInterval(() => {
            const pickupDateObject = new Date(pickupDate);

            const currentDate = new Date();

            const timeDifference = pickupDateObject - currentDate;

            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });

            if (timeDifference < 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);


        return () => clearInterval(interval);
    }, [pickupDate]);


    return (
        <>
            <div class="cardMyReserv">
                <a class="card1" style={{ backgroundColor: "white" }} href="#">
                    <p>{props.status}</ p>
                    <p class="small">{props.marka} {props.model} </p>
                    <p>
                        {timeLeft.days > 0 && (
                            <p>Kalan süre: {timeLeft.days} gün {timeLeft.hours} saat {timeLeft.minutes} dakika {timeLeft.seconds} saniye</p>
                        )}
                        {timeLeft.days === 0 && (
                            <p>Kalan süre: {timeLeft.hours} saat {timeLeft.minutes} dakika {timeLeft.seconds} saniye</p>
                        )}
                    </p>
                    <div class="go-corner" href="#">
                        <div class="go-arrow">
                            →
                        </div>
                    </div>
                </a>
            </div>
        </>
    )
}

export default MyReserv