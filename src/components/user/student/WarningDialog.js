import React from "react"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const WarningDialog =(props) =>{
    const {dialogOpen, handleDialogClose,handleClose} = props
    return(
        <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"No changes made"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Make changes to save.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleDialogClose}>Disagree</Button> */}
          <Button onClick={()=>{
              handleDialogClose()
              handleClose()
          }} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    )
}
export default WarningDialog