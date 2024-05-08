import { useState } from 'react';
import { Textarea } from '@chakra-ui/react';
import { FaImages } from "react-icons/fa";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';

const Post = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState(null);
  const [input, setInput] = useState({
    category:'',
    title: '',
    description: '',
    media:'',
    link:''
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    console.log(file);
    // Reset form state
    setInput({
      category:'',
      title: '',
      description: '',
      media:'',
      link:''
    });
    setFile(null);
    onClose(); // Close modal
    localStorage.setItem('file', input)
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <button onClick={onOpen}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={'2xl'} motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <img src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg" alt="name" className='rounded-full w-20 h-20' />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form className='block w-full' onSubmit={handleSubmit}>
              <h1 className='font-bold text-2xl text-slate-900'>Create a Post</h1>
              <select className='rounded-xl p-3' name='category' value={input.category} onChange={handleChange}>
                <option value=''>Select the topic</option>
                <option value='Frontend Programming'>Frontend Programming</option>
                <option value='Backend Programming'>Backend Programming</option>
                <option value='Fullstack Development'>Fullstack Development</option>
                <option value='Data Science'>Data Science</option>
                <option value='Machine Learning'>Machine Learning</option>
                <option value='Dev-Ops'>Dev-Ops</option>
                <option value='UI/Ux'>UI/UX</option>
              </select>
              <h3 className='font-bold'>Text</h3>
              <input name='title' value={input.title} className='rounded-xl border-2 border-slate-400 my-3 w-full p-3' type='text' placeholder='Title' onChange={handleChange} />
              <Textarea name='description' value={input.description} className='w-full rounded-md p-3 border-2 border-slate-400' onChange={handleChange} placeholder='Body' />
              <hr />
              <h3 className='font-bold'>Image/Video</h3>
              <div className="flex p-4 border-dotted border-2 border-slate-800 my-3 justify-center align-middle rounded-md h-fit">
                <label className="drop-area">
                  <input
                    type="file"
                    accept="image/*, video/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    value={input.media}
                    name='media'
                  />
                  <p className='w-fit flex p-2'>Drag and drop an image/video 
                  <FaImages/>
                  </p>
                  {file && (
                    <div>
                      <h3>Preview:</h3>
                      {file.type.startsWith('image/') ? (
                        <img src={URL.createObjectURL(file)} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                      ) : (
                        <video controls style={{ maxWidth: '100%', maxHeight: '200px' }}>
                          <source src={URL.createObjectURL(file)} type={file.type} />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  )}
                </label>
              </div>
              <hr/>
              <h3 className='font-bold'>Link</h3>
              <input name='link' value={input.link} onChange={handleChange} className='rounded-xl border-2  border-slate-400 my-3 w-full p-3' type='Link' placeholder='Link url' />
              <div className='flex justify-between w-full'>
                <button onClick={onClose} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
                  Cancel
                </button>
                <button type="submit" className='bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
                  Post
                </button>         
              </div>
            </form> 
          </ModalBody>
          <ModalFooter>
          
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Post;
