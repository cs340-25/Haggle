import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <div className="w-[100%] h-[100vh] flex flex-col items-center gap-5 relative bg-[#1d4325]">
      <NavBar />
      
      <div className='mt-[75px] min-h-[500px] min-w-[500px] bg-[url("/chip.svg")] bg-cover text-center pt-[250px] font-impact font-black text-[#1b4381] text-[75px]'>
      </div>

      {/* <img src="/chip.svg" ></img> */}

    </div>
  );
}