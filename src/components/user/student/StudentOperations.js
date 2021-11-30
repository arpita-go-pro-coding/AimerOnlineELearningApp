import React,{useState} from "react"
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector,useDispatch } from "react-redux";
import { styled } from '@mui/material/styles'
import { Typography } from "@mui/material"
import { startDeleteStud } from "../../../actions/studentActions";
// import { FcBinoculars } from 'react-icons/fa'
import ViewModal from "./ViewModal";
import EditModal from "./EditModal";


const HeadingTypography = styled(Typography)(() => ({
    color: "black",
    fontFamily: 'Georgia,Times,serif'
}));


const StudentOperations= (props) =>{
    const [viewModalOpen, setViewModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [selectedRecord, setSelectedRecord] = useState({})
    const dispatch=useDispatch()
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'studName', headerName: 'Student Name', width: 230 },
        { field: 'email', headerName: 'Email ID', width: 230 },
        { field: 'role', headerName: 'Role', width: 100 },
        // { field: 'isAllowed', headerName: 'Allowed Access', width: 160 },
        {
            field: 'isAllowed',
            headerName: 'Allowed Access',
            width: 150,
            // renderCell: (isAllowed) => (
      

            //   // (isAllowed) ? ('hi') : ('no')
            //     // ({isAllowed}=== ? <ThumbUpOffAltIcon/> : <ThumbDownOffAltIcon/>  
            //       // <strong>
            //       //   {/* {isAllowed==true ? (<ThumbUpOffAltIcon/>) : (<ThumbDownOffAltIcon/>)} */}
                    
            //       // </strong>
                // ),
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 150,
            renderCell: (id) => (
              <strong>
                <DeleteIcon onClick={(e)=>handleDeleteStud(e,id)}>Delete</DeleteIcon>
              </strong>
            ),
        },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 150,
            renderCell: (id) => (
              <strong>
                <EditIcon onClick={(e)=>handleEditStudent(e,id)}>Edit</EditIcon>
              </strong>
            ),
          },
        {
            field: 'view',
            headerName: 'View Details',
            width: 150,
            renderCell: (id) => (
                // <Button><FcBinoculars/></Button>
              <strong>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ marginLeft: 16 }}
                  onClick={(e)=>handleViewStudent(e,id)}
                >
                  View
                </Button>
              </strong>
            ),
          },
        
      ];
    
    const handleViewStudent =(e,id) =>{
        // const studId=allStudentsInfo.length && allStudentsInfo[id.id-1]._id
        const rec=allStudentsInfo.length && allStudentsInfo[id.id-1]
        console.log('Print selected rec',rec)
        setViewModalOpen(true)
        setSelectedRecord(rec)
        // dispatch(startViewStud(studId)) 
    }
    const closeModal=(text) =>{
      if(text==='view')
        setViewModalOpen(false)
      else if(text==='edit')
        setEditModalOpen(false)
    }
    const handleEditStudent =(e,id) =>{
      const rec=allStudentsInfo.length && allStudentsInfo[id.id-1]
      setEditModalOpen(true)
      setSelectedRecord(rec)
    }

    const handleDeleteStud =(e,id) =>{
        const studId=allStudentsInfo.length && allStudentsInfo[id.id-1]._id
        // console.log('studId',studId)
        dispatch(startDeleteStud(studId))
    }
    const allStudentsInfo=useSelector((state)=>{
        // console.log('state.student.studentsData studInfo',state.student.studentsData)
        return state.student.studentsData
    })
    // console.log('Inside StudentOperations, allStudentsInfo', allStudentsInfo)
    const customRows= allStudentsInfo.map((stud,idx)=>{
        return {id: idx+1, studName: stud.name, email: stud.email, role: stud.role, isAllowed: stud.isAllowed}
    })
    // console.log('customRows',customRows)
    return(
        <div style={{ height: 400, width: '65%' }}>
            <HeadingTypography variant="h5" color="secondary" gutterBottom
                sx={{textAlign: 'center'}}
            >
                <strong>Listing Registered Students -{allStudentsInfo.length}</strong>
            </HeadingTypography>
            <DataGrid
                rows={customRows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                // checkboxSelection
                
            />
            {viewModalOpen && <ViewModal modalOpen={viewModalOpen} selectedRecord={selectedRecord}
              closeModal={closeModal}
            />}
            {editModalOpen && <EditModal modalOpen={editModalOpen} selectedRecord={selectedRecord} 
              closeModal={closeModal}
            />}
        </div>
    )
}
export default StudentOperations