import React, { useState, useEffect } from "react";
import { Box, Text, Input, Button, Spinner } from "@chakra-ui/react";
import { IoSend } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectUserData } from "../features/AuthSlice";

const Comments = ({ postId }) => {
  const user = useSelector(selectUserData);
  const url = `http://127.0.0.1:5555/comments?contentId=${postId}`;
  const [comments, setComments] = useState([]);
  const [postComment, setPostComment] = useState({
    user_id: user.id,
    content_id: postId,
    text: "",
    parent_comment_id: null,
    created_at: new Date().toUTCString(),
  });
  const [editComment, setEditComment] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch comments
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`HTTP error! status ${response.status}`);
        const data = await response.json();
        setComments(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  const handleInputChange = (e) => {
    setPostComment({ ...postComment, text: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditComment({ ...editComment, text: e.target.value });
  };

  // POST a comment
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5555/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postComment),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status ${response.status}`);
      const data = await response.json();
      setComments([data.comment, ...comments]);
      setPostComment({ ...postComment, text: "" });
    } catch (err) {
      console.error(err.message);
    }
  };

  // PATCH a comment
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:5555/comments/${editComment.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editComment),
        }
      );
      if (!response.ok)
        throw new Error(`HTTP error! status ${response.status}`);
      const data = await response.json();
      setComments(
        comments.map((comment) => (comment.id === data.id ? data : comment))
      );
      setEditComment(null);
    } catch (err) {
      console.error(err.message);
    }
  };

  // DELETE a comment
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/comments/${id}`, {
        method: "DELETE",
      });
      if (!response.ok)
        throw new Error(`HTTP error! status ${response.status}`);
      setComments(comments.filter((comment) => comment.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Box className="overflow-y-scroll w-full h-40">
      <form
        className="border-none flex flex-row items-center justify-center gap-3"
        onSubmit={handleFormSubmit}
      >
        <Input
          className="w-[700px] h-[50px] bg-gray-200 border-none rounded-sm"
          placeholder="Post your reply"
          type="text"
          value={postComment.text}
          onChange={handleInputChange}
        />
        <Button type="submit">
          <IoSend className="text-2xl float-end" />
        </Button>
      </form>
      {loading ? (
        <Spinner />
      ) : comments.length > 0 ? (
        comments.map((comment) => (
          <Box key={comment.id} p={3} borderBottom="1px solid #ccc">
            {editComment && editComment.id === comment.id ? (
              <form onSubmit={handleEditSubmit}>
                <Input
                  className="w-[700px] h-[50px] bg-gray-200 border-none rounded-sm"
                  type="text"
                  value={editComment.text}
                  onChange={handleEditChange}
                />
                <Button type="submit">
                  <IoSend className="text-2xl float-end" />
                </Button>
              </form>
            ) : (
              <>
                <Text fontWeight="bold">{comment.user.username}</Text>
                <Text>{comment.text}</Text>
                {user.id === comment.user_id && (
                  <Box className="flex gap-2">
                    <Text
                      className="underline cursor-pointer"
                      color={"#33658a"}
                      onClick={() => setEditComment(comment)}
                    >
                      Edit
                    </Text>
                    <button className="" onClick={() => handleDelete(comment.id)}>
                      <MdDeleteForever className="text-2xl " />
                    </button>
                  </Box>
                )}
              </>
            )}
          </Box>
        ))
      ) : (
        <Text>No comments yet</Text>
      )}
    </Box>
  );
};

export default Comments;
