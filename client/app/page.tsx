import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <div className="w-[100%] h-[100vh] flex flex-col items-center justify-center gap-5 relative">
      <NavBar />
      
      <p>Welcome to the root page</p>
    </div>
  );
}