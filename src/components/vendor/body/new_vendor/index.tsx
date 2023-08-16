import { Box, Center, Flex } from '@chakra-ui/react'
import VendorDetails from './vendor_details'
import AccountDetails from './account_details'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppButton from '../../../layout/button';

const NewVendor = () => {

  const [ activeStep, setActiveStep ] = useState(1)

  const navigate = useNavigate();

  const steps = [
    {
        index: 1,
        component: <VendorDetails />,
        button: 'Next'
    },
    {
        index: 2,
        component: <AccountDetails />,
        button: 'Save'
    },
  ]

  return (
    <Box
        fontFamily='IBM Plex Sans, sans-serif'
        height='100vh'
        backgroundColor='#F9F9F9'
    >

        <Center>
            {/* personal details */}
            {steps.map((step) => (
                <Flex  w='43%' direction='column' key={step.index} display={activeStep === step.index ? 'inherit' : 'none'}>
                    <Box>
                        {step.component}
                    </Box>
                    {/* button */}
                    <Flex justifyContent='flex-end'>
                        <AppButton
                            label={step.button}
                            background='#073DFC'
                            color='#fff'
                            width='160px'
                            borderColor='#073DFC'
                            onClick={() => {
                                step.index === 2 ? navigate('/vendors') : setActiveStep(activeStep + 1)
                            }}
                        />
                    </Flex>
                </Flex>
            ))}
        </Center>
    </Box>
  )
}

export default NewVendor