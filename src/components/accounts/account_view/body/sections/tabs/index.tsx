import { Tabs, TabsProps } from 'antd';

const SingleAccountTabs = () => {

    // tabs items
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: `Overview`,
          children: `Content of Tab Pane 1`,
        },
        {
          key: '2',
          label: `Transactions`,
          children: `Content of Tab Pane 2`,
        },
        {
          key: '3',
          label: `Statements`,
          children: `Content of Tab Pane 3`,
        },
      ];
  return (
    <Tabs 
        defaultActiveKey="1" 
        items={items}
        tabBarStyle={{
            fontFamily: 'IBM Plex Sans, sans-serif',
            color: '#000000',
            fontWeight: 400,
            fontSize: '10px',
        }}
    />
  )
}

export default SingleAccountTabs