import { Flex, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { Typography } from 'antd';
import { ReactElement } from 'react';

interface InputProps  {
    title?: string;
    value: string;
    placeholder: string;
    isReadOnly: boolean;
    rightElement?: ReactElement;
    percentage? : string;
    marginTop: string,
    marginBottom: string,
    width?: string,
    height?: string,
    elementPadding?: string,
}

const DepositInput = ({title, value, placeholder, isReadOnly, rightElement, percentage, marginBottom, marginTop, width, height, elementPadding} : InputProps) => {

    const { Text } = Typography;
  return (
    <Flex
        direction='column'
        mt={marginTop}
        mb={marginBottom}
    >

        {/* input title */}
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '15px',
                fontWeight: 500,
                color: '#000',
                marginBottom: '5px',
            }}
        >
            {title}
        </Text>
        <InputGroup width={width ? width : '600px'}>
            <Input
                pl='25px'
                placeholder={placeholder}
                height={height ? height : '50px'}
                borderColor='#D9D9D9'
                background='white'
                focusBorderColor='#073DFC'
                borderRadius='10px'
                fontFamily='IBM Plex Sans, sans-serif'
                fontSize='15px'
                fontWeight= '400'
                color='#000'
                value={value}
                isReadOnly={isReadOnly}
                _placeholder={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    color: '#9A9A9A',
                    fontSize: '15px',
                }}
            />
            <InputRightElement width={percentage} pt={elementPadding ? elementPadding : '12px'}>
                {rightElement}
            </InputRightElement>
        </InputGroup>
    </Flex>
  )
}

export default DepositInput