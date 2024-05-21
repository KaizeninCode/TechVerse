import React from 'react';
import { FaFlag } from 'react-icons/fa';
import {
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast
} from "@chakra-ui/react";

function DeletePost({ postId }) {
  const url = `http://127.0.0.1:5555/contents/${postId}`;
  const { isOpen, onOpen, onClose } = useDisclosure();
const toast=useToast()

  function handleDelete() {
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contentId: postId
      })
    }).then(response => {
      if (response.ok) {
        console.log('Deleted');
        showToast('This content has been deleted')
        onClose();
      }
    }).catch(error => {
      console.error('Error deleting post:', error);
    },3000);
  }
  

  
const showToast = () => {
  toast({
    title: 'This content has been deleted',
    status:'success',
    duration: 5000,
    isClosable: true,
  })
}
  return (
    <>
      <button onClick={onOpen} className='flex p-2 align-middle justify-between'>
        <FaFlag fontSize={'1rem'} />
        Flag Post
      </button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Flag this Post
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea placeholder="Reason for flag" />
            <div className='flex justify-between'>
              <button onClick={onClose} className='bg-blue-700 px-6 py-3 rounded-full text-white m-3'>Cancel</button>
              <button onClick={handleDelete} className='bg-red-700 px-6 py-3 rounded-full text-white m-3'>Proceed</button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeletePost;
