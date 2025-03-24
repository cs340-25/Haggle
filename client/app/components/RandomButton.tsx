"use client"

import React from 'react'
import { getPublicLobbies, updateLobby } from '../utils/lobbyAPI'
import { useRouter } from 'next/navigation';

const RandomButton = () => {
    const router = useRouter();

    async function joinRandom() {
        // get public games
        const publics = await getPublicLobbies();

        if (!publics) {
            alert("Failed to join a public lobby.");

        } else {
            // look for non-full, public game
            let foundNonfullGame = -1;
            for (let i = 0; i < publics.length; ++i) {
                if (publics[i].numPlayers < 2) {
                    foundNonfullGame = i;
                    break;
                }
            }

            if (foundNonfullGame == -1) {
                // if no game, error
                alert("No public lobbies available!");
            
            } else {
                // there is a public game, redirect to it
                const validGame = publics[foundNonfullGame];
                await updateLobby({
                    ...validGame,
                    numPlayers: validGame.numPlayers + 1
                });
                router.push(`/online/${validGame.code}`);
            }
        }
    }

    return (
        <button
            onClick={() => joinRandom()}
            className="bg-[#1b4381] p-[2vh] px-[3vw] xs:rounded-[30px] xxs:rounded-[20px] border-[.5vh] border-[#5c6ead]"
        >
            Random
        </button>
    )
}

export default RandomButton
