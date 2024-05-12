import React from 'react';
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure } from '@chakra-ui/react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import { useColorMode } from '@chakra-ui/react';
function EditProfile({theme}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
const colorMode=useColorMode()
  return (
    <div className='justify-center align-middle flex shadow-md'>
      <button onClick={onOpen} className="px-6 py-3 rounded-md border-2">Edit Profile</button>
      <Drawer bg={theme} isOpen={isOpen} onClose={onClose} size={'lg'}>
        <DrawerOverlay />
        <DrawerContent>

          <DrawerHeader>
            <div className='justify-between flex'>
              <h1>Edit Profile</h1>
              <button onClick={onClose} className='bg-black rounded-full text-slate-200 px-6 py-2'>Save</button>
            </div>
            <img src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg" alt="name" className='rounded-full w-24 h-24' />
          </DrawerHeader>

          <DrawerBody>
          <form>
            <h1 className='text-center font-bold text-xl'>Personal Details</h1>
            <div className='grid shadow-md'>
                <div className="relative">
                <label className='font-bold'>Username</label>
                <input className='border-2 border-gray-900 relative rounded-md p-4 w-full' placeholder='Simon Mwangi' />
              </div>
              <div className="relative">
                <label className='font-bold'>Email</label>
                <input className='border-2 border-gray-900 relative rounded-md p-4 w-full' placeholder='Simon.mwangi@moringaschool.com' />
              </div>
              <div className="relative">
                <label className='font-bold'>Password</label>
                <input type="password" className='border-2 border-gray-900 relative rounded-md p-4 w-full' placeholder='Password' />
              </div>
              <div className="relative">
                <label className='font-bold'>Confirm Password</label>
                <input type="password" className='border-2 border-gray-900 relative rounded-md p-4 w-full' placeholder='Password' />
              </div>
            </div>
            <hr />
            <h1 className='text-center font-bold text-xl'>Change Preferences</h1>
            <div className='grid shadow-md p-3'>
              <div className='p-1 '>
                <input type="checkbox" />
                <label className='p-1 font-montserrat font-medium'>Frontend Development</label>
              </div>
              <div className='p-1'>
                <input type="checkbox" />
                <label className='p-1 font-montserrat font-medium'>Backend Development</label>
              </div>
              <div className='p-1'>
                <input type="checkbox" value="FullStack Development" />
                <label className='p-1 font-montserrat font-medium'>FullStack Development</label>
              </div>
              <div className='p-1'>
                <input type="checkbox" />
                <label className='p-1 font-montserrat font-medium'>DevOps</label>
              </div>
              <div className='p-1'>
                <input type="checkbox" />
                <label className='p-1 font-montserrat font-medium'>Artificial Intelligence</label>
              </div>
            </div>
            
           
          </form>
            
          </DrawerBody>

        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default EditProfile;
