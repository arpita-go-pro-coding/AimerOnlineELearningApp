import React, { useState,useEffect } from "react";
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ArrowRight from "@mui/icons-material/ArrowRight";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Home from "@mui/icons-material/Home";
import Settings from "@mui/icons-material/Settings";
import People from "@mui/icons-material/People";
import PermMedia from "@mui/icons-material/PermMedia";
import Dns from "@mui/icons-material/Dns";
import Public from "@mui/icons-material/Public";
import { useSelector,useDispatch } from "react-redux";
import { BsFillCaretDownFill } from "react-icons/bs";
import { startGetAllLectures } from "../../actions/lectureActions";
import VideoPlayer from "./VideoPlayer";

const data = [
  { icon: <People />, label: "Authentication" },
  { icon: <Dns />, label: "Database" },
  { icon: <PermMedia />, label: "Storage" },
  { icon: <Public />, label: "Hosting" },
];

const CourseLectures = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

const Lectures = (props) => {
  const [open, setOpen] = React.useState(false);
  const [isPreviewShown, setPreviewShown] = useState(false);
  const [lectId, setLectId] = useState('')
  const { _id } = props.match.params;
  const dispatch= useDispatch()

  useEffect (()=>{
    dispatch(startGetAllLectures(_id))
  },[])
  const courseInfo = useSelector((state) => {
    return state.course.coursesData;
  });

  
  const selectedCourse = courseInfo.length >0 && courseInfo.find((course) => {
    return course._id === _id;
  });

  const lecturesInfo = useSelector((state) =>{
      return state.lecture.lecturesData
  })
  console.log('lecturesInfo',lecturesInfo)

  const handleVideoPlay =(id) =>{
    //   console.log('id here', id)
      setPreviewShown(true)
      setLectId(id)
  }
  return (
    <Box sx={{ display: "flex" }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: "dark",
            primary: { main: "rgb(102, 157, 246)" },
            background: { paper: "rgb(5, 30, 52)" },
          },
        })}
      >
        <Paper
          elevation={0}
          sx={{
            width: "18vw",
            height: "100vh",
            bgcolor: "background.paper",
            mt: "100px",
          }}
        >
          <CourseLectures component="nav" disablePadding>
            <Box
              sx={{
                bgcolor: open ? "rgba(71, 98, 130, 0.2)" : null,
                pb: open ? 2 : 0,
              }}
            >
              <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen(!open)}
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: open ? 0 : 2.5,
                  "&:hover, &:focus": { "& svg": { opacity: open ? 1 : 0 } },
                }}
              >
                <ListItemText
                  primary={`${selectedCourse.category}- ${selectedCourse.name}`} 
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: "medium",
                    lineHeight: "20px",
                    mb: "2px",
                  }}
                 
                />
                <BsFillCaretDownFill sx={{color: '#FFFFFF'}} /> 
              </ListItemButton>
              {open &&
                lecturesInfo.map((lect,idx) => (
                  <ListItemButton
                    key={lect._id}
                    sx={{ py: 0, minHeight: 32, color: "rgba(255,255,255,.8)" }}
                    onClick={()=>handleVideoPlay(lect._id)}
                  >
                    <ListItemText 
                      primary={`${idx+1}. ${lect.title}`}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    />
                  </ListItemButton>
                ))}
            </Box>
          </CourseLectures>
        </Paper>
      </ThemeProvider>
      {isPreviewShown && <VideoPlayer lectId ={lectId} />}
    </Box>
  );
};
export default Lectures;
