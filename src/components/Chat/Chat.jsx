import React, { useState } from 'react'
import './chat.scss'
import Lobby from './Lobby';
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import Navbar from '../Navbar/Navbar';
import Chaatt from './Chaatt';


const Chat = () => {

    const [connection, setConnection] = useState();
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    const joinRoom = async (user, room) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("https://localhost:7152/chat")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("RecciveMessage", (user, message) => {
                setMessages(messages => [...message, { user, message }]);
            });


            connection.on("UsersIinRoom", (users) => {
                setUsers(users);
            });


            connection.onclose(e => {
                setConnection();
                setMessages([]);
                setUsers([]);
            });


            await connection.start();
            await connection.invoke("JoinRoom", { user, room });
            setConnection(connection);
        } catch (e) {
            console.log(e);
        }
    }


    const sendMessage = async (message) => {
        try {
            await connection.invoke("SendMessage", message)
        } catch (e) {
            console.log(e);
        }
    }

    const closeConnection = async () => {
        try {
            await connection.stop();
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <>
            <Navbar />
            <div className='app' style={{ marginTop: "80px" }}>
                <h2>MyChat</h2>
                <hr className='line' />
                {!connection
                    ? <Lobby joinRoom={joinRoom} />
                    : <Chaatt sendMessage={sendMessage}
                        messages={messages}
                        users={users}
                        closeConnection={closeConnection}
                    />
                }
            </div>
        </>
    )
}

export default Chat