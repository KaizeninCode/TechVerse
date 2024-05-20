import { Box, Heading, Image, StackDivider, VStack } from '@chakra-ui/react';
import React from 'react';
import { TfiHome } from "react-icons/tfi";
import { RiCompassLine } from "react-icons/ri";
import { IoMdPerson } from "react-icons/io";
import { LiaSignInAltSolid } from "react-icons/lia";
import colorPallete from './colorPallete';
import { NavLink } from 'react-router-dom';
import Post from '../pages/Post';
import LogOut from '../pages/LogOut';
import useAuth from '../features/UseAuth';// Adjust the import path based on your project structure
import { selectUserData } from '../features/AuthSlice';
import { useSelector } from 'react-redux';
export const navlinks = [
  {
    name: "Home",
    link: "/",
    icon: <TfiHome />,
  },
  {
    name: "Explore",
    link: "/explore",
    icon: <RiCompassLine />,
  },
  {
    name: "Profile",
    link: "/profile",
    icon: <IoMdPerson />,
  },
  {
    name: "Sign In",
    link: "/SignIn",
    icon: <LiaSignInAltSolid />,
  },
];

const linkStyles = {
  color: '#33658a',
  transition: '.5s ease-in-out',
  'hover': {
    backgroundColor: '#33658a',
    color: '#f0f0f0',
  },
};

const Navbar = () => {
  const theme = colorPallete();
  const isAuthorized = useAuth(['staff', 'admin', 'student']);
  const isAdmin = useAuth(['staff', 'student'])
const user=useSelector(selectUserData)
  return (
    <Box as='nav' bg={theme.color4} color={theme} className='w-[20%] max-lg:hidden shadow-lg flex flex-col justify-center'>
      <Box className='flex flex-col items-center w-[100px] m-auto pt-3'>
        <Image src="/logo-transparent.png" alt="TechVerse logo" w={'100px'} h={'100px'} />
        <Heading textColor={'#33658a'} fontFamily={'Montserrat'} fontWeight={'semibold'}>
          TechVerse
        </Heading>
      </Box>

      <VStack divider={<StackDivider borderColor={'#33658a'} />} className='mt-10'>
        {navlinks.map(link => (
          <Box key={link.name} className='flex items-center justify-between w-[150px]'>
            <NavLink to={link.link} textDecoration='none' style={{ color: theme.color2 }} className='text-lg font-montserrat font-bold my-3 flex items-center justify-start'>
              {link.icon}&nbsp;{link.name}
            </NavLink>
          </Box>
        ))}
        {isAuthorized && <LogOut />}
      
      </VStack>

      {isAdmin &&<Post />}
      
    </Box>
  );
};

export default Navbar;
