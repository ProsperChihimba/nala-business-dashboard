import { Typography } from "antd";

interface HeadingProps  {
    title: string;
}


const DepositHeading = ({title}: HeadingProps) => {

    const { Text } = Typography;
  return (
    <Text
        style={{
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontSize: '30px',
            fontWeight: 600,
            color: '#000',
        }}
    >
        {title}
    </Text>
  )
}

export default DepositHeading