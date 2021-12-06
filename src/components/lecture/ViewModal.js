import React from "react"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useSelector } from "react-redux"
import { FcViewDetails } from "react-icons/fc";
import { Divider } from "@mui/material";
import Button from '@mui/material/Button';

const style = {
    position: 'absolute' ,
    top: '50%',
    left: '80%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    // bgcolor: 'background.paper',
    bgcolor: '#7D7EB5',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ViewModal =(props) =>{
    const {viewDetailsModal,closeModal,lectId} = props
    const lecturesInfo= useSelector((state) =>{
        return state. lecture. lecturesData
    })
    const requiredLecture= lecturesInfo.find((lec)=>{
        return lec._id===lectId
    })
    const handleClose =() =>{
        closeModal('view')
    }
    return(
        <div>
            <Modal
                open={viewDetailsModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5">
                        View Lecture Details <FcViewDetails/>
                    </Typography>
                    <Divider/>
                    <Typography id="modal-modal-title" variant="h5" sx={{ mt: 2 }}>
                        <strong>Lec Id - </strong>{requiredLecture._id}
                    </Typography>
                    <Typography id="modal-modal-title" variant="h5" sx={{ mt: 2 }}>
                        <strong>Title - </strong>{requiredLecture.title}
                    </Typography>
                    <Typography id="modal-modal-title" variant="h5" sx={{ mt: 2 }}>
                        <strong>Description - </strong>{requiredLecture.description}
                    </Typography>
                    <Typography id="modal-modal-title" variant="h5" sx={{ mt: 2 }}>
                        <strong>Asset Type - </strong>{requiredLecture.assetType}
                    </Typography>
                    <Typography id="modal-modal-title" variant="h5" sx={{ mt: 2 }}>
                        <strong>Asset URL - </strong>{requiredLecture.assetURL}
                    </Typography>
                    <Typography id="modal-modal-title" variant="h5" sx={{ mt: 2 }}>
                        <strong>Course Id - </strong>{requiredLecture.course}
                    </Typography>
                    <Typography id="modal-modal-title" variant="h5" sx={{ mt: 2 }}>
                        <strong>isDelete - </strong>{requiredLecture.isDelete ? 'True' : 'False'}
                    </Typography>
                    <Typography id="modal-modal-title" variant="h5" sx={{ mt: 2 }}>
                        <strong>user - </strong>{requiredLecture.user}
                    </Typography>
                    <Typography id="modal-modal-title" variant="h5" sx={{ mt: 2 }}>
                        <strong>createdAt - </strong>{requiredLecture.createdAt}
                    </Typography>
                    <Typography id="modal-modal-title" variant="h5" sx={{ mt: 2 }}>
                        <strong>updatedAt - </strong>{requiredLecture.updatedAt}
                    </Typography>
                    <Button variant="contained" onClick={handleClose} sx={{ml:30, mt: 5}}>OK</Button>
                </Box>

            </Modal>
        </div>
    )
}
export default ViewModal