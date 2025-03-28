"use client"
import React, { useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";

const GameServer = () => {
    const [socket, setSocket] = useState<Socket | undefined>();
    const [msgs, setMsgs] = useState<string[]>([]);
    const [msgField, setMsgField] = useState<string>("");
    const [roomField, setRoomField] = useState<string>("");
    const [room, setRoom] = useState<number | undefined>();


    function sendMyEvent() {
        if (socket && msgField != "") {
            socket.emit("myevent", msgField);
        }
    }


    function switchRoom() {
        if (socket && roomField != "") {
            let roomNumInt = parseInt(roomField);
            let roomNumFloat = parseFloat(roomField);

            if (roomNumInt != roomNumFloat || Number.isNaN(roomNumInt)) {
                alert("Room number must be a whole number.");

            } else {
                socket.emit("switchroom", roomNumInt);
                setRoom(roomNumInt);
                setMsgs([]);
            }
        }
    }


    useEffect(() => {
        const socketLocal = io("http://localhost:8080");

        socketLocal.on("myevent", (msg) => setMsgs(prev => [msg, ...prev]));

        setSocket(socketLocal);
    }, []);


    return (
        <div className='bg-neutral-800 p-5 rounded-2xl w-[50%] relative'>
            <p className='text-2xl text-center'><b>Messages</b></p>
            <p className='text-2xl text absolute top-5 right-5 w-fit text-neutral-400'>Room: {!room ? "None" : room}</p>

            {/* Messages list */}
            <div className='bg-neutral-900 h-[200px] mt-5 overflow-y-scroll scrollbar scrollbar-thumb-black p-7 flex flex-col gap-5'>

                {/* If there's messages, show them */}
                {msgs.length ? <>
                    {msgs.map((msg, index) => <div key={index}>
                        <p className='bg-neutral-950 p-5'>{msg}</p>
                    </div>)}

                {/* Otherwise, clarify there's no messages */}
                </> : <>
                    <div className='w-full h-[100%] flex justify-center items-center'>
                        <p className='text-neutral-400'>No messages yet, try sending one!</p>
                    </div>
                </>}
            </div>

            {/* Message form */}
            <div className='w-full flex justify-between mt-10'>
                <input type="text" 
                    className="h-[40px] rounded-lg text-white bg-neutral-900 w-[70%] placeholder:text-neutral-400 px-3 outline-none"
                    onChange={(e) => setMsgField(e.target.value)}
                    placeholder="Message"
                />
                <button onClick={() => sendMyEvent()} className='px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg'>Send</button>
            </div>

            {/* Room form */}
            <div className='w-full flex justify-between mt-10'>
                <input type="text" 
                    className="h-[40px] rounded-lg text-white bg-neutral-900 w-[70%] placeholder:text-neutral-400 px-3 outline-none"
                    onChange={(e) => setRoomField(e.target.value)}
                    placeholder="Room Number"
                />
                <button onClick={() => switchRoom()} className='px-5 py-2 bg-green-600 hover:bg-green-500 rounded-lg'>Join</button>
            </div>
        </div>
    )
}

export default GameServer;