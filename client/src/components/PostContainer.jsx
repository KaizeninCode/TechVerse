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
  Tooltip,
  useColorMode,
  useToast
} from "@chakra-ui/react";
import { CiHeart, CiBookmark } from "react-icons/ci";
import { BiComment } from "react-icons/bi";
import { FaBookmark } from "react-icons/fa";
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import colorPallete from './colorPallete';
import Comments from "./Comments";
import SearchBar from './SearchBar';
import PostMenu from "./postMenu";
import useDisclosure from "../utils/useDisclosure";
import { addWish, removeWish } from "../features/WishSlice";
import Category from "./RightNav";
import HandleLikes from "./HandleLikes";

const PostContainer = () => {
  const theme = colorPallete();
  const [content, setContent] = useState([]);
  const [isClicked, setClicked] = useState([]);
  const dispatch = useDispatch();
  const toast = useToast();
  const [input, setInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filterPosts = content.filter((post) => {
    const searchPost = input === '' || post.title.toUpperCase().startsWith(input.toUpperCase());
    const setCategory = selectedCategory === null || post.category_name === selectedCategory;
    return searchPost && setCategory;
  });

  const { isOpen, handleDisclose } = useDisclosure();

  function handleClick(className) {
    setSelectedCategory(className);
  }

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
        console.error("There has been a problem with your fetch operation:", error);
      }
    };
    fetchContent();
  }, []);

  function HandleChange(e) {
    setInput(e.target.value);
  }
  

  function handleAddWish(post) {
    dispatch(addWish(post));
    setClicked(prevClicked => {
      const updatedClicked = [...prevClicked];
      updatedClicked[post.id] = !updatedClicked[post.id];
      return updatedClicked;
    });
    showToast('Post added to watch later');
  }

  function handleRemoveWish(post) {
    dispatch(removeWish(post));
    setClicked(prevClicked => {
      const updatedClicked = [...prevClicked];
      updatedClicked[post.id] = !updatedClicked[post.id];
      return updatedClicked;
    });
    showToast('Post removed from watch later');
  }

  const showToast = (message) => {
    toast({
      title: message,
      status: 'info',
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <div className="flex w-full">
      <SimpleGrid
        className="lg:w-[80%] overflow-y-scroll flex gap-4 p-4 mx-5 my-3 border border-gray-400 rounded-md"
        id="posts">
        <div className="block">
          <SearchBar handleChange={HandleChange} value={input} />
        </div>

        {filterPosts.map((post, index) => (
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
              <PostMenu postId={post.id} categoryId={post.category_id} />
            </CardHeader>
            <CardBody className='w-[80%] font-raleway '>
              <Text>{post.description.slice(0, 30)}........</Text>
              {post.type ? (
                post.type.includes("image/") ? (
                  <Image src={post.type} w={"70%"} h={"300px"} />
                ) : post.type.includes("video/") ? (
                  <video
                    controls
                    src={post.type}
                    style={{ width: "80%", height: "400px" }}
                  />
                ) : post.type.includes("audio/") ? (
                  <audio controls src={post.type} style={{ width: "100%" }} />
                ) : null
              ) : (
                <Text>No media available</Text>
              )}
              <HStack className='font-raleway max-lg:mx-auto '>
                <HandleLikes postId={post.id}/>
                <Tooltip hasArrow label="comments" placement="bottom"><Button variant={'ghost'} color={'#33658a'} onClick={() => handleDisclose(post.id)}>
                  <BiComment />
                  
                </Button></Tooltip>
                <Tooltip label="bookmark">
<Button variant={'ghost'} color={'#33658a'} onClick={() => {
                  isClicked[post.id] ? handleRemoveWish(post) : handleAddWish(post);
                }}>
                  {isClicked[post.id] ? <FaBookmark /> : <CiBookmark />}
                </Button>
                </Tooltip>
                
              </HStack>
            </CardBody>
            <CardFooter className='w-[100%] font-raleway '>
              <Box display={isOpen[post.id] ? "block" : "none"} className='w-[100%] font-raleway '>
                <Comments postId={post.id} />
              </Box>
            </CardFooter>
          </Card>
        ))}

      </SimpleGrid>
      <Category handleFilter={handleClick} />
    </div>
  );
};

export default PostContainer;
