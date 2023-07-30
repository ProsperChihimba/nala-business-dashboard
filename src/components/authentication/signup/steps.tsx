import { Box, Center, Flex, Step, StepDescription, StepIndicator, StepSeparator, StepStatus, StepTitle, Stepper, useSteps } from '@chakra-ui/react'
import { Image } from 'antd'

// assets
import logo from '../../../assets/Logo.svg';
import { MdBusiness } from 'react-icons/md';

const steps = [
  { title: 'Business details', description: 'Answer few questions about your business to open your account' },
  { title: 'Company website', description: 'In order to understand more about your business we need your website address' },
  { title: 'Company size', description: 'As we’re setting up your business account it’s important for Nala to know your company size' },
  { title: 'Company revenue', description: 'As our clients it’s import for Nala to know average business revenue' },
  { title: 'Account password', description: 'Security is our first priority at NALA so it’s for your account to have a password' },
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
      <Flex justifyContent='flex-end'>
        <Image
            src={logo}
            style={{
                paddingLeft: 10,
                marginBottom: 30,
            }}
            preview={false}
        />
      </Flex>

      {/* steps */}
     <Center>
      <Stepper index={activeStep} orientation='vertical' height='400px' gap='0' w='80%' marginTop='90px'>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator border='0px solid #DCDCDC' bg='white' borderRadius='10px'>
                <StepStatus
                  complete={<MdBusiness />}
                  incomplete={<MdBusiness />}
                  active={<MdBusiness />}
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