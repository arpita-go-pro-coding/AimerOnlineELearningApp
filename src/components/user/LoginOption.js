import React from "react"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link,} from "react-router-dom"


const LoginOption =(props) =>{
    const [value, setValue] = React.useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return(
        <Box sx={{ width: '100%', mt: '125px', margin: '135px 850px' }}>
        <Tabs
            value={false}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
        >
            <Tab value="admin" label="admin" component={Link} to="/admin/login"
                sx={{ textDecoration: "none",color: "black" }}
            /> 
            <Tab value="student" label="student" component={Link} to="/students/login"
                sx={{ textDecoration: "none",color: "black" }}
            /> 
        </Tabs>
    </Box>
    )
}
export default LoginOption