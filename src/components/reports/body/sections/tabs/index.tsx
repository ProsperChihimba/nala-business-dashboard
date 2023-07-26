import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import ReportOverview from "./overview"
import AccountStatements from "./statements"
import TransactionsReport from "./transactions"


const ReportTabs = () => {

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
          Expenses
        </Tab>
        <Tab 
          fontWeight='500'
          fontSize='13px'
        >
          Payments
        </Tab>
        <Tab 
          fontWeight='500'
          fontSize='13px'
        >
          Logs
        </Tab>
      </TabList>

      {/* tabs body */}

      <TabPanels>

        {/* overview tab */}
        <TabPanel padding='0px'>
          <ReportOverview />
        </TabPanel>

        {/* transactions tab */}
        <TabPanel padding='0px'>
          <TransactionsReport />
        </TabPanel>

        {/* Expenses tab */}
        <TabPanel padding='0px'>
          <AccountStatements />
        </TabPanel>

      </TabPanels>
    </Tabs>
  )
}

export default ReportTabs