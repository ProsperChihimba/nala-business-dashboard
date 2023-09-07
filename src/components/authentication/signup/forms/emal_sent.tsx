import { Center, Flex } from '@chakra-ui/react'
import { Typography } from 'antd';
import AppButton from '../../../layout/button';
import { useNavigate } from 'react-router-dom';

const EmailSent = () => {
  const { Text } = Typography;

    //   redirect to accounts page after 3 seconds
  setTimeout(() => {
        window.location.href = '/accounts'
    }, 3000);

const navigate = useNavigate();
  return (
    <Center>
      <Flex direction='column' marginTop='25vh' alignItems='center' width='32%'>
          {/* heading */}
          <Text
              style={{
                  fontFamily: 'IBM Plex Sans, sans-serif',
                  fontSize: '25px',
                  fontWeight: 600,
                  color: '#000',
                  textAlign: 'center',
                  marginBottom: '15px'
              }}
          >
              You're in. We have sent an email for 
              finishing setup of your account.
          </Text>

          {/* header desc */}
          <Text
              style={{
                  fontFamily: 'IBM Plex Sans, sans-serif',
                  fontSize: '15px',
                  fontWeight: 400,
                  color: '#9A9A9A',
                  marginBottom: '10px'
              }}
          >
              Verification link sent to proc@user.com
          </Text>

          <Text
              style={{
                  fontFamily: 'IBM Plex Sans, sans-serif',
                  fontSize: '15px',
                  fontWeight: 400,
                  color: '#9A9A9A',
                  marginBottom: '30px'
              }}
          >
              Click button below 😃
          </Text>

          <AppButton
                label='Resend email'
                background='white'
                color='#000'
                width='160px'
                borderColor='#DCDCDC'
                onClick={() => navigate('/accounts-page')}
            />
        </Flex>
      </Center>
  )
}

export default EmailSent