import { Box, Heading, Image, Link, StackDivider, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { TfiHome } from "react-icons/tfi";
import { RiCompassLine } from "react-icons/ri";
import { CiSquarePlus } from "react-icons/ci";
import { IoMdPerson } from "react-icons/io";
import { NavLink } from 'react-router-dom';

export const navlinks = [
    {
        name: 'Home',
        link: '/',
        icon: <TfiHome />
    },
    {
        name: 'Explore',
        link: '/explore',
        icon: <RiCompassLine />
    },
    {
        name: 'Post',
        link: '/post',
        icon: <CiSquarePlus />
    },
    {
        name: 'Profile',
        link: '/profile',
        icon: <IoMdPerson />
    },
]

const linkStyles = {
    color: '#33658a',
    transition: '.5s ease-in-out',
    'hover': {
        backgroundColor: '#33658a',
        color: '#f0f0f0'
    }
}
const Navbar = () => {
  return (
    <Box as='nav' className='w-[20%] max-lg:hidden flex flex-col justify-center bg-gray-200 h-screen'>
      <Box className='flex flex-col items-center w-[100px] m-auto pt-3'>
        <Image src="/logo-transparent.png" alt="TechVerse logo" w={'100px'} h={'100px'}/>
        <Heading textColor={'#33658a'} fontFamily={'Montserrat'} fontWeight={'semibold'}>
            TechVerse
        </Heading>
      </Box>
      <VStack divider={<StackDivider borderColor={'#33658a'}/>} className='mt-10'>
        {navlinks.map(link => (
            <Box key={link.url}  className='flex items-center justify-center'>
                <NavLink to={link.link} textDecoration='none' className='text-[#33658a] text-lg font-montserrat my-3 flex items-center justify-start'>
                    {link.icon}&nbsp;{link.name}
                </NavLink>
            </Box>
        ))}
      </VStack>
    </Box>
  )
}

export default Navbar
