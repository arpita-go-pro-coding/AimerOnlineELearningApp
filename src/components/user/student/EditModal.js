import React,{useState} from "react"
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import { startEditStud } from "../../../actions/studentActions";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch } from "react-redux";
// import Swal from 'sweetalert2'
import WarningDialog from "./WarningDialog";


const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const EditModal =(props) =>{
    const dispatch=useDispatch()
    const {modalOpen,selectedRecord,closeModal} =props
    
    // console.log('edit Modal recordToBeUpdated',selectedRecord)

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [isAllowed,setIsAllowed] = useState('')
    const [changesMade, setChangesMade] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleClose = () => closeModal('edit');

    const handleChange =(e,text) =>{
        const input=e.target.value
        console.log('hey isAllowed',input)
        if(text==='name'){
            setName(input)
        }else if(text==='email'){
            setEmail(input)
        }else if(text==='isAllowed'){
            setIsAllowed(input)
        }
        setChangesMade(true)
    }
    const handleUpdate=() =>{
        console.log('handleUpdate isAllowed',isAllowed )
        console.log('handleUpdate selectedRecord.isAllowed',selectedRecord.isAllowed )
        if(changesMade){
            const newUpdatedForm={
                name: name ? name : selectedRecord.name,
                email: email ? email : selectedRecord.email,
                isAllowed: isAllowed ? isAllowed : selectedRecord.isAllowed
            }
            console.log('newUpdatedForm',newUpdatedForm)
            dispatch(startEditStud(selectedRecord._id,newUpdatedForm,handleClose))
        }else{
            setDialogOpen(true)
        }
    }
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    return(
        <div>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6">
                        Name-
                        <TextField 
                        type="text"
                        defaultValue={selectedRecord.name}
                        onChange={(e)=>handleChange(e,'name')} 
                        />
                    </Typography>

                    <Typography id="modal-modal-title" variant="h6" sx={{mt: '16px'}}>
                        Email-
                        <TextField 
                        type="text"
                        defaultValue={selectedRecord.email}
                        onChange={(e)=>handleChange(e,'email')} 
                        />
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" sx={{mt: '16px'}}>
                        isAllowed-
                        <RadioGroup row aria-label="allowed" name="isAllowed"
                            defaultValue={selectedRecord.isAllowed} onChange={(e)=>handleChange(e,'isAllowed')}
                            sx={{justifyContent: 'center'}}
                        >
                            <FormControlLabel value="true" control={<Radio />}  label="true" />
                            <FormControlLabel value="false" control={<Radio />}  label="false" />
                            {/* <FormControlLabel value="na" control={<Radio />}  label="na" /> */}
                
                    </RadioGroup>
                    </Typography>
                    <Box sx={{mt:'16px', display:'flex' ,justifyContent: "space-evenly"}}>
                        <Button variant='contained' onClick={handleUpdate}>Update</Button>
                        <Button variant='contained' onClick={handleClose}>Cancel</Button>
                    </Box>
                </Box>
                

            </Modal>
            {dialogOpen && 
                <WarningDialog dialogOpen={dialogOpen} 
                    handleDialogClose={handleDialogClose}
                    handleClose= {handleClose} 
                />
            }
        </div>
    )
}
export default EditModal