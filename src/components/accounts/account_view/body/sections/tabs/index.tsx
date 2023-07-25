import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import AccountOverview from "./overview"
import AccountTransactions from "./transactions"
import AccountStatements from "./statements"


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

        {/* overview tab */}
        <TabPanel padding='0px'>
          <AccountOverview />
        </TabPanel>

        {/* transactions tab */}
        <TabPanel padding='0px'>
          <AccountTransactions />
        </TabPanel>

        {/* statements tab */}
        <TabPanel padding='0px'>
          <AccountStatements />
        </TabPanel>

      </TabPanels>
    </Tabs>
  )
}

export default SingleAccountTabs