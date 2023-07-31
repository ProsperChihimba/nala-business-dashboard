import { Flex } from '@chakra-ui/react'
import { Typography } from 'antd';
import DepositHeading from '../../../layout/heading';
import DepositInput from '../../../layout/input';
import AppButton from '../../../layout/button';

const CompanyWebsite = () => {

    const { Text } = Typography;
  return (
    <Flex direction='column' marginTop='23vh'>
        {/* heading */}
        <DepositHeading title='Company website' />

        {/* header desc */}
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '15px',
                fontWeight: 400,
                color: '#9A9A9A',
            }}
        >
            If you have more than one website, enter the one you primarily do business on.
        </Text>


        <DepositInput 
            title='Website'
            value=''
            placeholder=''
            isReadOnly={false}
            marginBottom='80px'
            marginTop='20px'
        />

        {/* button */}
        <Flex justifyContent='flex-end'>
            <AppButton
                label='Next'
                background='#073DFC'
                color='#fff'
                width='160px'
                borderColor='#073DFC'
            />
        </Flex>
    </Flex>
  )
}

export default CompanyWebsite