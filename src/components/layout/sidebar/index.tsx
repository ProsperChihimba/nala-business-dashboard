import { ReactNode, useState } from 'react';
import {  Layout, Typography } from 'antd';
import { Box, Flex, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

// side bar icons
import { BsBank2 } from "react-icons/bs";
import { AiOutlineLineChart } from "react-icons/ai";
import { LuHotel } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { MdPersonAdd, MdMonitorHeart, MdShare } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";

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
    hasDropdown?: boolean;
    dropdownItems?: { label: string; path: string }[];
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
            label: "Register My Patients", 
            path: '/register-patients', 
            icon: <MdPersonAdd width='20px' height='20px' color='#000000' />,
            hasDropdown: true,
            dropdownItems: [
                { label: "Smart Phone user", path: '/register-patients/smartphone' },
                { label: "Non-smartphone user", path: '/register-patients/non-smartphone' }
            ]
        },
        {
            label: "Patient Monitoring", 
            path: '/patient-monitoring', 
            icon: <MdMonitorHeart width='20px' height='20px' color='#000000' />, 
        },
        {
            label: "Learn", 
            path: '/learn', 
            icon: <AiOutlineLineChart width='20px' height='20px' color='#000000' />, 
        },
        {
            label: "Refer Patient", 
            path: '/refer-patient', 
            icon: <MdShare width='20px' height='20px' color='#000000' />, 
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
                    item.hasDropdown ? (
                        <NavigationItemWithDropdown
                            key={index}
                            item={item}
                            pathname={pathname}
                        />
                    ) : (
                        <SelectedNavigationItem 
                            icon={item.icon} 
                            label={item.label}
                            isSelected={pathname === item.path || item.subPath?.includes(pathname) } 
                            key={index} 
                            path={item.path}
                        />
                    )
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

// navigation item with dropdown
const NavigationItemWithDropdown = ({ item, pathname }: { item: NavigationItem; pathname: string }) => {
    const navigate = useNavigate();
    const isSelected = pathname === item.path || item.dropdownItems?.some(dropItem => pathname === dropItem.path);
    
    return (
        <Menu>
            <MenuButton
                as={Box}
                w='100%'
                padding='8px 20px'
                borderRadius={isSelected ? '10px' : '0px'}
                border={isSelected ? '0.5px solid #000' : 'none'}
                background={isSelected ? 'rgba(242, 242, 242, 0.80)' : 'none'}
                marginBottom='20px'
                cursor='pointer'
            >
                <Flex gap='15px' alignItems='center'>
                    {item.icon}
                    <Text 
                        style={{
                            fontFamily: 'IBM Plex Sans, sans-serif',
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#000000'
                        }}
                    >
                        {item.label}
                    </Text>
                </Flex>
            </MenuButton>
            <MenuList>
                {item.dropdownItems?.map((dropItem, idx) => (
                    <MenuItem 
                        key={idx}
                        onClick={() => navigate(dropItem.path as To)}
                    >
                        {dropItem.label}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}