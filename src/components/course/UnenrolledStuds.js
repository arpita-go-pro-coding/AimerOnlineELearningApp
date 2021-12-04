import React,{useRef,useState} from "react"
import ListItemButton from '@mui/material/ListItemButton';
import { ListItemText } from '@mui/material';

const UnenrolledStuds = (props) =>{
    const [selectedItem, setSelectedItem] = useState(null)
    const btnColor=useRef("")
    const {name,_id,enrollToCourse} = props
    const handleListItemClick =() =>{
        // console.log('clicked unerolled')
        btnColor.current.style.backgroundColor ='#b3a684'
        enrollToCourse(_id)

    }
    return(
        <ListItemButton sx={{color: 'blue', fontSize: '20px'}} ref={btnColor}>
            <ListItemText onClick={handleListItemClick} 
                checked={_id === selectedItem}
            >
                <strong>{name}</strong>
            </ListItemText>
        </ListItemButton>
    )
}
export default UnenrolledStuds