import {  Box, Flex, Spacer } from "@chakra-ui/react"
import { Divider, Typography } from "antd";
import { BsBank2 } from "react-icons/bs";
import { GoInfo } from "react-icons/go";
import { VscChevronRight } from "react-icons/vsc";
import AppButton from "../../../../layout/button";
import { FiChevronDown } from "react-icons/fi";
import MerchantsChart from "../../../../layout/chart";

const BusinessCardBox = () => {

  const data = [
      { registered__month: 1, registered__year: 2022, total: 18300196787, count: 289 }, 
      { registered__month: 2, registered__year: 2023, total: 73614764207.28946, count: 489 },
      { registered__month: 3, registered__year: 2022, total: 635000, count: 513 }, 
      { registered__month: 4, registered__year: 2023, total: 18300196787.17048, count: 709 },
      { registered__month: 5, registered__year: 2022, total: 108989000, count: 900 }, 
      { registered__month: 6, registered__year: 2023, total: 7268083239.017362, count: 959 },
  ]

  const { Text } = Typography;
  return (
    <Box
        width='48%'
        fontFamily='IBM Plex Sans, sans-serif'
        border='1px solid #D9D9D9'
        borderRadius='20px'
    >
        
        {/* header section */}
        <Flex paddingTop='20px' paddingRight='20px' paddingLeft='20px' alignItems='center' mb='20px'>
            {/* title */}
            <BsBank2 size='20px' color='#000000' />

            <Text
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#454545',
                    marginLeft: '8px',
                    marginRight: '5px'
                }}
            >
                Business account
            </Text>

            <GoInfo size='11px' color='#000000' />

            <Spacer />

            {/* view section */}
            <Text
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '13px',
                    fontWeight: 400,
                    color: '#073DFC',
                    marginRight: '3px'
                }}
            >
                View transactions
            </Text>
            <VscChevronRight size='20px' color='#073DFC' />
        </Flex>


        {/* card details */}
        <Flex padding='0px 20px' alignItems='center'>

            {/* balance */}
            <Flex direction='column'>
                <Text
                    style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '11px',
                        fontWeight: 500,
                        color: '#454545',
                    }}
                >
                    Balance
                </Text>
                <Text
                    style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '25px',
                        fontWeight: 500,
                        color: '#454545',
                    }}
                >
                    $100,000.00
                </Text>
            </Flex>
        </Flex>

        <Divider style={{ marginTop: '20px', marginBottom: '5px' }} />

        {/* recent transactions */}

        <Box paddingRight='20px' paddingLeft='20px' >
            {/* title */}
            <Flex justifyContent='space-between' marginTop='10px' alignItems='center'>
              <Text
                  style={{
                      fontFamily: 'IBM Plex Sans, sans-serif',
                      fontSize: '11px',
                      fontWeight: 500,
                      color: '#454545',
                  }}
              >
                  Balance
              </Text>

              {/* month selector button */}
              <AppButton
                  label='Last 3 months'
                  background='white'
                  color='#000'
                  icon={<FiChevronDown size='15px' style={{ marginLeft: 8 }} color='#000000' />}
                  width='150px'
                  borderColor='#DCDCDC'
              />
            </Flex>


            <MerchantsChart
              id='colorThree'
              id_url="url(#colorThree)"
              color='#60A9FF'
              graph={data}
              type='Completed Goals'
            />


        </Box>

    </Box>
  )
}

export default BusinessCardBox