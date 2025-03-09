import Image from "next/image";
import NavBar from "./components/NavBar";
import HaggleChip from "@/public/chip.svg";
import HostButton from "./components/HostButton";


export default function Home() {
  return (
    <div className="w-[100%] min-h-[100vh] flex flex-col sm:justify-between pb-10 items-center gap-5 relative bg-[#1d4325] font-impact font-black">
      <NavBar />
      
      <div className='relative w-[60vw] max-w-[400px] bg-cover text-center pt-[14vh] text-[#ffdebd] text-[4.75vw] md:text-[36.48px]'>
        <Image 
          src={HaggleChip}
          width={900}
          height={900}
          alt="Haggle Logo"
        />
        <button className="absolute bottom-[19%] xxs:bottom-[22%] xs:bottom-[25%] left-[50%] -translate-x-[50%] bg-[#1b4381] pl-[1vh] pr-[1vh] rounded-[25px] border-[.5vh] border-[#5c6ead]">Offline</button>
      </div>

      <div className="flex flex-col gap-10 sm:flex-row sm:gap-0 mt-12 sm:mt-0 justify-between items-center min-w-[90%] text-[3vw] text-[#ffdebd]">
        <button className="bg-[#1b4381] p-[2vh] px-[3vw] rounded-[30px] border-[.5vh] border-[#5c6ead]">Random</button>
        <div className="flex gap-[3vw]">
          <button className="bg-[#1b4381] p-[2vh] px-[3vw] rounded-[30px] border-[.5vh] border-[#5c6ead]">Join</button>
          <input type="text" placeholder="Enter Join Code" className="peer bg-[#1b4381] p-[2vh] rounded-[30px] border-[.5vh] border-[#5c6ead] text-[2vw] text-[#ffdebd]"/>
        </div>
        <HostButton />
      </div>

    </div>
  );
}