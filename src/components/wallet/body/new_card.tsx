import { 
    Box,
    Center,
    Flex, 
    useSteps,
} from '@chakra-ui/react'
import { Divider, Spin, Typography } from 'antd'
import Lottie from 'lottie-react'
import load from '../../../assets/load.json'
import AppButton from '../../layout/button'
import DepositInput from '../../layout/input'



const NewCard = () => {

    const steps = [
        {
            index: 1,
            component: <CardDetails />,
            button: 'Save'
        },
        {
            index: 2,
            component: <CardDetails />,
            button: 'Save'
        },
    ]

    const { activeStep, setActiveStep } = useSteps({
        index: 1,
        count: steps.length,
    })

  return (
    <Spin 
        spinning={activeStep === 2 ? true : false}
        indicator={
            <Lottie
                loop
                animationData={load}
                style={{ width: '100%', height: '50px' }}
            />
        }
        style={{ width: '55%', height: '100%'}}
    >
        <Flex width='100%'>

        <Center width='100%'>
                {/* personal details */}
                {steps.map((step) => (
                    <Flex direction='column' key={step.index} display={activeStep === step.index ? 'inherit' : 'none'} width='100%'>
                        <Box>
                            {step.component}
                        </Box>

                        {/* footer */}
                        <Divider style={{marginTop: '5px', marginBottom: '15px'}} />
                        {/* button */}
                        <Flex justifyContent='flex-end' marginBottom='5px'>
                            <AppButton
                                label={step.button}
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
    </Spin>
  )
}

export default NewCard


const CardDetails = () => {

    const { Text } = Typography;
  return (
    <Flex direction='column'>
        <Text
            style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '20px',
                fontWeight: 500,
                color: '#000',
                width: '100%',
                marginBottom: '25px',
            }}
        >
           Create new card
        </Text>

        {/* input */}
        <DepositInput
            title='Card name'
            value=''
            placeholder=''
            isReadOnly={false}
            marginBottom='30px'
            marginTop='0px'
            width='100%'
            height='40px'
        />

    </Flex>
  )
}