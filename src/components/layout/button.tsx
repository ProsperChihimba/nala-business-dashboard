
import { Button } from '@chakra-ui/react'
import { ReactElement } from 'react';

interface ButtonProps {
  label: string;
  background: string;
  icon?: ReactElement;
  color: string;
  width: string;
  borderColor: string;
  weigth?: string;
  leftIcon?: ReactElement;
}

const AppButton = ({label, background, icon, color, width, borderColor, weigth, leftIcon} : ButtonProps) => {

  return (
    <Button
      fontFamily='IBM Plex Sans, sans-serif'
      fontWeight={weigth ? weigth : '500'}
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
      leftIcon={leftIcon}
    >
      {label}
    </Button>
  )
}

export default AppButton