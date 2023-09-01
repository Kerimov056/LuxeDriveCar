import React, { useState, useEffect } from 'react';
import "./MyReserv.scss";
import { Link } from 'react-router-dom';

const MyReserv = (props) => {

    const [statusColor, setStatusColor] = useState(null);
    const [drum, setDrum] = useState(null);
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


    useEffect(() => {
        if (props.status !== null) {
            if (props.status === 0) {
                setStatusColor("#fcad00");
                setDrum("Pending");
            } else if (props.status === 1) {
                setStatusColor("#0dfc00");
                setDrum("Confirm");
            } else if (props.status === 3) {
                setStatusColor("#ff0000");
                setDrum("Canceled");
            }
        }
    }, [props.status]);

    return (
        <>
            <div class="cardMyReserv">
                <a class="card1" style={{ backgroundColor: statusColor }} href="#">
                    <p>{drum}</ p>
                    <p class="small">
                        <Link to={`/CarDetail/${props.Id}`}> {props.marka} {props.model} </Link> </p>
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
                        <Link to={`/CarDetail/${props.Id}`}>→</Link>
                        </div>
                    </div>
                </a>
            </div>
        </>
    )
}

export default MyReserv