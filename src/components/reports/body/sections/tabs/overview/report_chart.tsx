import {  Box, Flex } from '@chakra-ui/react'
import {  Divider, Typography } from 'antd';
import MerchantsChart from '../../../../../layout/chart';
import { FiArrowUpRight } from 'react-icons/fi';
import ArticleTag from '../../../../../accounts/body/sections/learn/tag';

const { Text } = Typography;

const ReportChart = () => {

  return (
        <Flex
            padding='20px'
            fontFamily='IBM Plex Sans, sans-serif'
            border='1px solid #D9D9D9'
            borderRadius='20px'
            gap='20px'
        >
            <ChartsList 
                color='#00BA07'
                title='Total value'
                value='$ 100.00'
                id='one'
            />
            <Divider type='vertical' style={{ height: '240px' }} />
            <ChartsList 
                color='#073DFC'
                title='No Transactions'
                value='200'
                id='two'
            />
            <Divider type='vertical' style={{ height: '240px' }} />
            <ChartsList 
                color='#FF4545'
                title='Expenses'
                value='$ 300.00'
                id='three'
            />
        </Flex>
  )
}

export default ReportChart


interface ChartProps {
    color: string;
    value: string;
    title: string;
    id: string;
}

// single chart
const ChartsList = ({color, value, title, id}: ChartProps) => {

    const data = [
        { registered__month: 1, registered__year: 2022, total: 18300196787, count: 289 }, 
        { registered__month: 2, registered__year: 2023, total: 73614764207.28946, count: 489 },
        { registered__month: 3, registered__year: 2022, total: 635000, count: 513 }, 
        { registered__month: 4, registered__year: 2023, total: 18300196787.17048, count: 709 },
        { registered__month: 5, registered__year: 2022, total: 108989000, count: 900 }, 
        { registered__month: 6, registered__year: 2023, total: 7268083239.017362, count: 959 },
    ]

    return (
        <Flex direction='column' width='31%'>
            {/*  */}
            <Text
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#000',
                    marginRight: '3px'
                }}
            >
                {title}
            </Text>

            <Flex gap='10px' alignItems='center' marginBottom='25px'>
                <Text
                    style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '30px',
                        fontWeight: 500,
                        color: '#000',
                        marginRight: '3px'
                    }}
                >
                    {value}
                </Text>

                <Box h='10px'>
                    <ArticleTag
                        rightElement={<FiArrowUpRight size='10px'/>}
                        text='+10%'
                    />
                </Box>
            </Flex>

            {/* chart */}
            <MerchantsChart
              id={id}
              id_url={`url(#${id})`}
              color={color}
              graph={data}
              type='Completed Goals'
              height='160px'
            />
        </Flex>
    )
}