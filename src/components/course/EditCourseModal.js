import React,{useState} from "react"
import {Typography, MenuItem} from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const EditCourseModal =(props) =>{
    const {modalOpen,filledForm,closeModal} =props
    console.log('filled form',filledForm)

    const handleClose = () => closeModal('edit');
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
                        defaultValue={filledForm.name}
                        // onChange={(e)=>handleChange(e,'name')} 
                        />
                    </Typography>

                    <Typography id="modal-modal-title" variant="h6" sx={{mt: '16px'}}>
                        Description-
                        <TextField 
                        type="text"
                        defaultValue={filledForm.description}
                        // onChange={(e)=>handleChange(e,'description')} 
                        />
                    </Typography>

                    <Typography id="modal-modal-title" variant="h6" sx={{mt: '16px'}}>
                        Duration-
                        <TextField 
                        type="text"
                        defaultValue={filledForm.duration}
                        // onChange={(e)=>handleChange(e,'duration')} 
                        />
                    </Typography>

                    <Typography id="modal-modal-title" variant="h6" sx={{mt: '16px'}}>
                        Release Date-
                        <TextField 
                        type="text"
                        defaultValue={filledForm.releaseDate}
                        // onChange={(e)=>handleChange(e,'releaseDate')} 
                        />
                    </Typography>

                    <Typography id="modal-modal-title" variant="h6" sx={{mt: '16px'}}>
                        isAllowed-
                        <RadioGroup row aria-label="delete" name="isDelete"
                            defaultValue={filledForm.isDelete} 
                            // onChange={(e)=>handleChange(e,'isDelete')}
                            sx={{justifyContent: 'center'}}
                        >
                            <FormControlLabel value="true" control={<Radio />}  label="true" />
                            <FormControlLabel value="false" control={<Radio />}  label="false" />
                
                    </RadioGroup>
                    </Typography>

                    <Typography id="modal-modal-title" variant="h6" sx={{mt: '16px'}}>
                        Category-
                        <TextField 
                        type="text"
                        // defaultValue={filledForm.category}
                        // onChange={(e)=>handleChange(e,'category')} 
                        >   
                            <MenuItem defaultValue={filledForm.category} />
                                {/* {option.label}
                            </MenuItem>  */}
                        </TextField>
                    </Typography>

                    <Typography id="modal-modal-title" variant="h6" sx={{mt: '16px'}}>
                        Validity-
                        <TextField 
                        type="text"
                        defaultValue={filledForm.validity}
                        // onChange={(e)=>handleChange(e,'validity')} 
                        />
                    </Typography>

                    <Typography id="modal-modal-title" variant="h6" sx={{mt: '16px'}}>
                        Level-
                        <TextField 
                        type="text"
                        defaultValue={filledForm.level}
                        // onChange={(e)=>handleChange(e,'level')} 
                        />
                    </Typography>

                    <Typography id="modal-modal-title" variant="h6" sx={{mt: '16px'}}>
                        Author-
                        <TextField 
                        type="text"
                        defaultValue={filledForm.author}
                        // onChange={(e)=>handleChange(e,'author')} 
                        />
                    </Typography>

                    <Box sx={{mt:'16px', display:'flex' ,justifyContent: "space-evenly"}}>
                        <Button variant='contained' >Update</Button>
                        <Button variant='contained' onClick={handleClose}>Cancel</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}
export default EditCourseModal