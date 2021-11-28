import React,{useState,useEffect} from "react"
import Box from '@mui/material/Box'
import { Typography } from "@mui/material"
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useSelector,useDispatch } from "react-redux";
import { startUpdateAccount } from "../../actions/userActions";
import Swal from 'sweetalert2'
import EditIcon from '@mui/icons-material/Edit';
import _, { isEqual } from "lodash";

const Account =(props) =>{
    const dispatch=useDispatch()
    const userInfo=useSelector((state)=>{
        return state.user
    })
    // console.log('Inside account userInfo',userInfo)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [website, setWebsite] = useState('')
    const [edit,setEdit] = useState(false) //edit icon click
    const [isSaved,setIsSaved] = useState(false) // keeps track of if the redux state is saved to resp state variables
    const [isChanged,setIsChanged] = useState(false) //keeps track of if any changes are made to the field

    let initObj={}
    useEffect(()=>{
        if(Object.keys(userInfo).length>0 && userInfo.userData.username 
            && userInfo.userData.academy){
            setUsername(userInfo.userData.username)
            setEmail(userInfo.userData.email)
            setName(userInfo.userData.academy.name)
            setWebsite(userInfo.userData.academy.website) 
            setIsSaved(true)
        }
    },[userInfo])

    useEffect(()=>{
        if(isSaved){
            initObj={
                username : username,
                    email : email,
                    academy :{
                        name : name,
                        website: website
                    }
            }
            // console.log('inside useEff isSaved', initObj,isSaved)
            
        }
    },[isSaved])

    
    // console.log('outside init obj ',initObj)
    const handleChange =(e,field)=>{
        console.log('inside handleChange isSaved', isSaved)
        const input=e.target.value
        if(field==='username'){
            setUsername(input)
        }else if(field==='email'){
            setEmail(input)
        }else if(field==='name'){
            setName(input)
        }else if(field==='website'){
            setWebsite(input)
        }
        setIsChanged(true)
    }
    const handleCancel =() =>{
        setEdit(false)
    }
    const handleSave=()=>{
        const updatedAccountData={
            username : username,
            email : email,
            academy :{
                name : name,
                website: website
            }
        }
        // console.log('updatedAccountData',updatedAccountData)
        // console.log('inside handleSave initObj', initObj)
        if(_.isEqual(updatedAccountData,initObj) || !isChanged){
            Swal.fire({
                icon : 'warning',
                title: 'No changes made',
                text: 'Make changes to save'
            })
        }else{
            dispatch(startUpdateAccount(updatedAccountData,handleCancel))
        }
        
    }
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
                <CardContent >
                <EditIcon sx={{float:'right'}} onClick={()=>setEdit(!edit)} />
                {Object.keys(userInfo).length>0 && userInfo.userData.academy && (
                    <Box>
                            <Typography gutterBottom variant="h5">
                                User ID
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                {userInfo.userData._id}
                            </Typography>
                            <Typography gutterBottom variant="h5">
                                User Name
                            </Typography>
                            {edit ? <TextField 
                                type="text"
                                defaultValue={userInfo.userData.username}
                                onChange={(e)=>handleChange(e,'username')} 
                            /> :
                            <Typography variant="body2" color="text.secondary" paragraph>
                                {userInfo.userData.username}
                            </Typography>
                            }
                            
                            <Typography gutterBottom variant="h5">
                                Email
                            </Typography>
                            {edit ? <TextField 
                                type="text"
                                defaultValue={userInfo.userData.email}
                                onChange={(e)=>handleChange(e,'email')} 
                            /> : <Typography variant="body2" color="text.secondary" paragraph>
                                {userInfo.userData.email}
                            </Typography>}
                            <Typography gutterBottom variant="h5">
                                Role
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                {userInfo.userData.role}
                            </Typography>
                            <Typography gutterBottom variant="h5">
                                Academy ID
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                {userInfo.userData.academy.academyId}
                            </Typography>
                            <Typography gutterBottom variant="h5">
                                Academy Name
                            </Typography>
                            {edit ? <TextField 
                                type="text"
                                defaultValue={userInfo.userData.academy.name}
                                onChange={(e)=>handleChange(e,'name')} 
                            /> : <Typography variant="body2" color="text.secondary" paragraph>
                                {userInfo.userData.academy.name}
                            </Typography>}
                            <Typography gutterBottom variant="h5">
                                Academy Website
                            </Typography>
                            {edit ? <TextField 
                                type="text"
                                defaultValue={userInfo.userData.academy.website}
                                onChange={(e)=>handleChange(e,'website')} 
                            /> : <Typography variant="body2" color="text.secondary" paragraph>
                                {userInfo.userData.academy.website}
                            </Typography>}
                                
                    </Box>
                )} 
                </CardContent>
                <CardActions sx={{display: 'flex', justifyContent: 'space-evenly'}}>
                    {/* <Button size="small"  onClick={handleEdit}>Edit Details</Button> */}
                    <Button size="small" onClick={handleSave}>Save</Button>
                    <Button size="small" onClick={handleCancel}>Cancel</Button>
                </CardActions>
            </Card>
            </div>
        </Box>
    )
}
export default Account