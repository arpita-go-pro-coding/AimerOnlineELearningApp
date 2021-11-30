import React from "react"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const DescriptionModal =(props) =>{
    const {flagDesc,closeModal,description,category} = props

    // const handleOpen = () => setOpen(true);
    const handleClose = () =>closeModal('view')
    return(
        <Modal
        open={flagDesc}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {category}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
          <Button size='medium' variant='contained' sx={{mt: '14px'}} onClick={handleClose}>OK</Button>
        </Box>
      </Modal>
    )
}
export default DescriptionModal