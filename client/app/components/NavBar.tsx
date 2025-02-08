import React from 'react';

const NavBar = () => {
  return (
    <div className='absolute top-0 left-0 h-[50px] flex justify-between items-center w-[100%] px-10 bg-neutral-800'>
        <a href="/"><b>Haggle</b></a>
        <a href="/testing">Testing</a>
    </div>
  )
}

export default NavBar;
