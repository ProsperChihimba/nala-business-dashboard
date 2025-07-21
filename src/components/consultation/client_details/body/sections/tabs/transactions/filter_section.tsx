import { Box, Flex } from '@chakra-ui/react'
import { DatePicker, Input } from 'antd'
import AppButton from '../../../../../../layout/button'
import { FiChevronDown } from 'react-icons/fi'

const FilterSection = () => {

  const { RangePicker } = DatePicker;
  return (
    <Flex gap='6%'>
      
      {/* search input */}
      <Box  width='35%'>
        <Input
          placeholder='Search for transaction'
          style={{
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontSize: '13px'
          }}
        />
      </Box>

      {/*  */}
      <Flex gap='20px'>
          <AppButton
              label='Status'
              background='white'
              color='#000'
              icon={<FiChevronDown size='15px' style={{ marginLeft: 10 }} color='#000000' />}
              width='130px'
              borderColor='#DCDCDC'
          />

          <AppButton
              label='Method'
              background='white'
              color='#000'
              icon={<FiChevronDown size='15px' style={{ marginLeft: 10 }} color='#000000' />}
              width='140px'
              borderColor='#DCDCDC'
          />

          <RangePicker 
            style={{
              width: '80%'
            }}
          />

          <AppButton
              label='Export'
              background='white'
              color='#000'
              width='130px'
              borderColor='#DCDCDC'
          />
      </Flex>
    </Flex>
  )
}

export default FilterSection