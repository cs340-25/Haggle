import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <div className="w-[100%] h-[100vh] flex flex-col items-center gap-5 relative bg-[#1d4325] font-impact font-black">
      <NavBar />
      
      <div className='mt-[75px] min-h-[600px] min-w-[600px] bg-[url("/chip.svg")] bg-cover text-center pt-[325px] text-[#ffdebd] text-[45px]'>
        <button className="bg-[#1b4381] p-[0px] pl-[10px] pr-[10px] rounded-[25px] border-4 border-[#5c6ead]">Offline</button>
      </div>

      <div className="absolute flex items-center mt-[40%] min-w-[90%] text-[50px] text-[#ffdebd]">
        <button className="bg-[#1b4381] p-[15px] pl-[75px] pr-[75px] rounded-[30px] border-4 border-[#5c6ead]">Random</button>
        <button className="bg-[#1b4381] p-[15px] pl-[75px] pr-[75px] rounded-[30px] border-4 border-[#5c6ead] ml-[10%]">Join</button>
        <input type="text" placeholder="Enter Join Code" className="peer bg-[#1b4381] p-[15px] rounded-[30px] border-4 border-[#5c6ead] ml-[2%] text-[30px] text-[#ffdebd]"/>
        <button className="bg-[#1b4381] p-[15px] pl-[75px] pr-[75px] rounded-[30px] border-4 border-[#5c6ead] ml-[10%]">Host</button>
      </div>

    </div>
  );
}