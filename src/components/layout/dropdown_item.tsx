import { Flex } from '@chakra-ui/react';
import { Typography } from 'antd';
import { ReactElement } from 'react'

interface DropdownItemProps {
    label: string;
    icon?: ReactElement;
    descritpion?: string;
    onClick?: () => void;
}

const DropdownItem = ({label, icon, descritpion, onClick}: DropdownItemProps) => {

    const { Text } = Typography;
  return (
    <Flex alignItems='center' gap='10px' onClick={onClick}>
        {icon}

        {/*  */}
        <Flex flexDirection='column'>
            <Text
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: '#000',
                    marginBottom: '5px',
                }}
            >
                {label}
            </Text>

            {/* desc */}
            <Text
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '12px',
                    fontWeight: 400,
                    color: '#000',
                }}
            >
                {descritpion}
            </Text>
        </Flex>
    </Flex>
  )
}

export default DropdownItem