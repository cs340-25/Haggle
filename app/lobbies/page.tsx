import LobbyCrud from "../components/LobbyCrud";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div className="w-[100%] h-[100vh] flex flex-col items-center gap-5 relative">
      <NavBar />
      
      <p className="mt-[100px]">Welcome to the root page</p>

      <LobbyCrud />
    </div>
  );
}