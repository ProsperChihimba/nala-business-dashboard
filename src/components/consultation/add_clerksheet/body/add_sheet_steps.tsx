import {
  Box,
  Center,
  Step,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";

// assets

// icons

import { CiCircleCheck } from "react-icons/ci";

const steps = [
  {
    title: "Chief Complaints",
    description:
      "Answer few questions about your business to open your account",
    icon: <CiCircleCheck size="18px" />,
  },
  {
    title: "History of presenting Illness",
    description:
      "In order to understand more about your business we need your website address",
    icon: <CiCircleCheck size="18px" />,
  },
  {
    title: "Review of other systems",
    description:
      "As we’re setting up your business account it’s important for Nala to know your company size",
    icon: <CiCircleCheck size="18px" />,
  },
  {
    title: "Past Medical and Surgical History",
    description:
      "As our clients it’s import for Nala to know average business revenue",
    icon: <CiCircleCheck size="18px" />,
  },
  {
    title: "Family and Social history ",
    description:
      "Security is our first priority at NALA so it’s for your account to have a password",
    icon: <CiCircleCheck size="18px" />,
  },
];

const AddSheetSteps = () => {
  const { activeStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  return (
    <Box
      backgroundColor="#F9F9F9"
      height="91vh"
      padding="40px"
      paddingLeft="10px"
      paddingTop="1px"
      w="50%"
      borderRadius="40px 0px 0px 40px"
    >
     
      <Center>
        <Stepper
          index={activeStep}
          orientation="vertical"
          height="400px"
          gap="0"
          w="80%"
          marginTop="90px"
        >
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator
                border="0px solid #DCDCDC"
                bg="white"
                borderRadius="10px"
              >
                <StepStatus
                  complete={step.icon}
                  incomplete={step.icon}
                  active={step.icon}
                />
              </StepIndicator>

              <Box flexShrink="0" w="100%">
                <StepTitle style={{ fontWeight: 400, fontSize: "15px" }}>
                  {step.title}
                </StepTitle>
                {/* <StepDescription style={{fontWeight: 400, fontSize: '12px', color: '#9A9A9A'}}>{step.description}</StepDescription> */}
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Center>
    </Box>
  );
};

export default AddSheetSteps;
