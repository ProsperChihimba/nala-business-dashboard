import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import AccountOverview from "./overview"


const SingleAccountTabs = () => {

  return (
    <Tabs
      fontFamily='IBM Plex Sans, sans-serif'
      color='#6D6D6D'
    >
      {/* tabs header */}
      <TabList>
        <Tab 
          fontWeight='500'
          fontSize='13px'
        >
          Overview
        </Tab>
        <Tab 
          fontWeight='500'
          fontSize='13px'
        >
          Transactions
        </Tab>
        <Tab 
          fontWeight='500'
          fontSize='13px'
        >
          Statements
        </Tab>
      </TabList>

      {/* tabs body */}

      <TabPanels>
        <TabPanel padding='0px'>
          <AccountOverview />
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default SingleAccountTabs