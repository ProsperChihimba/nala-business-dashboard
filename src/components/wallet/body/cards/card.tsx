import './index.css'; // Make sure to import the CSS file with the styles
import logo from '../../../../assets/ms.svg'
import lines from '../../../../assets/lines.svg'
import { Flex, Spacer } from '@chakra-ui/react';
import { Image, Typography } from 'antd';

const CreditCard = () => {

  const { Text } = Typography;
  return (
        <Flex className="container" direction='column' paddingTop='10px' paddingBottom='10px' paddingRight='20px'paddingLeft='20px' >
          <Text
              style={{
                  fontFamily: 'IBM Plex Sans, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#FFFFFF',
                  marginBottom: '43px',
              }}
          >
              Sponsored Ads
          </Text>

          {/*  */}
          <Flex justifyContent='space-between' alignItems='center'>
            <Text
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '18px',
                    fontWeight: 500,
                    color: '#B5B5B5',
                }}
            >
                4374 **** **** ***
            </Text>
            <Image src={lines} alt="logo" preview={false} />
          </Flex>

          {/*  */}
          <Spacer />

          {/*  */}
          <Flex justifyContent='space-between' alignItems='center'>
            <Flex direction='column'>
              <Text
                  style={{
                      fontFamily: 'IBM Plex Sans, sans-serif',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#FFFFFF',
                  }}
              >
                  Prosper Absalom
              </Text>
                <Text
                    style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '8px',
                        fontWeight: 400,
                        color: '#B5B5B5',
                    }}
                >
                    Exp **/** CVV ***
                </Text>
            </Flex>
            <Image src={logo} alt="logo" preview={false} />
          </Flex>
          {/*  */}
        </Flex>
  );
};

export default CreditCard;
