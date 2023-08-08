import { Box, Center, Flex } from '@chakra-ui/react'
import RecipientDetails from './sections/recipient'
import PaymentDetals from './sections/payment_details'
import PaymentApproval from './sections/approval'
import AppButton from '../layout/button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SendTransaction = () => {

  const [ activeStep, setActiveStep ] = useState(1)

  const navigate = useNavigate();

  const steps = [
    {
        index: 1,
        component: <RecipientDetails />,
        button: 'Next'
    },
    {
        index: 2,
        component: <PaymentDetals />,
        button: 'Next'
    },
    {
        index: 3,
        component: <PaymentApproval />,
        button: 'Submit'
    },
  ]
  return (
    <Box
        fontFamily='IBM Plex Sans, sans-serif'
        height='100vh'
        backgroundColor='#F9F9F9'
    >

        {/*sections  */}
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
                                step.index === 3 ? navigate('/accounts-page') : setActiveStep(activeStep + 1)
                            }}
                        />
                    </Flex>
                </Flex>
            ))}
        </Center>
    </Box>
  )
}

export default SendTransaction