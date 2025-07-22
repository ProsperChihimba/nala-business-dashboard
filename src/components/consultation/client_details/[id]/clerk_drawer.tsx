import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

const ClerkDrawer = () => {
  return (
    <Tabs fontFamily="IBM Plex Sans, sans-serif" color="#6D6D6D">
      {/* tabs header */}
      <TabList display="flex" justifyContent="space-between">
        <Tab fontWeight="500" fontSize="13px">
          Compliants
        </Tab>
        <Tab fontWeight="500" fontSize="13px">
          HPI
        </Tab>
        <Tab fontWeight="500" fontSize="13px">
          ROS
        </Tab>
        <Tab fontWeight="500" fontSize="13px">
          PMHx
        </Tab>
        <Tab fontWeight="500" fontSize="13px">
          FSHx
        </Tab>
      </TabList>

      {/* tabs body */}

      <TabPanels padding={5}>
        {/* overview tab */}
        <TabPanel padding="0px">
          <Text>Chief Complaints</Text>
        </TabPanel>

        {/* transactions tab */}
        <TabPanel padding="0px">
          <Text>History of presenting Illness</Text>
        </TabPanel>

        {/* statements tab */}
        <TabPanel padding="0px">
          <Text>Review of other systems</Text>
        </TabPanel>

        <TabPanel padding="0px">
          <Text>Past Medical and Surgical History</Text>
        </TabPanel>

        <TabPanel padding="0px">
          <Text>Family and Social history </Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ClerkDrawer;
