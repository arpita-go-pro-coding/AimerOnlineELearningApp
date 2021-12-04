import React from "react"
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useSelector } from "react-redux";

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

const ViewModal =(props) =>{
    const {modalOpen,selectedRecord,closeModal} =props
    // console.log('selectedRec',selectedRecord)
    const selectedCoursesIds= selectedRecord.courses.map((c)=>{
        return c.course
    })
    console.log('selectedCoursesIds',selectedCoursesIds)

    const coursesInfo= useSelector((state)=>{
        return state.course.coursesData
    })
    // console.log('coursesInfo',  coursesInfo)
    const enrolledCourses= coursesInfo.filter((course)=>{
        return selectedCoursesIds.includes(course._id)
    })
    console.log('Enrolled courses', enrolledCourses)
    const handleClose = () => closeModal('view');
    
    return(
        <div>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5">
                        {selectedRecord.name} {selectedRecord._id}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <strong>Email-</strong> {selectedRecord.email}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <strong>isAllowed-</strong> {selectedRecord.isAllowed ? 'Yes' : 'No'}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <strong>Role-</strong> {selectedRecord.role}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <strong>createdAt-</strong> {selectedRecord.createdAt}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <strong>updatedAt-</strong> {selectedRecord.updatedAt}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <strong><u>Courses-</u></strong> 
                        {enrolledCourses.length>0 ? enrolledCourses.map((c)=>{
                            return <p key={c._id}> <strong>{c.category} </strong> -{c.name} </p>
                        }) : 'NIL'}
                    </Typography>
                    <br/>
                    <Button variant='contained' onClick={handleClose}>Ok</Button>
                </Box>
                
            </Modal>
        </div>
    )
}
export default ViewModal