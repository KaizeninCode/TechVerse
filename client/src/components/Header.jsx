import { Box, Heading, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, StackDivider, VStack } from '@chakra-ui/react'
import { RxHamburgerMenu } from "react-icons/rx";
import React from 'react'
import { navlinks } from './Navbar';

const Header = () => {
  return (
    <Box as='header' className='w-full px-4 py-2 lg:hidden flex items-start justify-between'>
        <Box className='flex items-center justify-center'>
            <Image src="/logo-transparent.png" alt="TechVerse logo" w={'30px'} h={'30px'} className='lg:hidden mr-3'/>
            <Heading textColor={'#33658a'} fontFamily={'Montserrat'} fontWeight={'semibold'} fontSize={'20px'}>
                TechVerse
            </Heading>
        </Box>
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<RxHamburgerMenu className='text-[#33658a]'/>}
                variant='outline'
                size={'sm'}
            />
            <MenuList>
                <VStack divider={<StackDivider borderColor={'gray.200'} align={'start'}/>}>
                    {navlinks.map(link => (
                        <MenuItem  as='a' key={link.url} href={link.url} className='text-[#33658a] text-sm font-montserrat my-1 flex items-center justify-start'>
                            {link.icon} &nbsp; &nbsp;{link.name}
                        </MenuItem>
                    ))}
                </VStack>
            </MenuList>
        </Menu>
    </Box>
  )
}

export default Header
