import Image from "next/image";
import NavBar from "./components/NavBar";
import HaggleChip from "@/public/chip.svg";
import React from 'react';

export default function Home() {

  

  return (
    <div className="w-[100%] min-h-[100vh] flex flex-col sm:justify-between pb-10 items-center gap-5 relative bg-[#1d4325] font-impact font-black">
      <NavBar />
      
      <div className='relative w-[50vw] max-w-[80vh] bg-cover text-center pt-[7vw] text-[#ffdebd] text-[2vw] md:text-[2.5vw]'>
        <Image 
          src={HaggleChip}
          width={900}
          height={900}
          alt="Haggle Logo"
        />
        <a className="absolute bottom-[19%] left-[50%] -translate-x-[50%] -translate-y-[25%] bg-[#1b4381] w-[10vw] h-[4.5vw] xs:rounded-[25px] xxs:rounded-[10px] border-[.5vh] border-[#5c6ead]" href="/play">Play</a>
      </div>
    </div>
  );
}