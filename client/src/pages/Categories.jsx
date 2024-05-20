import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
  Input,
} from "@chakra-ui/react";
import { BiSolidCategory } from "react-icons/bi";

function Categories() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [values, setValues] = useState({ name: '' });
  const toast = useToast();

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  }

  async function AddCategory(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5555/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: values.name
        })
      });

      if (response.ok) {
        toast({
          title: "Category added.",
          description: "The new category has been successfully added.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setValues({ name: '' });
        onClose();
      } else {
        toast({
          title: "Error",
          description: "There was an error adding the category.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error adding the category.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  return (
    <>
      <button onClick={onOpen} className='flex'>
        <BiSolidCategory fontSize={'1.5rem'} />
        Add Category
      </button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Create a new category
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={AddCategory}>
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Enter category name"
                mb={4}
              />
              <Button type="submit" colorScheme="blue">Add</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Categories;
