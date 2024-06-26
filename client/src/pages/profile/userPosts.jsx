import {useState,useEffect} from 'react'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, HStack, Heading, Image, SimpleGrid, Stack, Text, useColorMode } from '@chakra-ui/react';
import ProfileNav from './ProfileNav'
import { selectUserData } from '../../features/AuthSlice'
import { useSelector } from 'react-redux'
import colorPallete from '../../components/colorPallete';
import { CiHeart } from "react-icons/ci";
import { BiComment } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { Link } from'react-router-dom';
import PostMenu from '../../components/postMenu';
import useDisclosure from '../../utils/useDisclosure';
import Comments from '../../components/Comments';
import HandleLikes from '../../components/HandleLikes';
function UserPosts() {
  const [userPosts, setUserPosts]= useState([])
  const user=useSelector(selectUserData)
  const theme=colorPallete()
  const filterUserPosts=userPosts.filter(userPost => userPost.user_id ===user.username)
  const { isOpen, handleDisclose } = useDisclosure();
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('https://techverse-bzdz.onrender.com/contents');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserPosts(data);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };

    fetchContent();
  }, []);
  return (
    <div className='lg:w-[60%] overflow-y-scroll gap-4 mx-5 my-3 ' id="posts" >
    <ProfileNav/>
    {
      filterUserPosts.map(post => (
        <Card key={post.id} bg={theme.bg} color={theme.color} className='border-b border-gray-400'>
            <CardHeader className='flex justify-between'>
           <Link to={`/posts/${post.id}`} state={{post}}>
            <Flex justify={'space-between'} alignItems={'center'}>
                <Image src={post.image} w={16} h={16} mr={5} />
                <Stack mr={'auto'}>
                  <Heading fontSize={20} className='text-[#33658a]'>@{post.user_id}
                   <Text fontSize={12} className='text-gray-700'>{post.created_at.slice(0,16)}</Text>
                  </Heading>
                  <Text>{post.title}</Text>
                 
                </Stack>
              </Flex>
           </Link>
              
            <PostMenu postId={post.id} categoryId={post.category_id} />
            </CardHeader>
            <CardBody className='font-raleway'>
              <Text>{post.description.slice(0,30)}........</Text>
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
              <HandleLikes postId={post.id}/>
              <Button variant={'ghost'} color={'#33658a'}   onClick={() => handleDisclose(post.id)}>
              <BiComment />
              
              </Button>
                <Button variant={'ghost'} color={'#33658a'}><RiShareForwardLine /></Button>
              </HStack>
            </CardFooter>
            <Box display={isOpen[post.id] ? "block" : "none"}>
          <Comments postId={post.id} />
        </Box>
          </Card>
      ))
    }
    
    </div>
  )
}

export default UserPosts
