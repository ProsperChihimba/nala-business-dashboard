import { Box, Flex } from '@chakra-ui/react'
import { DatePicker, Input } from 'antd'
import AppButton from '../../../../../layout/button'
import { FiChevronDown } from 'react-icons/fi';
import { CiUser } from 'react-icons/ci';

const ChartFilter = () => {

    const { RangePicker } = DatePicker;
  return (
    <Flex marginBottom='30px' justifyContent='space-between'>
        
        {/* search input */}
        <Box  width='35%'>
            <Input
                placeholder='Search'
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: '13px'
                }}
            />
        </Box>

        {/*  */}
        <Flex gap='20px'>
          <AppButton
              label='Everybody'
              background='white'
              color='#000'
              weigth='400'
              icon={<FiChevronDown size='15px' style={{ marginLeft: 90 }} color='#9A9A9A' />}
              leftIcon={<CiUser size='15px' color='#9A9A9A' />}
              width='290px'
              borderColor='#DCDCDC'
          />

          <RangePicker 
            style={{
              width: '80%'
            }}
          />
      </Flex>

    </Flex>
  )
}

export default ChartFilter