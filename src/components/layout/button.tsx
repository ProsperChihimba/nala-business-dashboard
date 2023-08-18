
import { Button } from '@chakra-ui/react'
import { ReactElement } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import './style.css';

interface ButtonProps {
  label: string;
  background: string;
  icon?: ReactElement;
  color: string;
  width: string;
  borderColor: string;
  weigth?: string;
  leftIcon?: ReactElement;
  onClick?: () => void;
  hasDropdown?: boolean;
  items?: MenuProps['items'];
  height?: string;
}

const AppButton = ({label, background, icon, color, width, borderColor, weigth, leftIcon, onClick, hasDropdown, items, height = '30px'} : ButtonProps) => {

  return (
    <>
      {hasDropdown ? (
        <Dropdown
          menu={{ items }}
        >
          <Button
            fontFamily='IBM Plex Sans, sans-serif'
            fontWeight={weigth ? weigth : '500'}
            fontSize='13px'
            height={height}
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
            onClick={onClick}
          >
            {label}
          </Button>
      </Dropdown>
      ) 
      : 
      (
        <Button
          fontFamily='IBM Plex Sans, sans-serif'
          fontWeight={weigth ? weigth : '500'}
          fontSize='13px'
          height={height}
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
          onClick={onClick}
        >
          {label}
        </Button>
      )}
    </>
  )
}

export default AppButton