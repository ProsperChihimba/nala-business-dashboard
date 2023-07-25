import { Flex } from '@chakra-ui/react'
import DepositHeading from './utils/heading'
import { Typography } from 'antd';
import DepositInput from './utils/input';
import { FiChevronDown } from 'react-icons/fi';
import AppButton from '../../layout/button';

const AddFunds = () => {

    const { Text } = Typography;
  return (
    <Flex direction='column'>
        {/* heading */}
        <DepositHeading title='Add funds' />

        {/* header desc */}
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '15px',
                fontWeight: 400,
                color: '#000',
            }}
        >
            Deposit of funds takes  up to <span style={{ fontWeight: '500' }}>3 business days</span>
        </Text>


        {/* inputs */}
        <DepositInput 
            title='From'
            value=''
            placeholder='Account'
            isReadOnly={true}
            percentage='10%'
            marginBottom='0px'
            marginTop='35px'
            rightElement={<FiChevronDown size='15px' style={{ marginLeft: 8 }} color='#000000' />}
        />

        <DepositInput 
            title='To'
            value='Nala business account'
            placeholder='Account'
            isReadOnly={true}
            percentage='20%'
            marginBottom='40px'
            marginTop='20px'
            rightElement={
                <Text
                    style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '15px',
                        fontWeight: 400,
                        color: '#000',
                    }}
                >
                    ***** 3102
                </Text>
            }
        />

        {/* button */}
        <AppButton
            label='Next'
            background='#073DFC'
            color='#fff'
            width='160px'
            borderColor='#073DFC'
        />
    </Flex>
  )
}

export default AddFunds