'use client'

import React, { useEffect, useState } from 'react'
import { ILobby } from '@/app/server/models/lobby';
import Image from 'next/image';
import { addLobby, getAllLobbies, getLobbyByID, rmLobby, updateLobby } from '../utils/lobbyAPI';


const LobbyCrud = () => {
    // Basic GET requests
    const [lobbies, setLobbies] = useState<ILobby[]>([]);

    async function refreshLobbies() {
        const initData = await getAllLobbies();
        setLobbies(initData ?? []);
    }

    useEffect(() => { refreshLobbies() }, []);

    // POST form states
    const [inputCode, setInputCode] = useState<string>("");
    const [inputNumPlayers, setInputNumPlayers] = useState<string>("");
    const [inputPrivate, setInputPrivate] = useState<boolean>(false);
    const [inputState, setInputState] = useState<string>("");
    
    // Unholy amalgamation of form-to-API functions
    async function addLobbyCRUD() {
        if (inputCode == "" || inputNumPlayers == "" || inputState == "") {
            alert("You must provide each field for this!");
            return;
        }

        const newLobby: ILobby = {
            code: inputCode,
            numPlayers: parseInt(inputNumPlayers),
            private: inputPrivate,
            state: inputState
        };

        await addLobby(newLobby);

        refreshLobbies();
    }

    async function updateLobbyCRUD() {
        if (inputCode == "") {
            alert("You must provide a code for this!");
            return;
        }

        const newLobby: ILobby = {
            code: inputCode,
            numPlayers: inputNumPlayers != "" ? parseInt(inputNumPlayers) : -1,
            private: inputPrivate,
            state: inputState
        };

        await updateLobby(newLobby);

        refreshLobbies();
    }

    async function getLobbyCRUD() {
        if (inputCode == "") {
            alert("You must provide a code for this!");
            return;
        }

        const lobby = await getLobbyByID(inputCode);

        if (lobby != undefined) {
            setInputNumPlayers(lobby.numPlayers.toString());
            setInputPrivate(lobby.private);
            setInputState(lobby.state);
        }
    }

    async function rmLobbyCRUD(code: string) {
        await rmLobby(code);
        refreshLobbies();
    }
    
    return (
        <div className='flex w-full justify-center items-center gap-10'>
            {/* Lobby form */}
            <div className='bg-neutral-800 p-5 pb-10 rounded-2xl flex flex-col h-fit'>
                <p className='text-2xl text-center mb-3'>Lobby Form</p>
                <div className='flex gap-10'>
                    <div>
                        <p className='text-lg'>Code</p>
                        <input
                            type="text"
                            className="text-black placeholder-neutral-400 px-5 py-2 rounded-lg outline-none"
                            placeholder='Enter a code'
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                        />
                    </div>

                    <div>
                        <p className='text-lg'>Number of Players</p>
                        <input
                            type="text"
                            className="text-black placeholder-neutral-400 px-5 py-2 rounded-lg outline-none"
                            placeholder='Number of Players'
                            value={inputNumPlayers}
                            onChange={(e) => setInputNumPlayers(e.target.value)}
                        />
                    </div>
                </div>

                <p className='text-lg mt-5'>State</p>
                <input
                    type="text"
                    className="text-black placeholder-neutral-400 px-5 py-2 rounded-lg outline-none"
                    placeholder='Game state of lobby'
                    value={inputState}
                    onChange={(e) => setInputState(e.target.value)}
                />

                <div className='flex gap-5 mt-5'>
                    <p className='text-lg'>Private?</p>
                    <input
                        type="checkbox"
                        onChange={() => setInputPrivate(!inputPrivate)}
                        checked={inputPrivate}
                        className='pl-5 block'
                    />
                </div>

                <button
                    onClick={() => addLobbyCRUD()}
                    className="mt-10 px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                    POST
                </button>

                <button
                    onClick={() => updateLobbyCRUD()}
                    className="mt-5 px-5 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg"
                >
                    PUT
                </button>

                <button
                    onClick={() => getLobbyCRUD()}
                    className="mt-5 px-5 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
                >
                    GET
                </button>
            </div>

            {/* Create list of lobbies */}
            <div className='bg-neutral-800 p-5 rounded-2xl my-10'>
                <p className='text-2xl text-center mb-3'>Lobby List</p>
                <div className='h-[40vh] overflow-y-scroll flex flex-col gap-5 scrollbar-none'>
                    {lobbies.map((lobby, index) => <div key={index} className='bg-neutral-600 p-5 rounded-2xl shadow-xl relative w-[30vw]'>
                        <p className='text-2xl'>{lobby.code} <span className='text-neutral-400'>({lobby.private ? "Private" : "Public"})</span></p>
                        <p className='text-neutral-400'>{lobby.numPlayers} player(s)</p>
                        <p className='mt-4 font-mono'>{lobby.state}</p>

                        <button
                            className='absolute top-[50%] -translate-y-[50%] right-[5%] opacity-65 hover:opacity-100'
                            onClick={() => { rmLobbyCRUD(lobby.code) }}
                        >
                            <Image 
                                src="/trash.svg"
                                width={30}
                                height={30}
                                alt="delete"
                            />
                        </button>
                    </div>)}
                </div>
            </div>
        </div>

    )
}

export default LobbyCrud;