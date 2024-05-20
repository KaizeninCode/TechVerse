import React from 'react'
import Navbar from './Navbar'
import Header from './Header'
import RightNav from './RightNav'
import { useLocation } from 'react-router-dom'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, HStack, Heading, Image, SimpleGrid, Stack, Text, useColorMode } 
from '@chakra-ui/react';
import PostMenu from './postMenu'
import colorPallete from './colorPallete';
import { CiHeart } from "react-icons/ci";
import { BiComment } from "react-icons/bi"
import { RiShareForwardLine } from "react-icons/ri";
import useDisclosure from "../utils/useDisclosure";
import Comments from './Comments'
function PostDetails() {
    const currentPost=useLocation()
    const post=currentPost.state?.post
    console.log(post.title)
    const theme = colorPallete();
    const { isOpen, handleDisclose } = useDisclosure();
  return (
    <div className="w-full h-screen flex max-lg:flex-col justify-between overflow-y-scroll">
      <Navbar/>
      <Header/>
      <SimpleGrid className='lg:w-[60%] overflow-y-scroll gap-4 p-4 mx-5 my-3 border border-gray-400 rounded-md' id='posts'>
        
          <Card key={post?.id} bg={theme.bg} color={theme.color} className='border-b border-gray-400'>
            <CardHeader className='flex justify-between'>
          
            <Flex justify={'space-between'} alignItems={'center'}>
                <Image src={post?.image} w={16} h={16} mr={5} />
                <Stack mr={'auto'}>
                  <Heading fontSize={20} className='text-[#33658a]'>@{post?.user_id}
                   <Text fontSize={12} className='text-gray-700'>{post?.created_at.slice(0,16)}</Text>
                  </Heading>
                  <Text>{post?.title}</Text>
                 
                </Stack>
              </Flex>
           
              
            <PostMenu />
            </CardHeader>
            <CardBody className='font-raleway'>
              <Text>{post?.description}</Text>
              {post.type ? (
                post.type.includes('image/') ? (
                  <Image src={post.type} w={'100%'} h={'400px'} />
                ) : post.type.includes('video/') ? (
                  <video controls src={post.type} style={{ width: '100%', height: '400px' }} />
                ) : post.type.includes('audio/') ? (
                  <audio controls src={post.type} style={{ width: '100%' }} />
                ) : null
              ) : (
                <Text>No media available</Text>
              )}
            </CardBody>
            <CardFooter>
              <HStack className='font-raleway max-lg:mx-auto '>
              <Button variant={'ghost'} color={'#33658a'}><CiHeart /></Button>
                <Button variant={'ghost'} color={'#33658a'} onClick={() => handleDisclose(post.id)}><BiComment /></Button>
                <Button variant={'ghost'} color={'#33658a'}><RiShareForwardLine /></Button>
              </HStack>
            </CardFooter>
            <Box display={isOpen[post.id] ? "block" : "none"}>
          <Comments postId={post.id} />
        </Box>
          </Card>
        
      </SimpleGrid>
      <RightNav/>
    </div>
  )
}

export default PostDetails
