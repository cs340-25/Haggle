import React from 'react';

const NavBar = () => {
  return (
    <div className='absolute top-0 left-0 h-[7vh] flex justify-between items-center w-[100%] px-10 bg-[#1b4381] text-[#ffdebd] text-[1.5vh] xxs:text-[1.9vh] xs:text-[2.5vh] font-light border-b-[1px] border-b-[#5c6ead]'>
        <a href="/" className='hidden xxs:block'><b>Haggle</b></a>
        <div className='flex justify-between w-full xxs:w-fit xxs:justify-start gap-5'>
          <a href="/" className='block xxs:hidden'>Haggle</a>
          <a href="/testing">Testing</a>
          <a href="/lobbies">Lobbies</a>
          <a href="/rules">Rules</a>
        </div>
    </div>
  )
}

export default NavBar;
