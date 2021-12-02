import React,{useState} from "react"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import imageMenu from "./imageMenu";
import Box from '@mui/material/Box';
import {AiFillEdit,AiFillDelete} from "react-icons/ai";
import { MdDescription } from "react-icons/md"
import DescriptionModal from "./DescriptionModal";
import { useDispatch } from "react-redux"
import { startDeleteCourse } from "../../actions/courseActions";
import { styled, alpha } from '@mui/material/styles'
import EditCourseModal from "./EditCourseModal";
import AddCourse from "./AddCourse";

const getImage=(category) =>{
    const result= imageMenu.find((ele)=>{
        return ele.name===category
    })
    return result.image
}
const CustomCardMedia = styled(CardMedia)(() => ({
    color: "black",
    backgroundColor: "white",
    '&:hover': {
      backgroundColor: "#e1eb73",
    },
}));

const CourseItem =(props) =>{
    const {_id, name, description, duration, level, validity, author, category,releaseDate, isDelete} = props
    const dispatch=  useDispatch()
    const [desc, setDesc] = useState('')
    const [flagDesc, setFlagDesc] = useState(false)
    const [editCourseModalOpen, setEditCourseModalOpen] = useState(false)
    const filledForm={
        _id,
        name,
        description,
        duration,
        releaseDate,
        isDelete,
        category,
        validity,
        level,
        author
    }
    const handleShowDesc =() =>{
        setFlagDesc(true)
        setDesc(description)
    }
    const closeModal =(text) =>{
        if(text==='view')
            setFlagDesc(false)
        else if(text==='edit')
            setEditCourseModalOpen(false)
    }
    const handleDeleteCourse= () =>{
        dispatch(startDeleteCourse(_id))
    }
    const handleUpdateCourse= () =>{
        setEditCourseModalOpen(true)
    }
    return(
        <Card sx={{ maxWidth: 450 }}>
            <CustomCardMedia sx={{p: 5}}
                component="img"
                alt="course-icon"
                height="300"
                image={getImage(category)}
                title={description}
                // image='/images/reactjs.png'
            />
            <CardContent sx={{flex:'1 0 auto', justifyContent: 'center', alignItems: 'center'}}>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
            </CardContent>
            <Box sx={{display: 'flex', alignItems: 'center', pl:1, pb:2}}>
                <CardActions>
                    <Button style={{fontSize: '30px'}}><MdDescription onClick={handleShowDesc} /></Button>
                    <Button style={{fontSize: '30px'}}><AiFillEdit onClick={handleUpdateCourse} /></Button>
                    <Button style={{fontSize: '30px'}}><AiFillDelete onClick={handleDeleteCourse} /></Button>
                    <Button size='large'>Enroll</Button>
                </CardActions>
            </Box>
            {flagDesc && <DescriptionModal 
                desc={desc} id={_id}
                flagDesc={flagDesc} 
                closeModal={closeModal} 
                category ={category}
                description={description} 
            />}
            {editCourseModalOpen && <EditCourseModal modalOpen={editCourseModalOpen} filledForm={filledForm} 
              closeModal={closeModal}
            />}
            {/* {editCourseModalOpen && <AddCourse filledForm={filledForm} editCourseModalOpen={editCourseModalOpen} />} */}
        </Card>
    

    )
}
export default CourseItem