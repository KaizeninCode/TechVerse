import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, HStack, Heading, Image, SimpleGrid, Stack, Text, useColorMode } from '@chakra-ui/react';
import { CiHeart } from "react-icons/ci";
import { BiComment } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import colorPallete from './colorPallete';
import { Tooltip } from '@chakra-ui/react';
import { useGetAllPostsQuery } from '../features/postApi';
import MenuBar from './MenuBar';
import PostMenu from './postMenu';
const PostContainer = () => {
    const theme = colorPallete();
    const [content, setContent] = useState([]);
    const { colorMode } = useColorMode();
    
    useEffect(() => {
      const fetchContent = async () => {
        try {
          const response = await fetch('http://localhost:5555/contents');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setContent(data);
        } catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
        }
      };
  
      fetchContent();
    }, []);
  
    return (
      <SimpleGrid className='lg:w-[60%] overflow-y-scroll gap-4 p-4 mx-5 my-3 border border-gray-400 rounded-md' id='posts'>
        {content?.map(item => (
          <Card key={item.id} bg={theme.bg} color={theme.color} className='border-b border-gray-400'>
            <CardHeader className='flex justify-between'>
           
              <Flex justify={'space-between'} alignItems={'center'}>
                <Image src={item.image} w={16} h={16} mr={5} />
                <Stack mr={'auto'}>
                  <Heading fontSize={20} className='text-[#33658a]'>@{item.user_id}
                   <Text fontSize={12} className='text-gray-700'>{item.created_at.slice(0,16)}</Text>
                  </Heading>
                  <Text>{item.title}</Text>
                 
                </Stack>
              </Flex>
            <PostMenu/>
            </CardHeader>
            <CardBody className='font-raleway'>
              <Text>{item.description}</Text>
              {item.type ? (
                item.type.includes('image/') ? (
                  <Image src={item.type} w={'100%'} h={'400px'} />
                ) : item.type.includes('video/') ? (
                  <video controls src={item.type} style={{ width: '100%', height: '400px' }} />
                ) : item.type.includes('audio/') ? (
                  <audio controls src={item.type} style={{ width: '100%' }} />
                ) : null
              ) : (
                <Text>No media available</Text>
              )}
            </CardBody>
            <CardFooter>
              <HStack className='font-raleway max-lg:mx-auto '>
              <Button variant={'ghost'} color={'#33658a'}><CiHeart /></Button>
                <Button variant={'ghost'} color={'#33658a'}><BiComment /></Button>
                <Button variant={'ghost'} color={'#33658a'}><RiShareForwardLine /></Button>
              </HStack>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    );
}

export default PostContainer;
