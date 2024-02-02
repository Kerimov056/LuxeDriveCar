import React, { useState } from 'react'
import axios from 'axios';

const MusicApiTest = () => {

    const [message, setMessage] = useState('');
    const [translateMessage, settranslateMessage] = useState();
    const translateText = async () => {
        const encodedParams = new URLSearchParams();
        encodedParams.set('source_language', 'en');
        encodedParams.set('target_language', 'az');
        encodedParams.set('text', message ? message : '');

        const options = {
            method: 'POST',
            url: 'https://text-translator2.p.rapidapi.com/translate',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '7c545e8afcmshefb428caa19a4f3p1039d0jsn603528d8a8f4',
                'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
            },
            data: encodedParams,
        };

        try {
            const response = await axios.request(options);
            // console.log(JSON.stringify(response, null, 2)); // Api ne qayidir hamisini butun datani
            // console.log(response.data.data?.translatedText);
            settranslateMessage(response.data.data?.translatedText);
        } catch (error) {
            console.error(error);
        }

    };

    const [Messages, SetMessages] = useState([
        {
            message: 'Salam'
        }
    ]);

    const addMessage = async () => {
        const newMessage = { message: translateMessage }; // Yeni mesaj objecti yarat
        SetMessages([...Messages, newMessage]); // olan mesajlara yeni mesajı elave et
    }

    const messageTransLate = async () => {
        translateText();
        await addMessage();
        settranslateMessage('');
        setMessage('')
    }


    return (
        <>
            <div style={{ width: '100%', height: '100vh', textAlign: 'center', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                <h1>Music Test Api Key</h1>
                <div style={{ width: '80%', textAlign: 'center', justifyContent: 'center', alignItems: 'center', }}>
                    <input
                        style={{ width: '80%', fontSize: '32px', height: '100px', color: 'black', border: '1px solid black', marginBottom: '40px' }}
                        type="text"
                        onChange={(evt) => setMessage(evt.currentTarget.value)}
                        value={message}
                        placeholder='message'
                    />
                    <button onClick={messageTransLate} style={{ marginLeft: '100px', border: '10px solid black', width: '100px', height: '70px' }}>Send</button>
                </div>
                <div style={{ width: '600px', minHeight: '500px', backgroundColor: 'gray', fontSize: '23px' }}>
                    {Messages?.map((e, index) => (
                        <h1 style={{ color: 'white', textAlign: 'center', marginTop: '10px' }} key={index}>{e.message}</h1>
                    ))}
                </div>
                <img src='data:image/jpeg;base64,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' />
                <audio controls>
                    <source src="https://cdns-preview-c.dzcdn.net/stream/c-cfee22d6a22d1769c12d673200f109ab-3.mp3" type="audio/mpeg" />
                </audio>

            </div>
        </>
    )
}

export default MusicApiTest