import React from 'react'
import { FaFlag } from 'react-icons/fa'
import {
    Textarea,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    
  } from "@chakra-ui/react";
function DeletePost() {

    const { isOpen, onOpen, onClose } = useDisclosure();

  return (
  
        <>
      <button onClick={onOpen} className='flex p-2 align-middle justify-between'>
      <FaFlag fontSize={'1rem'}/>
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
                <button onClick={onClose} className='bg-blue-700 px-6 py-3 rounded-full  text-white m-3'>Cancel</button>
                <button className='bg-red-700 px-6 py-3 rounded-full  text-white m-3'>Proceed</button>
            </div>
        </ModalBody>
</ModalContent>
      </Modal>
    </>
   
  )
}

export default DeletePost
