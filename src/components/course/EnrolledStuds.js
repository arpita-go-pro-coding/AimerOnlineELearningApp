import React,{useRef} from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import { useSelector } from "react-redux"
import { ListItemText } from '@mui/material';

const EnrolledStuds =(props) =>{
    const {name,_id,unenrollToCourse} = props
    const btnColor=useRef("")

    const handleListItemClick =() =>{
        btnColor.current.style.backgroundColor ='#b3a684'
        unenrollToCourse(_id)
        // setSelectedIndex(idx)
        // const input=e.target.value
        // console.log('handleClick',input)
    }
    return(
        <ListItemButton sx={{color: 'blue', fontSize: '20px'}} ref={btnColor}

                                    //     selected={selectedIndex === 0}
                                    //   onClick={(event) => handleListItemClick(event, 0)}
            
                                        >
            <ListItemText onClick={handleListItemClick}><strong>{name}</strong></ListItemText>
        </ListItemButton>
    )
}
export default EnrolledStuds