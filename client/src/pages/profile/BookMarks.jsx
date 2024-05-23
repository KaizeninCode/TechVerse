import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  Stack,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";
import { BiComment } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import colorPallete from '../../components/colorPallete';
import PostMenu from '../../components/postMenu';
import useDisclosure from '../../utils/useDisclosure';
import Comments from '../../components/Comments';
import Navbar from '../../components/Navbar';
import RightNav from '../../components/RightNav';
import ProfileNav from './ProfileNav';
import HandleLikes from '../../components/HandleLikes';

function BookMarks() {
  const wishes = useSelector((state) => state.wish);
  const { isOpen, handleDisclose } = useDisclosure();
  const theme = colorPallete();

  return (
    <div className="w-full h-screen flex max-lg:flex-col justify-between overflow-y-scroll">
      <Navbar />
      <div className='lg:w-[60%] overflow-y-scroll gap-4 mx-5 my-3'>
      <ProfileNav/>
        <h1 className='text-center font-bold text-2xl'>My Wish List</h1>
        {wishes.favItems.length === 0 ? (
          <h1 className="text-center mt-5 text-3xl">No Saves for Watch Later</h1>
        ) : (
          wishes.favItems.map(post => (
            <Card key={post.id} bg={theme.bg} color={theme.color} className='border-b border-gray-400'>
              <CardHeader className='flex justify-between'>
                <Link to={`/posts/${post.id}`} state={{ post }}>
                  <Flex justify={'space-between'} alignItems={'center'}>
                    <Image src={post.image} w={16} h={16} mr={5} />
                    <Stack mr={'auto'}>
                    <Heading fontSize={20} className='text-[#33658a]'>@{post.user_id}
                      <Text fontSize={12} className='text-gray-700'>{post.created_at.slice(0, 16)}</Text>
                    </Heading>
                    <Text>{post.title}</Text>
                  </Stack>
                  </Flex>
                </Link>
                <PostMenu state={{ post }} />
              </CardHeader>
              <CardBody className='font-raleway'>
                <Text>{post?.description?.slice(0, 30)}...</Text>
                {post.type ? (
                  post.type.includes('image/') ? (
                    <Image src={post.type} w={'100%'} h={'400px'} />
                  ) : post.type.includes('video/') ? (
                    <video controls src={post.type} style={{ width: '100%', height: '400px' }} />
                  ) : post.type.includes('audio/') ? (
                    <audio controls src={post.type} style={{ width: '100%' }} />
                  ) : (
                    null
                  )
                ) : (
                  <Text>No media available</Text>
                )}
              </CardBody>
              <CardFooter>
                <HStack className='font-raleway max-lg:mx-auto '>
                 <HandleLikes postId={post.id}/>
                  <Button variant={'ghost'} color={'#33658a'} onClick={() => handleDisclose(post.id)}>
                    <BiComment />
                    
                  </Button>
                  <Button variant={'ghost'} color={'#33658a'}>
                    <RiShareForwardLine />
                  </Button>
                </HStack>
              </CardFooter>
              <Box display={isOpen[post.id] ? "block" : "none"}>
                <Comments postId={post.id} />
              </Box>
            </Card>
          ))
        )}
      </div>
      <RightNav />
    </div>
  );
}

export default BookMarks;
