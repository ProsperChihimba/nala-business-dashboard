import { ReactNode } from 'react';
import {  Layout, Typography } from 'antd';
import { Box, Flex } from '@chakra-ui/react';

// side bar icons
import { BsBank2 } from "react-icons/bs";
import { CiReceipt } from "react-icons/ci";
import { AiOutlineLineChart } from "react-icons/ai";
import { LuHotel } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";

// assets
import { To, useNavigate } from 'react-router-dom';



const { Sider } = Layout;
const { Text } = Typography;

// type for menus
interface NavigationItem {
    label: string;
    path?: string;
    icon: ReactNode;
    isSelected?: boolean;
    subPath?: string[];
}

const SideBar = () => {

    // personal menu items
    const personalMenu: NavigationItem[] = [];

    // company menu items
    const companylMenu: NavigationItem[] = [
        {
            label: "Dashboard", 
            path: '/accounts-page', 
            icon: <BsBank2 width='20px' height='20px' color='#000000' />, 
            subPath: ['/account-view']
        },
        {
            label: "Consultation", 
            path: '/consultation', 
            icon: <CiReceipt width='20px' height='20px' color='#000000' />, 
        },
        {
            label: "Learn", 
            path: '/learn', 
            icon: <AiOutlineLineChart width='20px' height='20px' color='#000000' />, 
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
                paddingTop: 50,
                paddingRight: 15,
              

            }}
        >

            {/* logo */}
            {/* <Image
                src={logo}
                style={{
                    paddingLeft: 10,
                    marginBottom: 30,
                }}
                preview={false}
            /> */}

            {/* personal items */}
            {personalMenu.length > 0 && (
              <>
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
                            path={item.path}
                        />
                    ))
                }
              </>
            )}

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
                label='Hospital'
            />
            {
                companylMenu.map((item, index) => (
                    <SelectedNavigationItem 
                        icon={item.icon} 
                        label={item.label}
                        isSelected={pathname === item.path || item.subPath?.includes(pathname) } 
                        key={index} 
                        path={item.path}
                    />
                ))
            }
        </Sider>
  );
};

export default SideBar;


// single menu item
const SelectedNavigationItem = ({ label, icon, isSelected, path } : NavigationItem) => {

    const navigate = useNavigate();
    return (
        <Box
            w='100%'
            padding='8px 20px'
            borderRadius={isSelected ? '10px' : '0px'}
            border={isSelected ? '0.5px solid #000' : 'none'}
            background={isSelected ? 'rgba(242, 242, 242, 0.80)' : 'none'}
            marginBottom='20px'
            cursor='pointer'
            onClick={()=> {isSelected ? null : navigate(path as To)}}
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