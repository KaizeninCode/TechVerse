import { useState, useEffect } from "react";
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
import colorPallete from "./colorPallete";
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';

const PostContainer = () => {
  const theme = colorPallete();
  const [content, setContent] = useState([]);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("http://localhost:5555/contents");
        if (!response.ok) {
          throw new Error("Response not ok!");
        }
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error(
          "There's a problem with the fetch operation:",
          error
        );
      }
    };

    fetchContent();
  }, []);

  return (
    <SimpleGrid
      className="lg:w-[60%] overflow-y-scroll gap-4 mx-5 my-3"
      id="posts"
    >
      {content.map((item) => (
        <Card key={item.title} bg={theme.bg} color={theme}>
          <CardHeader>
            <Flex justify={"space-between"} alignItems={"center"}>
              <Image src={item.image} w={16} h={16} mr={5} />
              <Stack mr={"auto"}>
                <Heading fontSize={20} className="text-[#33658a]">
                  @{item.title}
                </Heading>
                <Text>{item.description}</Text>
              </Stack>
              <Text
                ml={5}
                pr={8}
                fontFamily={"Montserrat"}
                fontSize={14}
                className="max-md:hidden"
              >
                {item.created_at}
              </Text>
            </Flex>
          </CardHeader>
          <CardBody className="font-raleway">
            <Text>{item.description}</Text>
          </CardBody>
          <CardFooter>
            <HStack className="font-raleway max-lg:mx-auto ">
              <Button variant="ghost" color="#33658a"><AiOutlineLike /></Button>
              <Button variant="ghost" color="#33658a"><AiOutlineDislike /></Button>
              <Button variant={"ghost"} color={"#33658a"}><BiComment /></Button>
              <Button variant={"ghost"} color={"#33658a"}><RiShareForwardLine /></Button>
            </HStack>
          </CardFooter>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default PostContainer;


