import React, { useState } from 'react'
import PostCard from './PostCard'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, HStack, Heading, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { CiHeart } from "react-icons/ci";
import { BiComment } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { IoMdHeart } from "react-icons/io";

const PostContainer = () => {
    const[likeLeftIcon, setLikeLeftIcon] = useState(<CiHeart/>)

    const handleLikeClick = () => {
        likeLeftIcon === <CiHeart/> ? setLikeLeftIcon(<IoMdHeart />) : null
        likeLeftIcon === <IoMdHeart/> ? setLikeLeftIcon(<CiHeart />) : null
    }
    const dummyContent = [
        {
            name: 'skippyrednblue',
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae soluta molestiae dignissimos distinctio hic, facere eaque illo voluptate, recusandae totam voluptatem adipisci nobis consequuntur reprehenderit?',
            time: 'Some Time',
            location: 'Place 1',
            image: '/logo-transparent.png'
        },
        {
            name: 'skippygreen',
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae soluta molestiae dignissimos distinctio hic, facere eaque illo voluptate, recusandae totam voluptatem adipisci nobis consequuntur reprehenderit?',
            time: 'Some Time',
            location: 'Place 2',
            image: '/logo-transparent.png'
        },
        {
            name: 'hedgeinarush',
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae soluta molestiae dignissimos distinctio hic, facere eaque illo voluptate, recusandae totam voluptatem adipisci nobis consequuntur reprehenderit?',
            time: 'Some Time',
            location: 'Place 3',
            image: '/logo-transparent.png'
        },
        {
            name: 'allfourelements',
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae soluta molestiae dignissimos distinctio hic, facere eaque illo voluptate, recusandae totam voluptatem adipisci nobis consequuntur reprehenderit?',
            time: 'Some Time',
            location: 'Place 4',
            image: '/logo-transparent.png'
        },
        {
            name: 'bloodandwater',
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae soluta molestiae dignissimos distinctio hic, facere eaque illo voluptate, recusandae totam voluptatem adipisci nobis consequuntur reprehenderit?',
            time: 'Some Time',
            location: 'Place 5',
            image: '/logo-transparent.png'
        },
    ]
  return (
    <SimpleGrid className='w-[60%] overflow-y-scroll gap-4  mx-5 my-3' id='posts'>
      {dummyContent.map(item => (
        <Card key={item.name}>
            <CardHeader>
                <Flex justify={'space-between'} alignItems={'center'}>
                        <Image src={item.image} w={16} h={16} mr={5}/>
                    <Stack mr={'auto'}>
                        <Heading fontSize={20} className='text-[#33658a]'>@{item.name}</Heading>
                        <Text>{item.time}</Text>
                    </Stack>
                    <Text ml={5} pr={8} fontFamily={'Montserrat'} fontSize={14}>{item.location}</Text>
                </Flex>
            </CardHeader>
            <CardBody className='font-raleway'>
                <Text>{item.description}</Text>
            </CardBody>
            <CardFooter>
                <HStack className='font-raleway'>
                    <Button variant={'ghost'} color={'#33658a'} leftIcon={likeLeftIcon} onClick={handleLikeClick}>Like</Button>
                    <Button variant={'ghost'} color={'#33658a'} leftIcon={<BiComment />}>Comment</Button>
                    <Button variant={'ghost'} color={'#33658a'} leftIcon={<RiShareForwardLine />}>Share</Button>
                </HStack>
            </CardFooter>
        </Card>
      ))}

    </SimpleGrid>
  )
}

export default PostContainer
