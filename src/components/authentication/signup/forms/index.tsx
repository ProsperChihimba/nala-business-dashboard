import { 
    Box,
    Center,
    Flex, 
    Step, 
    StepSeparator,  
    Stepper, 
    useSteps 
} from '@chakra-ui/react'
import PersonalDetails from './personal_details'
import CompanyWebsite from './company_website'
import CompanySize from './company_size'
import CompanyRevenue from './company_revenue'
import SetPassword from './password'
import AppButton from '../../../layout/button'
import { useNavigate } from 'react-router-dom'

const steps = [
    {
        index: 1,
        component: <PersonalDetails />
    },
    {
        index: 2,
        component: <CompanyWebsite />
    },
    {
        index: 3,
        component: <CompanySize />
    },
    {
        index: 4,
        component: <CompanyRevenue />
    },
    {
        index: 5,
        component: <SetPassword />
    },
    {
        index: 6,
    }
]

const SignupForms = () => {

    const { activeStep, setActiveStep } = useSteps({
        index: 1,
        count: steps.length,
    })

    const navigate = useNavigate();

  return (
    <Flex marginTop='40px' direction='column' paddingTop='40px'>

        {/* steps */}
        <Center>
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
                    {/* button */}
                    <Flex justifyContent='flex-end'>
                        <AppButton
                            label='Submit'
                            background='#073DFC'
                            color='#fff'
                            width='160px'
                            borderColor='#073DFC'
                            onClick={() => {
                                step.index === 5 ? navigate('/email-sent') : setActiveStep(activeStep + 1)
                            }}
                        />
                    </Flex>
                </Flex>
            ))}
        </Center>
    </Flex>
  )
}

export default SignupForms