import React from 'react'
import "./MyProfile.scss";
import Navbar from "../Navbar/Navbar";

const MyProfile = () => {
    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className='MyFrofile'>
                <div>
                    <div className='ProfileDetails'>
                        <div>
                            <div className='BackIamge'>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBdhpfvZA7JBUWGsuZufFOgI15Mhs88nU-Uz-HaX-L7A&s' />
                            </div>
                            <div className='DeatilsProfil'>
                                <div className='DeatilsProfilUP'>
                                    <p><img src='https://cdn.dribbble.com/userupload/4095498/file/original-9d1e3625c6f08df5980d01ac7386590e.png?resize=1200x900' /></p>
                                    <p>...</p>
                                </div>
                                <div></div>
                            </div>
                        </div>
                    </div>

                    <div className='PReserrvationsCars'>

                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfile