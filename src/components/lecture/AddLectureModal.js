import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Typography,MenuItem} from '@mui/material';
import { BsFillPatchPlusFill } from "react-icons/bs";
import TextField from '@mui/material/TextField'
import { useFormik  } from "formik"
import * as yup from 'yup'
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { assetType } from './assetLecture';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { startAddLecture } from '../../actions/lectureActions';

const style = {
    position: 'absolute' ,
    top: '80%',
    left: '50%',
    transform: 'translate(90%, 45%)',
    width: 700,
    // bgcolor: 'background.paper',
    bgcolor: '#EBD691',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const validationSchema=yup.object({
    title: yup.string().required("Title mandatory!"),
    description: yup.string().required("Description mandatory!"),
    assetType: yup.string().required("Asset Type mandatory!"),
    assetURL: yup.string().required("Asset URL mandatory!"),
})

const AddLectureModal = (props) =>{
    const dispatch= useDispatch()
    const {addLect, closeModal, courseId} = props
    const formik=useFormik({
        initialValues : {
            title : '',
            description : '',
            assetType : '',
            assetURL : '',
        },
        onSubmit : (values) =>{
            const createLectForm={
                title: values.title,
                description: values.description,
                assetType: values.assetType,
                assetURL: values.assetURL,
                course: courseId,
            }
            console.log('createLectForm & closeModal',createLectForm , typeof closeModal)
            dispatch(startAddLecture(createLectForm,courseId,closeModal))
        },
        validationSchema : validationSchema
    })
    const handleClose =() =>{
        closeModal('add')
    }
    return(
        <div>
            <Modal
                open={addLect}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <FormControl
                    component="form"
                    onSubmit ={formik.handleSubmit}
                    sx={{
                        "& .MuiTextField-root": { ml: "15px", width: "65ch", padding: "10px" },
                        border: "2px solid black",
                        borderRadius: "18px",
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h5">
                            <strong>Create a new Lecture🎁 </strong> <BsFillPatchPlusFill/>
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                            autoComplete="title"
                            autoFocus
                            type='title'
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title  && formik.errors.title}
                            // onBlur={formik.handleBlur}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            label="Description"
                            name="description"
                            autoComplete="description"
                            autoFocus
                            type='description'
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description  && formik.errors.description}
                            // onBlur={formik.handleBlur}
                        /> 
                        <TextField
                            required
                            select
                            id="assetType"
                            label="Asset Type"
                            value={formik.values.assetType}
                            onChange={selectedOption => {
                                // This inline function can now completely be reaplce by handleChange("year")
                                formik.handleChange("assetType")(selectedOption);
                            }}
                            helperText={formik.touched.assetType ? formik.errors.assetType : ""}
                            error={formik.touched.assetType && Boolean(formik.errors.assetType)}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                        >
                            {assetType.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="assetURL"
                            label="Asset URL"
                            name="assetURL"
                            autoComplete="assetURL"
                            autoFocus
                            type='assetURL'
                            value={formik.values.assetURL}
                            onChange={formik.handleChange}
                            error={formik.touched.assetURL && Boolean(formik.errors.assetURL)}
                            helperText={formik.touched.assetURL  && formik.errors.assetURL}
                            // onBlur={formik.handleBlur}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            disabled
                            fullWidth
                            id="course"
                            label="course"
                            name="course"
                            autoComplete="course"
                            autoFocus
                            type='course'
                            defaultValue={courseId}
                            // onChange={formik.handleChange}
                            // error={formik.touched.assetURL && Boolean(formik.errors.assetURL)}
                            // helperText={formik.touched.assetURL  && formik.errors.assetURL}
                            // onBlur={formik.handleBlur}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ml:30}}
                        >
                            Add
                        </Button>
                    </Box>
                </FormControl>
            </Modal>
        </div>
    )
}
export default AddLectureModal