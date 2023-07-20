import { ReactNode } from 'react';
import { Image, Layout, Typography } from 'antd';
import { Box, Flex } from '@chakra-ui/react';

// side bar icons
import { BiWallet } from "react-icons/bi";
import { FiInbox } from "react-icons/fi";
import { BsBank2 } from "react-icons/bs";
import { CiReceipt } from "react-icons/ci";
import { AiOutlineLineChart } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi";
import { LuHotel } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";

// assets
import logo from '../../../assets/Logo.svg';



const { Sider } = Layout;
const { Text } = Typography;

// type for menus
interface NavigationItem {
    label: string;
    path?: string;
    icon: ReactNode;
    isSelected?: boolean;
}

const SideBar = () => {

    // personal menu items
    const personalMenu: NavigationItem[] = [
        {
            label: "Wallet", 
            path: 'wallet', 
            icon: <BiWallet width='20px' height='20px' color='#000000' />, 
        },
        {
            label: "Inbox", 
            path: 'inbox', 
            icon: <FiInbox width='20px' height='20px' color='#000000' />, 
        },
    ];

    // company menu items
    const companylMenu: NavigationItem[] = [
        {
            label: "Accounts", 
            path: '/accounts', 
            icon: <BsBank2 width='20px' height='20px' color='#000000' />, 
        },
        {
            label: "Expenses", 
            path: '/', 
            icon: <CiReceipt width='20px' height='20px' color='#000000' />, 
        },
        {
            label: "Reports", 
            path: '/reports', 
            icon: <AiOutlineLineChart width='20px' height='20px' color='#000000' />, 
        },
        {
            label: "Team", 
            path: '/team', 
            icon: <HiOutlineUsers width='20px' height='20px' color='#000000' />, 
        },
    ];

    // get current path
    const pathname = window.location.pathname;


  return (
        <Sider
            style={{
                overflow: 'auto',
                height: '100vh',
                // position: 'fixed',
                backgroundColor: '#fff',
                left: 0,
                top: 0,
                bottom: 0,
                paddingLeft: 15,
                paddingTop: 15,
                paddingRight: 15,
            }}
        >

            {/* logo */}
            <Image
                src={logo}
                style={{
                    paddingLeft: 10,
                    marginBottom: 30,
                }}
                preview={false}
            />

            {/* personal items */}
            <SelectedNavigationSection
                icon={<FaRegUser width='20px' height='20px' color='#BBBBBB' />}
                label='Personal'
            />
            {
                personalMenu.map((item, index) => (
                    <SelectedNavigationItem 
                        icon={item.icon} 
                        label={item.label}
                        isSelected={pathname === item.path } 
                        key={index} 
                    />
                ))
            }

            {/* divider */}
            <Box
                backgroundColor='rgba(135, 133, 126, 0.50)'
                height='1px'
                width='100%'
                marginBottom='20px'
            />

            {/* company items */}
            <SelectedNavigationSection
                icon={<LuHotel width='20px' height='20px' color='#BBBBBB' />}
                label='Company'
            />
            {
                companylMenu.map((item, index) => (
                    <SelectedNavigationItem 
                        icon={item.icon} 
                        label={item.label}
                        isSelected={pathname === item.path } 
                        key={index} 
                    />
                ))
            }
        </Sider>
  );
};

export default SideBar;


// single menu item
const SelectedNavigationItem = ({ label, icon, isSelected } : NavigationItem) => {
    return (
        <Box
            w='100%'
            padding='8px 20px'
            borderRadius={isSelected ? '10px' : '0px'}
            border={isSelected ? '0.5px solid #000' : 'none'}
            background={isSelected ? 'rgba(242, 242, 242, 0.80)' : 'none'}
            marginBottom='20px'
            cursor='pointer'
        >
            <Flex gap='15px' alignItems='center'>
                {icon}
                <Text 
                    style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#000000'
                    }}
                >
                        {label}
                </Text>
            </Flex>
        </Box>
    )
}

// single menu section
const SelectedNavigationSection = ({ label, icon } : NavigationItem) => {
    return (
        <Box
            w='100%'
            padding='8px 20px'
            marginBottom='12px'
        >
            <Flex gap='15px' alignItems='center'>
                {icon}
                <Text 
                    style={{
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#BBBBBB'
                    }}
                >
                        {label}
                </Text>
            </Flex>
        </Box>
    )
}