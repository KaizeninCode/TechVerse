import { Box, Text } from "@chakra-ui/react";
import { useState, useEffect} from "react";
import { IoSend } from "react-icons/io5";



const Comments = ({ postId }) => {
  const url = `http://127.0.0.1:5555/comments?postId=${postId}`;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`HTTP error! status ${response.status}`);
        const data = await response.json();
        setComments(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [postId]);

  return (
    <Box className="overflow-y-scroll w-full h-40 ">
      <form className="block border-none ">
        <input
          className="w-[700px] h-[50px] bg-gray-200 border-none rounded-sm "
          placeholder="Post your reply"
          type="text"
          
        />
        <IoSend className="flex float-end mr-5 mt-3 text-xl" />
      </form>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Box key={comment.id} p={2} borderBottom="1px solid #ccc">
            <Text fontWeight="bold">{comment.user.username}</Text>
            <Text>{comment.text}</Text>
          </Box>
        ))
      ) : (
        <Text>No comments yet</Text>
      )}
    </Box>
  );
};

export default Comments;
