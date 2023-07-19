
import { Button } from '@chakra-ui/react'
import { ReactElement } from 'react';

interface ButtonProps {
  label: string;
  background: string;
  icon: ReactElement;
  color: string,
  width: string,
  borderColor: string,
}

const AppButton = ({label, background, icon, color, width, borderColor} : ButtonProps) => {

  return (
    <Button
      fontFamily='IBM Plex Sans, sans-serif'
      fontWeight='500'
      fontSize='13px'
      height='30px'
      background={background}
      color={color}
      _hover={{
        _hover: background,
      }}
      borderRadius="7px"
      border='1px'
      borderColor={borderColor}
      rightIcon={icon}
      width={width}
    >
      {label}
    </Button>
  )
}

export default AppButton