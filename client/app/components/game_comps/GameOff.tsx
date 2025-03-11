"use client"
import * as Phaser from "phaser";
import React, { useEffect, useRef } from "react";
import GameScene from "./GameScene";

const GameOff : React.FC = () =>{

    const gameRef = useRef<Phaser.Game | null>(null);
    
    useEffect(() =>{

        const config:Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 800,
            height: 400,
            physics:{
                default: 'arcade',
                arcade:{
                    gravity: {x:0, y:300 },
                    debug: false
                }
            },
            parent: 'phaser-game-container',
            scene: [GameScene]
        };


        gameRef.current = new Phaser.Game(config);

        return () => {
            if(gameRef.current){
                gameRef.current.destroy(true);
            }
        };

    },[]);


    return <div id="phaser-game-container"/>;
};

export default GameOff;