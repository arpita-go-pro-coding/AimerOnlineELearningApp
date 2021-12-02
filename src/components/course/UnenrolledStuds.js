import React from "react"
import ListItemButton from '@mui/material/ListItemButton';

const UnenrolledStuds = (props) =>{
    const {name} = props
    // console.log('unerolledStuds',name)
    return(
        <ListItemButton 
                                        // selected={selectedIndex === 0}
                                        // onClick={(event) => handleListItemClick(event, 0)}
                                        >
            {/* hey */}
            <strong>{name}</strong>
        </ListItemButton>
    )
}
export default UnenrolledStuds