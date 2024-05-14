import React from 'react'
import { UseTheme } from './ThemeContext'
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { IconButton } from '@chakra-ui/react';
import SearchBar from './SearchBar';
import MenuBar from './MenuBar';
function TopNav({toggleTheme, theme}) {
    const darkTheme=UseTheme()
  return (
    <div  className=' p-3 flex justify-around border-b border-gray-700'>
    <SearchBar theme={theme}/>
      <nav>
     <MenuBar toggleTheme={toggleTheme} theme={theme}/>

      </nav>
    </div>
  )
}

export default TopNav
