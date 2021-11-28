import React from "react"
import Box from "@mui/material/Box"
import { Typography } from "@mui/material"
// import bgImage from '../assets/home_pics/home_bgimage.png'
import bgImage from '../assets/home_pics/bg-image.jpg'
import aimers_logo from '../assets/aimer.png'

const Header =(props) =>{
    return(
        <Box
            component="div"
            sx={{backgroundColor: '#ffe01b',mt:'100px'}}
        >
                <Box sx={{display: 'flex', 
                    justifyContent: "space-between"}}>
                        <Box sx={{minHeight: '88vh',alignItems:'center',
                            justifyContent: 'center'}}>
                            <Typography 
                                sx={{fontFamily:'cursive', fontWeight:'bold',color:'#595c61',mt: '165px'}}
                                variant="h4"
                                color="primary"  
                                gutterBottom
                            >
                                Learn anytime, anywhere!
                            </Typography>
                            <Typography 
                                sx={{fontFamily:'cursive', fontWeight:'bold',color:'#2596be',mt: '45px', ml: '55px'}}
                                variant="h5"
                                color="primary"  
                                gutterBottom
                                paragraph
                            >
                                An immersive learning experience 
                            </Typography>
                        </Box>
                        <Box component="img"
                            sx={{ minHeight: '70vh', 
                            width:'70%',backgroundRepeat: 'no-repeat',
                            backgroundSize:'cover'
                            }}
                            alt="background-image"
                            src={bgImage}
                        
                        />
            </Box>
        </Box>
    )
}
export default Header