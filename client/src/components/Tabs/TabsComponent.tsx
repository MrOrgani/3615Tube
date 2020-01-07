import React from "react";
import {
  Tabs,
  Typography,
  // Box,
  Tab
} from "@material-ui/core";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
      {/* {value === index && <Box p={3}>{children}</Box>} */}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const TabsComponent = (props: any) => {
  const { tabsNames, tabsToRender } = props;

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    // event = event;
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
        style={{
          display: "flex",
          justifyContent: "center",
          color: "white"
        }}
      >
        {tabsNames.map((tab: string, index: number) => {
          return (
            <Tab key={`${tab + index}`} label={tab} {...a11yProps(index)} />
          );
        })}
      </Tabs>
      {tabsToRender.map((component: any, index: number) => {
        return (
          <TabPanel key={`${component + index}`} value={value} index={index}>
            {component}
          </TabPanel>
        );
      })}
    </div>
  );
};

export default TabsComponent;
