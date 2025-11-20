import { Box, Flex } from "@chakra-ui/react"
import AccountsHeader from "./sections/header"
import DashboardCard from "./sections/dashboard_card"
import AccountsLearn from "./sections/learn"
import MySchedule from "./sections/learn/schedule"
import PatientsList from "./sections/patients_list"

const AccountsBody = () => {
  return (
    <Box 
        backgroundColor='#F9F9F9' 
        height='fit' 
        marginTop='7vh'
        padding='20px'
        borderRadius='30px 0px 0px 30px'
    >
        {/* headers */}
        <AccountsHeader />

        {/* Dashboard Card - Main Financial Overview */}
        <DashboardCard />

        {/* Dashboard Sections */}
        <Flex direction="column" gap={6}>
          {/* Top Row: Learn and My Schedule */}
          <Flex gap={6} flexDirection={{ base: "column", lg: "row" }}>
            {/* Learn Section */}
            <Box flex={1}>
              <AccountsLearn />
            </Box>
            
            {/* My Schedule Section */}
            <Box flex={1}>
              <Box
                fontFamily="IBM Plex Sans, sans-serif"
                marginTop="23px"
                border="1px solid #E2E8F0"
                borderRadius="12px"
                padding="20px"
                backgroundColor="white"
              >
                <MySchedule />
              </Box>
            </Box>
          </Flex>

          {/* List of Patients */}
          <PatientsList />
        </Flex>
    </Box>
  )
}

export default AccountsBody