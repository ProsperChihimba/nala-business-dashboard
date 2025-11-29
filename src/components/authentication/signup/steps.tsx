import { Box, Center,  Step, StepDescription, StepIndicator, StepSeparator, StepStatus, StepTitle, Stepper, useSteps } from '@chakra-ui/react'

// assets

// icons
import { TbLockCog } from "react-icons/tb";

const steps = [
  { title: 'Account password', description: 'Security is our first priority at Just Tap App so it\'s for your account to have a password and their card then make sure to center the remain left side', icon: <TbLockCog size='18px' /> },
]

const SignupSteps = () => {

  const { activeStep } = useSteps({
    index: 0,
    count: steps.length,
  })

  return (
    <Box
        backgroundColor='#F9F9F9' 
        height='91vh' 
        marginTop='4.5vh'
        padding='40px'
        w='40%'
        borderRadius='40px 0px 0px 40px'
    >

      {/* logo */}
      {/* <Flex justifyContent='flex-end'>
        <Image
            src={logo}
            style={{
                paddingLeft: 10,
                marginBottom: 30,
            }}
            preview={false}
        />
      </Flex> */}

      {/* steps */}
     <Center>
      <Stepper index={activeStep} orientation='vertical' height='400px' gap='0' w='80%' marginTop='90px'>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator border='0px solid #DCDCDC' bg='white' borderRadius='10px'>
                <StepStatus
                  complete={step.icon}
                  incomplete={step.icon}
                  active={step.icon}
                />
              </StepIndicator>

              <Box flexShrink='0' w='100%'>
                <StepTitle style={{fontWeight: 400, fontSize: '16px'}}>{step.title}</StepTitle>
                <StepDescription style={{fontWeight: 400, fontSize: '12px', color: '#9A9A9A'}}>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
      </Stepper>
     </Center>
    </Box>
  )
}

export default SignupSteps