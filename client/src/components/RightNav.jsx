import { Box, Button, Card, Flex, HStack, Heading, Image, SimpleGrid, StackDivider, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const RightNav = ({theme}) => {

    const sampleProfiles = [
        {
            username: 'allfourelements',
            name: 'Aang Kyatso',
            image: '/logo-transparent.png'
        },
        {
            username: 'fakemom',
            name: 'Sapphire Fire',
            image: '/logo-transparent.png'
        },
        {
            username: 'fakedad',
            name: 'Wang Fire',
            image: '/logo-transparent.png'
        },
        {
            username: 'blindbandit',
            name: 'Toph Beifong',
            image: '/logo-transparent.png'
        },
        {
            username: 'firelordzuko',
            name: 'Prince Zuko',
            image: '/logo-transparent.png'
        },
    ]
    return (
        <div style={{background:theme.bg, color:theme.color2}} className='w-[25%] max-lg:hidden flex flex-col items-center justify-between border-l border-gray-700 bg-gray-200 h-screen'>
            <Box>
                <Heading fontSize={20} fontFamily={'Raleway'} color={'#33658a'} className='text-center py-10 underline underline-offset-8'>Suggested</Heading>
                {sampleProfiles.map(profile => (
                    <Box className='border-[#33658a] rounded-lg mb-8 px-4 flex items-center ' id='suggested' key={profile.username}>
                        <HStack  display={'flex'} className='w-full'>
                            <Image src={profile.image} w={10} h={10}/>
                            <Box>
                                <Heading as={'h4'} fontSize={16} color={'#33658a'} fontFamily={'Montserrat'}>{profile.name}</Heading>
                                <Text fontSize={12}>@{profile.username}</Text>
                            </Box>
                        </HStack>
                    </Box>
                ))}
                {/* <Button color={'#33658a'} fontFamily={'Montserrat'} leftIcon={<LiaDoorOpenSolid />} className='mt-14 ml-8'>
                    Log Out
                </Button> */}
            </Box>
        </div>
      )
}

export default RightNav
