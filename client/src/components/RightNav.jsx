import React, { useState } from 'react';
import colorPallete from './colorPallete';
function Category({ handleFilter }) {
    const [activeCategory, setActiveCategory] = useState(null);
  const theme=colorPallete()
    const handleClick = (category) => {
      if (activeCategory !== category) {
        handleFilter(category);
        setActiveCategory(category);
      }
    };
  
    return (
      <div
        id='category'
        className='sticky top-0 left-0 w-64 shadow-md h-full  p-4 my-5'
        style={{background:theme.bg, color:theme.color}}
      >
        <div className='flex flex-col space-y-2'>
          
          <button
            onClick={() => window.location.href('/')}
            className={`w-full py-3 font-bold text-xl  rounded ${
              activeCategory === null ? 'bg-gray-200' : 'hover:bg-gray-200'
            }`}
          >
            Suggested
          </button>
          <hr className='border-gray-400' />
          <button
            onClick={() => handleClick('Frontend Programming')}
            className={`w-full py-3 font-bold text-lg  rounded ${
              activeCategory === 'Frontend Programming' ? 'bg-gray-200' : 'hover:bg-gray-200'
            }`}
          >
            Frontend Programming
          </button>
          <hr className='border-gray-400' />
          <button
            onClick={() => handleClick('Backend Programming')}
            className={`w-full py-3 font-bold text-lg  rounded ${
              activeCategory === 'Backend Programming' ? 'bg-gray-200' : 'hover:bg-gray-200'
            }`}
          >
            Backend Programming
          </button>
          <hr className='border-gray-400' />
          <button
            onClick={() => handleClick('FullStack Programming')}
            className={`w-full py-3 font-bold text-lg  rounded ${
              activeCategory === 'FullStack Programming' ? 'bg-gray-200' : 'hover:bg-gray-200'
            }`}
          >
            Fullstack Programming
          </button>
          <hr className='border-gray-400' />
          <button
            onClick={() => handleClick('DevOps')}
            className={`w-full py-3 font-bold text-lg  rounded ${
              activeCategory === 'DevOps' ? 'bg-gray-200' : 'hover:bg-gray-200'
            }`}
          >
        DevOps
          </button>
          <hr className='border-gray-400' />
          <button
            onClick={() => handleClick('UI/UX')}
            className={`w-full py-3 font-bold text-lg  rounded ${
              activeCategory === 'UI/UX' ? 'bg-gray-200' : 'hover:bg-gray-200'
            }`}
          >
            UI/UX
          </button>
          <hr className='border-gray-400' />
          <button
            onClick={() => handleClick('Machine Learning')}
            className={`w-full py-3 font-bold text-lg  rounded ${
              activeCategory === 'Machine Learning' ? 'bg-gray-200' : 'hover:bg-gray-200'
            }`}
          >
            Machine Learning
          </button>
          <hr className='border-gray-400' />
          <button
            onClick={() => handleClick('Mobile-App Development')}
            className={`w-full py-3 font-bold text-lg  rounded ${
              activeCategory === 'Mobile-App Development' ? 'bg-gray-200' : 'hover:bg-gray-200'
            }`}
          >
            Mobile-App Development
          </button>
          <hr className='border-gray-400' />
          <button
            onClick={() => handleClick('Data Visualization')}
            className={`w-full py-3 font-bold text-lg  rounded ${
              activeCategory === 'Data Visualization' ? 'bg-gray-200' : 'hover:bg-gray-200'
            }`}
          >
            Data Visualization
          </button>
          <hr className='border-gray-400' />
          <button
            onClick={() => handleClick('Cyber Security')}
            className={`w-full py-3 font-bold text-lg  rounded ${
              activeCategory === 'Cyber Security' ? 'bg-gray-200' : 'hover:bg-gray-200'
            }`}
          >
            Cyber Security
          </button>
        </div>
      </div>
    );
  }
  
  export default Category;