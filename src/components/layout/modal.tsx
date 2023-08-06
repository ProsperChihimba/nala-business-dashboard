import { ModalBody, ModalContent, ModalOverlay, Modal } from '@chakra-ui/react'
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    modalSize: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    children: React.ReactNode;
}

const AppModal = ({isOpen, onClose, modalSize, children}: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'      
        />
        <ModalContent borderRadius='20px' fontFamily='IBM Plex Sans, sans-serif' >

          {/*  */}
          <ModalBody >
            {children}
          </ModalBody>

        </ModalContent>
      </Modal>
  )
}

export default AppModal