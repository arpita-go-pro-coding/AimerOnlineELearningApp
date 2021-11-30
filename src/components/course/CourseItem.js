import React from "react"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import imageMenu from "./imageMenu";

const getImage=(category) =>{
    console.log('getImage name', category)
    const result= imageMenu.find((ele)=>{
        return ele.name===category
    })
    console.log('result image', result.image)
    return result.image
}


const CourseItem =(props) =>{
    const {name, description, duration, level, validity, author, category} = props
    return(
        <Card sx={{ maxWidth: 450 }}>
            <CardMedia
                component="img"
                alt="course-icon"
                height="350"
                image={getImage(category)}
                // image='/images/reactjs.png'
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    

    )
}
export default CourseItem