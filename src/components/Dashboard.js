import React,{useState} from "react"
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import PersonIcon from '@mui/icons-material/Person';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import TableViewIcon from '@mui/icons-material/TableView';
import { Link } from "react-router-dom"
// import { SiBookstack } from 'react-icons/lib/fa/SiBookstack'

const Dashboard =(props) =>{
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(!open);
    };
    return(
        <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',mt: '150px' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          My Dashboard
        </ListSubheader>
      }
    >
      
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Courses" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <Link to="/admin/courses"  style={{ textDecoration: "none",color: "#d3d8df" }}>
              <ListItemIcon>
                <ListItemText primary="Course related" />
              </ListItemIcon>
            </Link>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
    )
}
export default Dashboard