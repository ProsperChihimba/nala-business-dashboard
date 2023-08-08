import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import SingleTab from "./single_tab"


const DepositProcessTabs = () => {

  return (
    <Tabs
      fontFamily='IBM Plex Sans, sans-serif'
      color='#6D6D6D'
      mt='25px'
    >
      {/* tabs header */}
      <TabList justifyContent='center' gap='12%'>
        <Tab 
          fontWeight='500'
          fontSize='13px'
          textAlign='center'
        >
          Domestic ACH / Wire
        </Tab>
        <Tab 
          fontWeight='500'
          fontSize='13px'
            textAlign='center'
        >
          International Wire
        </Tab>
      </TabList>

      {/* tabs body */}

      <TabPanels>

        {/* overview tab */}
        <TabPanel padding='0px'>
          <SingleTab />
        </TabPanel>

        {/* transactions tab */}
        <TabPanel padding='0px'>
            <SingleTab />
        </TabPanel>

      </TabPanels>
    </Tabs>
  )
}

export default DepositProcessTabs