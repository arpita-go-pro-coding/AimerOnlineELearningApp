import React, { useEffect } from "react"
import ReactPlayer from 'react-player'
import Box from "@mui/material/Box"
import { useSelector } from "react-redux"

const VideoPlayer =(props) =>{
    const {lectId} = props
    const lecturesInfo= useSelector((state) =>{
        return state. lecture. lecturesData
    })
    const requiredLecture= lecturesInfo.find((lec)=>{
        return lec._id===lectId
    })
    console.log('req lecture',requiredLecture)
    return(
        <Box 
        // sx={{marginTop: '400px',marginleft: '700px'}}
        >
            <ReactPlayer controls width='950px' height='550px' url={requiredLecture.assetURL} />
        </Box>
    )
}
export default VideoPlayer