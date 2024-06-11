import { useState } from 'react';
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../features/AuthSlice';
import { useToast } from '@chakra-ui/react';
import { MdNotificationsActive } from 'react-icons/md';
import useAuth from '../../features/UseAuth';
function Notifications({ theme }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const user = useSelector(selectUserData);
    const colorMode = useColorMode();
    const isAdmin = useAuth('admin');
  const toast=useToast()
    const [values, setValues] = useState({
        username: user.username,
        email: user.email,
        password: '',
        confirmPassword: '',
        category: '',
        role: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      
         try {
          const response = await fetch(`http://127.0.0.1:5555/users/${user.id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  username: values.username,
                  email: values.email,
                  password: values.password,
                  confirmPassword: values.confirmPassword,
                  role: values.role,
                  category: values.category
              })
          });
  
          if (response.ok) {
              console.log('Success: Profile updated');
              showToast('Profile updated', true);
              onClose(); 
          } else {
              console.error('Error: Profile update failed');
              console.log('Error: Profile update failed')
              showToast('Profile update failed', false);
          }
      } catch (error) {
          console.error('Error: Profile update failed', error);
      }
     
  
     
  };
  
  const showToast = (message, isSuccess) => {
      toast({
          title: `${message}!`,
          description: isSuccess ? 'Profile updated successfully!' : "Profile update failed! Something went wrong!",
          status: isSuccess ? "success" : "error",
          duration: 5000,
          isClosable: true,
          position: "top",
      });
  };
  
  
    return (
        <div className='justify-center align-middle flex'>
         <MdNotificationsActive onClick={onOpen} fontSize={'2rem'} top={'1rem'} position={'relative'} /> 
            <Drawer isOpen={isOpen} onClose={onClose} size={'lg'}>
                <DrawerOverlay />
                <DrawerContent>
               <DrawerCloseButton/>
                    <DrawerHeader>
                         
                    </DrawerHeader>

                    <DrawerBody>
                     <h1 className='text-center font-bold text-2xl'>Notification is empty</h1>
                    </DrawerBody>

                </DrawerContent>
            </Drawer>
        </div>
    );
}

export default Notifications;