import React from "react";
import Box from '@mui/material/Box'
import { Typography } from "@mui/material"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useSelector,useDispatch } from "react-redux";



const StudentAccount =(props) =>{
    const studInfo=useSelector((state)=>{
        return state.student.studentsData
    })
    console.log('StudentAccount studInfo',studInfo)
    return(
        <Box
            component="div"
            sx={{mt: '102px', textAlign: 'center', backgroundColor: '#ffe01b', height:'100vh'}}
        >
            <Typography variant="h3" color="primary" gutterBottom>
                Account Info 
            </Typography> 
            <div style={{marginLeft : '840px',padding: '5px'}}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                        <Box>
                            {Object.keys(studInfo).length >0 && (
                                <>
                                    <Typography gutterBottom variant="h5">
                                        User Name
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        {studInfo.name}
                                    </Typography>
                                    <Typography gutterBottom variant="h5">
                                        User Email
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        {studInfo.email}
                                    </Typography>
                                    <Typography gutterBottom variant="h5">
                                        User Role
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        {studInfo.role}
                                    </Typography>
                                    <Typography gutterBottom variant="h5">
                                        Courses
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        {studInfo.courses.length>0 ? studInfo.courses.join() : 'NIL'}
                                    </Typography>
                                </>
                            )}
                        </Box>
                    </CardContent>

                </Card>
            </div>
        
        </Box>
    )
}
export default StudentAccount