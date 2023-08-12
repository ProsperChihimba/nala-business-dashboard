import { Drawer, DrawerOverlay, DrawerContent, DrawerBody } from '@chakra-ui/react'
import React from 'react';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    modalSize: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    children: React.ReactNode;
}

const AppDrawer = ({isOpen, onClose, modalSize, children}: DrawerProps) => {
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={modalSize}>

        <DrawerOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />

        <DrawerContent
          fontFamily='IBM Plex Sans, sans-serif'
        >
          <DrawerBody padding='0px'>
            {children}
          </DrawerBody>
        </DrawerContent>
        
      </Drawer>
  )
}

export default AppDrawer