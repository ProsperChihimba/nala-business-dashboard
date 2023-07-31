import { 
    Box,
    Center,
    Flex, 
    Step, 
    StepSeparator,  
    Stepper, 
    useSteps 
} from '@chakra-ui/react'
// import PersonalDetails from './personal_details'
// import CompanyWebsite from './company_website'
import CompanySize from './company_size'

const steps = [1,2, 3, 4, 5]

const SignupForms = () => {

    const { activeStep } = useSteps({
        index: 1,
        count: steps.length,
      })

  return (
    <Flex marginTop='40px' direction='column' paddingTop='40px'>

        {/* steps */}
        <Center>
            <Stepper index={activeStep} >
                {steps.map((step, index) => (
                    <Step key={index}>
                        <Box w='50px'>
                            <StepSeparator />
                        </Box>
                    </Step>
                ))}
            </Stepper>
        </Center>

       <Center>
           {/* personal details */}
            <CompanySize />
        </Center>
    </Flex>
  )
}

export default SignupForms