import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <div className="w-[100%] h-[100vh] flex flex-col items-center gap-5 relative bg-[#1d4325] font-impact font-black">
      <NavBar />
      
      <div className='mt-[10vh] h-[60vh] w-[60vh] bg-[url("/chip.svg")] bg-cover text-center pt-[32.5vh] text-[#ffdebd] text-[5.75vh]'>
        <button className="bg-[#1b4381] pl-[1vh] pr-[1vh] rounded-[25px] border-[.5vh] border-[#5c6ead]">Offline</button>
      </div>

      <div className="absolute flex items-center ml-[5.5vw] mt-[80vh] min-w-[90%] text-[3vw] text-[#ffdebd]">
        <button className="bg-[#1b4381] p-[2vh] pl-[3vw] pr-[3vw] rounded-[30px] border-[.5vh] border-[#5c6ead]">Random</button>
        <button className="bg-[#1b4381] p-[2vh] pl-[3vw] pr-[3vw] rounded-[30px] border-[.5vh] border-[#5c6ead] ml-[5vw]">Join</button>
        <input type="text" placeholder="Enter Join Code" className="peer bg-[#1b4381] p-[2vh] rounded-[30px] border-[.5vh] border-[#5c6ead] ml-[2%] text-[2vw] text-[#ffdebd]"/>
        <button className="bg-[#1b4381] p-[2vh] pl-[3vw] pr-[3vw] rounded-[30px] border-[.5vh] border-[#5c6ead] ml-[5vw]">Host</button>
      </div>

    </div>
  );
}