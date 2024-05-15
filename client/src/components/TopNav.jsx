import React from 'react'
import { UseTheme } from './ThemeContext'


import SearchBar from './SearchBar';
import MenuBar from './MenuBar';
import { MdNotificationsActive } from "react-icons/md";
import { useColorMode } from '@chakra-ui/react';
function TopNav({toggleTheme, theme}) {
    const darkTheme=UseTheme()
    const colorMode=useColorMode()
  return (
    <div className=' p-3 flex justify-around shadow-lg mb-1 border-gray-700'>
    <SearchBar theme={theme}/>
      <nav className='inline-flex'>
     <MenuBar toggleTheme={toggleTheme} theme={theme}/>
     <div className='flex p-1 ml-2'>
      <MdNotificationsActive fontSize={'2rem'} top={'1rem'} position={'relative'} /> 
      {/* <span style={{ background:theme.bg, color:theme.color }} className='rounded-full  p-1 w-6 h-6 flex items-center justify-center'>0</span>  */}
    </div>

      </nav>
    </div>
  )
}

export default TopNav
