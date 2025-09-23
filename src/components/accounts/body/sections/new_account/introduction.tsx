import { Box, Flex } from '@chakra-ui/react'
import { Typography } from 'antd';
import { RiBankLine } from "react-icons/ri";
import { BsCreditCard2Front } from "react-icons/bs";
import DropdownItem from '../../../../layout/dropdown_item';

const Introduction = () => {

    const { Text } = Typography;
  return (
    <Flex direction='column'>
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '19px',
                fontWeight: 500,
                color: '#000',
                width: '80%',
                marginBottom: '20px',
            }}
        >
            How Just Tap App additional account works 
        </Text>

        {/*  */}
        <DropdownItem
            label='Account number'
            descritpion='Each new business account comes with a unique account number.'
            icon={<RiBankLine size='20px' style={{ marginRight: 8 }} color='#000000' />}
        />

        <Box mt='20px'></Box>

        <DropdownItem
            label='Credit limit'
            descritpion='Your credit limit will be based on the balance in your Primary business account. Your Just Tap App card can only be used to access funds from your Primary business account.'
            icon={<BsCreditCard2Front size='50px' style={{ marginRight: 8 }} color='#000000' />}
        />
    </Flex>
  )
}

export default Introduction