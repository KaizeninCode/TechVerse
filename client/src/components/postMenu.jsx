import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, useColorMode } from '@chakra-ui/react';
import { IoMdSettings } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { UseTheme } from './ThemeContext';
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaFlag } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdUnsubscribe } from "react-icons/md";
import useAuth from '../features/UseAuth';
import { TiUserAdd } from "react-icons/ti";
import { FaShare } from "react-icons/fa6";
import DeletePost from './deletePost';
import { useLocation } from 'react-router-dom';
function PostMenu() {
   const colorMode=useColorMode()
    const isAuthorized = useAuth(['staff', 'admin']);
    const isAdmin = useAuth(['admin','staff']);
    const isStaff = useAuth(['staff']);
    const isStudent = useAuth(['student']);
    const currentPost=useLocation()
    const post=currentPost.state?.item
const navigate=useNavigate()
    return (
        <Menu >
            <MenuButton
                as={IconButton}
                fontSize={'1.5rem'}
                aria-label='Options'
                icon={<BiDotsVerticalRounded />}
                variant='ghost'
                color
            />
            <MenuList bg={colorMode === 'dark' ? 'gray.800' : 'white'} color={colorMode === 'dark' ? 'white' : 'gray.800'}>
            {isAdmin &&<MenuItem
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    icon={<MdOutlinePublishedWithChanges/>}>
                   <span>Publish</span>
                </MenuItem>}
                
                {isStaff &&<MenuItem
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                   icon={<FaEdit/>}
                    >

                    <span>
                        Edit Post
                    </span>
                    </MenuItem>}
                    {isStudent && 
                    <MenuItem
                     display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    icon={<MdUnsubscribe/>}
                     >
                    <span>Subscribe</span>
                    </MenuItem>}
                    {isStudent && 
                    <MenuItem
                     display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    icon={<FaShare/>}
                     >
                    <span>Share</span>
                    </MenuItem>}
                   {isAdmin&& <MenuItem
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    
                   >
                   <DeletePost post={post}/>
                   </MenuItem>}
                  
            </MenuList>
        </Menu>
    );
}

export default PostMenu;
