import { Flex } from '@chakra-ui/react'
import { Typography } from 'antd';
import DepositHeading from '../../../layout/heading';
import DepositInput from '../../../layout/input';

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
    </Flex>
  )
}

export default CompanyWebsite