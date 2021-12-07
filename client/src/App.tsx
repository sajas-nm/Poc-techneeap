import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import DepartmentTable from './components/DepartmentTable';
import DepartmentModal from './components/DepartmentModal';
import EmployeeModal from './components/EmployeeModal';
import EmployeeTable from './components/EmployeeTable';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [isDepartmentModal, setDepartmentModal] = React.useState(false);
    const [isEmployeeModal, setEmployeeModal] = React.useState(false);
    const [currentDepartmentData, setCurrentDepartmentData] = React.useState(
        {},
    );

    const [currentEmployeeData, setCurrentEmployeeData] = React.useState({});

    const handleChange = (event: React.ChangeEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleEditDepartment = (data) => {
        setCurrentDepartmentData(data);
        setDepartmentModal(true);
    };

    const handleEditEmployee = (data) => {
        setCurrentEmployeeData(data);
        setEmployeeModal(true);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example">
                    <Tab label="Department" {...a11yProps(0)} />
                    <Tab label="Employee" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setDepartmentModal(true)}>
                        Create Department
                    </Button>
                    <br />
                    <br />
                    <DepartmentModal
                        setModal={setDepartmentModal}
                        isModal={isDepartmentModal}
                        currentData={currentDepartmentData}
                        setCurrentData={setCurrentDepartmentData}
                    />
                    <DepartmentTable handleEdit={handleEditDepartment} />
                </>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setEmployeeModal(true)}>
                    Create Employee
                </Button>
                <br />
                <br />
                <EmployeeModal
                    setModal={setEmployeeModal}
                    isModal={isEmployeeModal}
                    currentData={currentEmployeeData}
                    setCurrentData={setCurrentEmployeeData}
                />
                <EmployeeTable handleEdit={handleEditEmployee} />
            </TabPanel>
        </div>
    );
}
