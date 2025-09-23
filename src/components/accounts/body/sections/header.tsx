import { Flex, useDisclosure } from '@chakra-ui/react'
import AppButton from '../../../layout/button'
import { FiChevronDown } from 'react-icons/fi'
import { Typography } from 'antd';
import type { MenuProps } from 'antd';
import DropdownItem from '../../../layout/dropdown_item';
import { FaRegPaperPlane } from "react-icons/fa";
import { RiBankLine } from "react-icons/ri";
import { BsCreditCard2Front } from "react-icons/bs";
import { BiWallet } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import AppModal from '../../../layout/modal';
import NewAccount from './new_account';
import NewCard from '../../../wallet/body/new_card';


const AccountsHeader = () => {

    const { isOpen: isOpenModalOne, onOpen: onOpenModalOne, onClose: onCloseModalOne } = useDisclosure();// 
    const { isOpen: isOpenModalTwo, onOpen: onOpenModalTwo, onClose: onCloseModalTwo } = useDisclosure();//


  const { Text } = Typography;

  const navigate = useNavigate();

//   move money dropdown
    const moveMoneyItems: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <DropdownItem
                    label='Make payment'
                    descritpion='Through ACH, wire or check'
                    icon={<FaRegPaperPlane size='20px' style={{ marginRight: 8 }} color='#000000' />}
                    onClick={() => navigate('/send')}
                />
            ),
            style: {
                marginTop: '8px',
                marginLeft: '8px',
                marginRight: '8px',
                marginBottom: '10px',
            },
        },
        {
            key: '2',
            label: (
                <DropdownItem
                    label='Deposit money'
                    descritpion='Fund your Just Tap App wallet or business account'
                    icon={<RiBankLine size='20px' style={{ marginRight: 8 }} color='#000000' />}
                    onClick={() => navigate('/deposit')}
                />
            ),
            style: {
                marginLeft: '8px',
                marginRight: '8px',
                marginBottom: '10px',
            }
        },
        {
            key: '3',
            label: (
                <DropdownItem
                    label='Make credit payment'
                    descritpion='Through your Just Tap App credit card'
                    icon={<BsCreditCard2Front size='20px' style={{ marginRight: 8 }} color='#000000' />}
                />
            ),
            style: {
                marginBottom: '8px',
                marginLeft: '8px',
                marginRight: '8px',
            }
        },
  ];


  const manageAccountItems: MenuProps['items'] = [
    {
    key: '1',
    label: (
        <DropdownItem
            label='Create new business wallet'
            descritpion='Manage additional wallet for your business'
            icon={<BiWallet size='20px' style={{ marginRight: 8 }} color='#000000' />}
            onClick={onOpenModalOne}
        />
    ),
    style: {
        marginTop: '8px',
        marginLeft: '8px',
        marginRight: '8px',
        marginBottom: '10px',
    }
    },
    {
    key: '2',
    label: (
        <DropdownItem
            label='Create credit card'
            descritpion='Create new credit card for online purchases'
            icon={<BsCreditCard2Front size='20px' style={{ marginRight: 8 }} color='#000000' />}
            onClick={onOpenModalTwo}
        />
    ),
    style: {
        marginBottom: '8px',
        marginLeft: '8px',
        marginRight: '8px',
    }
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
            Dashboard
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
                hasDropdown={true}
                items={manageAccountItems}
            />

            <AppButton 
                label='Move money'
                background='#073DFC'
                color='#fff'
                icon={<FiChevronDown size='15px' style={{ marginLeft: 10 }} color='#fff' />}
                width='160px'
                borderColor='#073DFC'
                hasDropdown={true}
                items={moveMoneyItems}
            />
        </Flex>
        
        <AppModal
            isOpen={isOpenModalOne}
            onClose={onCloseModalOne}
            modalSize='sm'
            children={<NewAccount />}
        />

        {/* new card modal */}
        <AppModal
            isOpen={isOpenModalTwo}
            onClose={onCloseModalTwo}
            modalSize='sm'
            children={<NewCard />}
        />

    </Flex>
  )
}

export default AccountsHeader