import React from 'react'
import TopNav from './topNav'
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay,useDisclosure } from '@chakra-ui/react'

function EditProfile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className='justify-center align-middle flex shadow-md'>
    <button onClick={onOpen} className="px-6 py-3 rounded-md">Edit Profile</button>
    <Drawer isOpen={isOpen} onClose={onClose} size={'lg'}>
    <DrawerOverlay/>
    <DrawerContent>
   
    <DrawerHeader>
    <div className='justify-between flex'> 
    
    <h1>Edit Profile</h1>
    <button onClick={onClose} className='bg-black rounded-full text-slate-200 px-6 py-2'>Save</button>
    </div>
    
    <img src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg" alt="name" className='rounded-full w-20 h-20' />
    </DrawerHeader>
    <DrawerBody>
    <h1 className='text-center font-bold text-xl'>Personal Details</h1>
    <div className='grid shadow-md'> 
    <label className='font-bold'>Username</label>
    <input className='border-2 border-gray-900 rounded-md p-1' placeholder='Name'/>
    <label className='font-bold'>Email</label>
    <input className='border-2 border-gray-900 rounded-md p-1' placeholder='Email'/>
    <label className='font-bold'>Password</label>
    <input className='border-2 border-gray-900 rounded-md p-1' placeholder='Password'/>
    <label className='font-bold'>Confirm Password</label>
    <input className='border-2 border-gray-900 rounded-md p-1' placeholder='Password'/>
    </div>
    <hr/>
    <h1 className='text-center font-bold text-xl'>Change Preferences</h1>
    <div className='grid shadow-md p-3'>
   
<div className='p-1 '>
<input type="checkbox"/>
   <label className='p-1 font-montserrat font-medium'>Frontend Development</label>
</div>
<div className='p-1'>
<input type="checkbox"/>
   <label className='p-1 font-montserrat font-medium'>Backend Development</label>
</div>
<div className='p-1'>
<input type="checkbox" value="FullStack Development"/>
   <label className='p-1 font-montserrat font-medium'>FullStack Development</label>
</div>
<div className='p-1'>
<input type="checkbox"/>
   <label className='p-1 font-montserrat font-medium'>DevOps</label>
</div>
<div className='p-1'>
<input type="checkbox"/>
   <label className='p-1 font-montserrat font-medium'>Artificial Intelligence</label>
</div>
    
    </div>
    
    </DrawerBody>
    </DrawerContent>
    </Drawer>
    </div>
  )
}

export default EditProfile
