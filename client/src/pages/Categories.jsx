import React from 'react'
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
  import { BiSolidCategory } from "react-icons/bi";

function Categories() {
    const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <button onClick={onOpen} className='flex'>
      <BiSolidCategory fontSize={'1.5rem'}/>
      Add Category
      </button>
      <Modal
      isOpen={isOpen}
        onClose={onClose}
        isCentered>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>
            Create a new category
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
            <Textarea placeholder="Enter category name" />
        </ModalBody>
</ModalContent>
      </Modal>
    </>
  )
}

export default Categories
