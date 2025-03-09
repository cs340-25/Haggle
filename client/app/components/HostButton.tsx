'use client'

import React, { useState } from 'react';
import { Modal } from "@mui/material";
import { addLobby, genLobbyCode } from '../utils/lobbyAPI';

const HostButton = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    async function hostLobby(is_private: boolean) {
        let code = await genLobbyCode();

        await addLobby({
            private: is_private,
            numPlayers: 1,
            code: code,
            state: "default state",
        })
    }

    return (
        <div>
            <button
                onClick={() => setModalOpen(true)}
                className="bg-[#1b4381] p-[2vh] px-[3vw] rounded-[30px] border-[.5vh] border-[#5c6ead]"
            >Host</button>

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <div className='p-10 bg-[#1b4381] border-[.5vh] border-[#5c6ead] rounded-[30px] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
                    <p className='text-3xl mb-10 text-center'>Hosting</p>
                    <div className='flex justify-between w-full gap-10'>
                        <button
                            onClick={() => {
                                hostLobby(false);
                            }}
                            className="bg-[#1b8142] p-[1vh] px-[1.5vw] rounded-[30px] border-[.5vh] border-[#5cad69]"
                        >Public</button>
                        <button
                            onClick={() => {
                                hostLobby(true);
                            }}
                            className="bg-[#da9329] p-[1vh] px-[1.5vw] rounded-[30px] border-[.5vh] border-[#e0bc77]"
                        >Private</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default HostButton;

/*
private?

*/
