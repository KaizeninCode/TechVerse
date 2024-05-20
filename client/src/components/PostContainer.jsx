import React, { useState, useEffect } from "react";
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
  SimpleGrid,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { CiHeart } from "react-icons/ci";
import { BiComment } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import colorPallete from './colorPallete';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import Comments from "./Comments";
import  useDisclosure  from "../utils/useDisclosure";
import SearchBar from './SearchBar'
import PostMenu from './postMenu' 
import { Link } from "react-router-dom";

const PostContainer = () => {
  const theme = colorPallete();
  const [content, setContent] = useState([]);
  const { colorMode } = useColorMode();
    const [input, setInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const filterPosts = content.filter((post) => {
    const searchPost =
      input === '' ||
      post.title.toUpperCase().startsWith(input.toUpperCase());
    const SetCategory =
      selectedCategory === null || post.category === selectedCategory;
    return searchPost && SetCategory;
  });
  const { isOpen, handleDisclose } = useDisclosure();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("http://localhost:5555/contents");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };

    fetchContent();
  }, []);
  function HandleChange(e) {
      setInput(e.target.value);
    }
  return (
    <SimpleGrid
      className="lg:w-[80%] overflow-y-scroll gap-4 p-4 mx-5 my-3 border border-gray-400 rounded-md"
      id="posts">
      <SearchBar  handleChange={HandleChange} value={input}/>
    
      {filterPosts?.map(post => (
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
              
            <PostMenu state={{post}}/>
            </CardHeader>
            <CardBody className='w-[80%] font-raleway border border-gray-400'>
              <Text>{post.description.slice(0,30)}........</Text>
              {post.type ? (
                post.type.includes('image/') ? (
                  <Image src={post.type} w={'70%'} h={'300px'} />
                ) : post.type.includes('video/') ? (
                  <video controls src={post.type} style={{ width: '80%', height: '400px' }} />
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
                <Button variant={'ghost'} color={'#33658a'} onClick={()=>handleDisclose(post.id)}><BiComment /></Button>
                <Button variant={'ghost'} color={'#33658a'}><RiShareForwardLine /></Button>
              </HStack>
            </CardFooter>
            <Box display={isOpen[post.id] ? "block" : "none"}>
          <Comments postId={post.id} />
        </Box>
          </Card>
        ))}
    </SimpleGrid>
  );
};

export default PostContainer;