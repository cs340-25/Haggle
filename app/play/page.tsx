import React from 'react';
import NavBar from '../components/NavBar';
import GameOff from '../components/game_comps/GameOff';

const page = () => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center relative gap-5 overflow-scroll bg-[#1d4325] font-impact font-black '>
        <NavBar />

        <div className='mt-[10vh] h-[60vh] w-[60vh] bg-[url("/chip.svg")] bg-cover text-center pt-[32.5vh] text-[#1b4381] text-[8vh]'>
          offline
        </div>
        <hr style={{borderColor:"#fff2e5", minWidth:"75%", minHeight:"20px"}}></hr>
        <div className="bg-[#1b4381] w-[75vw] rounded-[20px] border-[#5c6ead] border-2">
          
        </div>
        <GameOff/>
        <div className='h-[50%] text-[100px]'><br></br></div>
    </div>
  )
}

export default page;
