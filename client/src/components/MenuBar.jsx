import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, useColorMode } from '@chakra-ui/react';
import { IoMdSettings } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { UseTheme } from './ThemeContext';
import { BsToggleOn } from "react-icons/bs";
import { BsToggleOff } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import EditProfile from '../pages/profile/EditProfile';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function MenuBar({ toggleTheme }) {
    const { colorMode } = useColorMode();
    const darkTheme = UseTheme();
const navigate=useNavigate()
    return (
        <Menu >
            <MenuButton
                as={IconButton}
                fontSize={'2rem'}
                aria-label='Options'
                icon={<IoMdSettings />}
                variant='ghost'
                color
            />
            <MenuList bg={colorMode === 'dark' ? 'gray.800' : 'white'} color={colorMode === 'dark' ? 'white' : 'gray.800'}>
                <MenuItem
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    icon={<MdDarkMode />}
                    onClick={toggleTheme}
                >
                    <span>Dark Mode</span>
                    <IconButton
                        aria-label='Toggle Dark Mode'
                        fontSize={'2rem'}
                        icon={darkTheme ? <BsToggleOn /> : <BsToggleOff />}
                        bg={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
                        color={colorMode === 'dark' ? 'white' : 'gray.800'}
                        _hover={{ bg: colorMode === 'dark' ? 'gray.600' : 'gray.300' }}
                        _active={{ bg: colorMode === 'dark' ? 'gray.600' : 'gray.300' }}
                    />

                </MenuItem>
                <MenuItem
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    icon={<FaEdit />}
                    onClick={()=>navigate('/profile')}
                    >

                    <span>
                        Edit Profile
                    </span>
                    </MenuItem>
            </MenuList>
        </Menu>
    );
}

export default MenuBar;
