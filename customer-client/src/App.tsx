import { Box, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import './App.css';
import { Form } from './components/form';
import { AllBuysComponent } from './components/getAllBuys';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function moreProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{ display: 'flex', flexDirection: 'column'}}>
          <Tab label="Make Purchase" {...moreProps(0)} />
          <Tab label="All Purchases" {...moreProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Form/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AllBuysComponent/>
      </CustomTabPanel>
    </Box>
  );
}

export default App;
