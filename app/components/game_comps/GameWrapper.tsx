import dynamic from 'next/dynamic'
import React from 'react'

const GameWrapper = () => {
    const GameOff = dynamic(() => import("./GameOff"), { ssr: false })

    return (
        <GameOff />
    )
}

export default GameWrapper