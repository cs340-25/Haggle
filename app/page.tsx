import Image from "next/image";
import NavBar from "./components/NavBar";
import HaggleChip from "@/public/chip.svg";
import React from 'react';

export default function Home() {

  return (
    <div className="w-[100%] min-h-[100vh] flex flex-col sm:justify-between pb-10 items-center gap-5 relative bg-[#1d4325] font-impact font-black">
      <NavBar />
      
      <div className='relative w-[70vw] max-w-[500px] bg-cover text-center pt-[14vh] text-[#ffdebd] text-[4.75vw] md:text-[36.48px]'>
        <Image 
          src={HaggleChip}
          width={900}
          height={900}
          alt="Haggle Logo"
        />
        <a className="absolute bottom-[19%] xxs:bottom-[22%] xs:bottom-[25%] left-[50%] -translate-x-[50%] bg-[#1b4381] pl-[1vh] pr-[1vh] xs:rounded-[25px] xxs:rounded-[10px] border-[.5vh] border-[#5c6ead]" href="/offline">Offline</a>
      </div>

      <div className="flex flex-col xxs:gap-3 xs:gap-10 sm:flex-row sm:gap-[20vw] mt-12 sm:mt-0 justify-center items-center min-w-[90%] xs:text-[3vw] xxs:text-[7vw] text-[#ffdebd]">

        <a
          className="bg-[#1b4381] p-[2vh] px-[3vw] xs:rounded-[30px] xxs:rounded-[20px] border-[.5vh] xxs:text-[7vw] xs:text-[3vw] border-[#5c6ead] hover:bg-[#244c89]"
          href="/rules"
        >Rules</a> 
        <a
          className="bg-[#1b4381] p-[2vh] px-[3vw] xs:rounded-[30px] xxs:rounded-[20px] border-[.5vh] xxs:text-[7vw] xs:text-[3vw] border-[#5c6ead] hover:bg-[#244c89]"
          href="/play"
        >Play</a>
      </div>
    </div>
  );
}