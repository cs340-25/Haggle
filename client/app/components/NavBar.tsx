import React from 'react';

const NavBar = () => {
  return (
    <div className='absolute top-0 left-0 h-[50px] flex justify-between items-center w-[100%] px-10 bg-[#1b4381] text-[#ffdebd]'>
        <a href="/"><b>Haggle</b></a>
        <div className='flex gap-5'>
          <a href="/testing">Testing</a>
          <a href="/lobbies">Lobbies</a>
          <a href="/rules">Rules</a>
        </div>
        <hr className='w-[100%] absolute mt-[50px] ml-[-35px] border-[#5c6ead]'></hr>
    </div>
  )
}

export default NavBar;
