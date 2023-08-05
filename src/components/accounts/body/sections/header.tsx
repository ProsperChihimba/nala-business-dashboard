import { Flex } from '@chakra-ui/react'
import AppButton from '../../../layout/button'
import { FiChevronDown } from 'react-icons/fi'
import { Typography } from 'antd';
import type { MenuProps } from 'antd';
import DropdownItem from '../../../layout/dropdown_item';
import { FaRegPaperPlane } from "react-icons/fa";
import { RiBankLine } from "react-icons/ri";
import { BsCreditCard2Front } from "react-icons/bs";


const AccountsHeader = () => {

  const { Text } = Typography;

//   move money dropdown
const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <DropdownItem
            label='Make payment'
            descritpion='Through ACH, wire or check'
            icon={<FaRegPaperPlane size='20px' style={{ marginRight: 8 }} color='#000000' />}
        />
      ),
    },
    {
      key: '2',
      label: (
        <DropdownItem
            label='Deposit money'
            descritpion='Fund your Nala wallet or business account'
            icon={<RiBankLine size='20px' style={{ marginRight: 8 }} color='#000000' />}
        />
      ),
    },
    {
      key: '3',
      label: (
        <DropdownItem
            label='Make credit payment'
            descritpion='Through your Nala credit card'
            icon={<BsCreditCard2Front size='20px' style={{ marginRight: 8 }} color='#000000' />}
        />
      ),
    },
  ];
  return (
    <Flex justifyContent='space-between' alignItems='center' marginBottom='30px' fontFamily='IBM Plex Sans, sans-serif'>

        {/* title */}
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '24px',
                fontWeight: 600,
                color: '#000000',
            }}
        >
            Accounts
        </Text>


        {/* account button */}
        <Flex gap='30px'>
            <AppButton
                label='Manage accounts'
                background='white'
                color='#000'
                icon={<FiChevronDown size='15px' style={{ marginLeft: 8 }} color='#000000' />}
                width='160px'
                borderColor='#DCDCDC'
            />

            <AppButton 
                label='Move money'
                background='#073DFC'
                color='#fff'
                icon={<FiChevronDown size='15px' style={{ marginLeft: 10 }} color='#fff' />}
                width='160px'
                borderColor='#073DFC'
                hasDropdown={true}
                items={items}
            />
        </Flex>


    </Flex>
  )
}

export default AccountsHeader