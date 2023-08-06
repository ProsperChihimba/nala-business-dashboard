import { 
    Box,
    Center,
    Flex, 
    Step, 
    StepSeparator,  
    Stepper, 
    useSteps 
} from '@chakra-ui/react'
import Introduction from './introduction'
import AppButton from '../../../../layout/button'
import { Divider } from 'antd'

const steps = [
    {
        index: 1,
        component: <Introduction />
    },
    {
        index: 2,
        component: <Introduction />
    },
    {
        index: 3,
        component: <Introduction />
    },
    {
        index: 4,
    },
]

const NewAccount = () => {

    const { activeStep, setActiveStep } = useSteps({
        index: 1,
        count: steps.length,
    })

  return (
    <Flex direction='column' >

        {/* steps */}
        <Center marginBottom='25px' marginTop='15px'>
            <Stepper index={activeStep} >
                {steps.map((step) => (
                    <Step key={step.index}>
                        <Box w='50px'>
                            <StepSeparator />
                        </Box>
                    </Step>
                ))}
            </Stepper>
        </Center>

       <Center>
            {/* personal details */}
            {steps.map((step) => (
                <Flex direction='column' key={step.index} display={activeStep === step.index ? 'inherit' : 'none'}>
                    <Box>
                        {step.component}
                    </Box>

                    {/* footer */}
                    <Divider style={{marginTop: '35px', marginBottom: '15px'}} />
                    {/* button */}
                    <Flex justifyContent='flex-end'>
                        <AppButton
                            label='Next'
                            background='#073DFC'
                            color='#fff'
                            width='150px'
                            borderColor='#073DFC'
                            onClick={() => {
                                setActiveStep(activeStep + 1)
                            }}
                        />
                    </Flex>
                </Flex>
            ))}
        </Center>
    </Flex>
  )
}

export default NewAccount