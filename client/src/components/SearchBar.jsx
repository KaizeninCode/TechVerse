import React from 'react'
import { FaSearch } from "react-icons/fa";
import colorPallete from './colorPallete';
function SearchBar({value, handleChange}) {
  const theme=colorPallete()
  return (
    <div style={{background:theme.bg}} className='w-full items-center justify-center flex' >
     <div className='relative w-1/2 mx-auto'>
        <input
          id='search'
          type='text'
          value={value}
          onChange={handleChange}
          className='w-full p-3 pr-16 rounded-full shadow-lg'
         placeholder='Search...'
         style={{background:theme.color3, color:theme.color}}
        />
        <FaSearch className='absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-2xl text-gray-500' />
      </div>
    </div>
  )
}

export default SearchBar
