import React from 'react';
import NavBar from '../components/NavBar';
import GameServer from '../components/GameServer';
import GameOff from '../components/game_comps/GameOff';

const page: React.FC = () => {
  return (
    <div className='w-full h-[100vh] flex flex-col items-center justify-center relative gap-5'>

        <NavBar />
        <p>This is the offline Game Place Holder</p>
        <GameOff/>
    </div>
  )
}

export default page;
