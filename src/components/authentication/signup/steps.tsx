import { Box, Center,  Step, StepDescription, StepIndicator, StepSeparator, StepStatus, StepTitle, Stepper, useSteps } from '@chakra-ui/react'

// assets

// icons
import { TbLockCog } from "react-icons/tb";
import { MdOutlineWorkOutline } from "react-icons/md";
import { CiGlobe } from "react-icons/ci";
import { PiUsersThreeThin, PiChartLineUpLight } from "react-icons/pi";

const steps = [
  { title: 'Business details', description: 'Answer few questions about your business to open your account', icon: <MdOutlineWorkOutline size='18px' /> },
  { title: 'Company website', description: 'In order to understand more about your business we need your website address', icon: <CiGlobe size='18px' /> },
  { title: 'Company size', description: 'As we\'re setting up your business account it\'s important for Just Tap App to know your company size', icon: <PiUsersThreeThin size='18px' /> },
  { title: 'Company revenue', description: 'As our clients it\'s import for Just Tap App to know average business revenue', icon: <PiChartLineUpLight size='18px' /> },
  { title: 'Account password', description: 'Security is our first priority at Just Tap App so it\'s for your account to have a password', icon: <TbLockCog size='18px' /> },
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