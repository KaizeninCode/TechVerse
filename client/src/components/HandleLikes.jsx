import React, { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { AiOutlineDislike,AiOutlineLike } from "react-icons/ai";
import { selectUserData } from '../features/AuthSlice';
import { useSelector } from 'react-redux';

function HandleLikes({ postId }) {
  const [likeStatus, setLikeStatus] = useState(false);
  const user = useSelector(selectUserData);
  const [likes, setLikes]=useState([]);

  useEffect(()=>{
    function LikesStatus(){
    fetch('http://127.0.0.1:5555/like')
     .then(response => response.json())
     .then(data=>setLikes(data));
  }
  LikesStatus()
  },[])


  
  const filteredLikes=likes.filter(like=>like.content_id === postId)
//like functionality
  const toggleLike = async () => {
    if(filteredLikes.find(like=>like.content_id ===postId) && filteredLikes.find(like=>like.user_id === user.id)){
        try {
            const response = await fetch(`http://127.0.0.1:5555/like/${postId}`, {
              method:'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_id: user.id,
                content_id: postId,
                like_status: likeStatus,
              }),
            });
      
            if (!response.ok) {
              throw new Error('Failed to update like status');
            }
      
            const data = await response.json();
            setLikeStatus(!likeStatus);
            console.log('Like status updated successfully:', data);
          } catch (error) {
            console.error('Error updating like status:', error);
          }
    }
    try {
      const response = await fetch('http://127.0.0.1:5555/like', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
          content_id: postId,
          like_status: !likeStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update like status');
      }

      const data = await response.json();
      setLikeStatus(!likeStatus);
      console.log('Like status updated successfully:', data);
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };
  //dislike funtionality
  const toggledisLike = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/like/${postId}`, {
        method:'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
          content_id: postId,
          like_status: likeStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update like status');
      }

      const data = await response.json();
      setLikeStatus(!likeStatus);
      console.log('Like status updated successfully:', data);
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };
  return (
    <div>
      <Button variant={'ghost'} color={'#33658a'} onClick={toggleLike}>
                  <AiOutlineLike />
                  <div>{filteredLikes.length}</div>
                </Button>
                <Button onClick={toggledisLike} variant={'ghost'} color={'#33658a'}>
                  <AiOutlineDislike />
                  
                </Button>
    </div>
  );
}

export default HandleLikes;
