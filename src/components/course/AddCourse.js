import React from "react";
import { useFormik, Field } from "formik";
import * as yup from "yup";
import { Typography, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import DatePicker from "../user/student/DatePicker";
// import Checkbox from "@mui/material/Checkbox";
import CustomDatePicker from "./CustomDatePicker"
import * as moment  from 'moment';
import { useDispatch } from "react-redux"
import { startAddCourse } from "../../actions/courseActions";
import category from "./courseCategory";
import level from "./courseLevel";

const HeadingTypography = styled(Typography)(() => ({
    color: "black",
    fontFamily: "Georgia,Times,serif",
}));

const ColorButton = styled(Button)(() => ({
    color: "#E4E7EB",
    backgroundColor: "#2560be",
    "&:hover": {
        backgroundColor: "grey",
    },
}));

const validationSchema = yup.object({
    name: yup.string().required("Name mandatory!"),
    description: yup.string().required("Description mandatory!"),
    duration: yup
        .number()
        .required("Duration mandatory!"),
        // .typeError("specify duration in hours or mins")
        // .min(0, "min val 0."),
    // releaseDate: yup.min(new Date(),"Start Date must be later than today"),
    isDelete: yup.boolean(),
    category: yup.string().required("Category mandatory!"),
    validity: yup.number().required("Validity mandatory!"),
    level: yup.string().required("Level mandatory!"),
    author: yup.string().required("Author mandatory!"),
});

const getDate= (formattedDate)=>{
    // console.log('formattedDate',formattedDate)
    return formattedDate 
}
const AddCourse = (props) => {
    const {filledForm,editCourseModalOpen} = props
    const name = 'selectedOption'
    const dispatch= useDispatch()
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            duration: 0,
            releaseDate: "",
            isDelete: false,
            category: "",
            validity: 0,
            level: "",
            author: "",
        },
        onSubmit : (values) =>{
            const addCourseData={
                name: values.name,
                description: values.description,
                duration: Number(values.duration),
                // releaseDate: moment(values.releaseDate).format('YYYY-MM-DD'),
                isDelete: values.isDelete,
                category: values.category,
                validity: Number(values.validity),
                level: values.level,
                author: values.author,
            }
            // const addCourseData=values
            console.log('AddCourseData Form',addCourseData)
            dispatch(startAddCourse(addCourseData,clearForm))
        },
        onChange: (e,setFieldValue) => {
            // console.log('onChange name and e.currentTarget.value',e.currentTarget.value)
            setFieldValue(name, e.currentTarget.value)},
        validationSchema : validationSchema
    });
    const clearForm =() =>{
        formik.resetForm()
        // formik.values.isAllowed=true
    }
    return (
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
            <Box variant="div" ml={3} pt={1}>
                <HeadingTypography variant="h5" color="secondary" gutterBottom>
                    Add Course
                </HeadingTypography>
            </Box>
            <Box variant="div" m={2} pt={1}>
                <TextField
                    required
                    id="name"
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    onBlur={formik.handleBlur}
                />
            </Box>
            <Box variant="div" m={2} >
                <TextField
                    required
                    id="description"
                    name="description"
                    label="Description"
                    multiline
                    rows={3}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.description && Boolean(formik.errors.description)
                    }
                    helperText={formik.touched.description && formik.errors.description}
                    onBlur={formik.handleBlur}
                />
            </Box>
            <Box variant="div" m={2} >
                <TextField
                    required
                    id="duration"
                    name="duration"
                    label="Duration"
                    value={formik.values.duration}
                    onChange={formik.handleChange}
                    error={formik.touched.duration && Boolean(formik.errors.duration)}
                    helperText={formik.touched.duration && formik.errors.duration}
                    onBlur={formik.handleBlur}
                />
            </Box>
            <Box variant="div" ml={2}  >
                <CustomDatePicker getDate={getDate} />
                {/* <DatePicker 
                    releaseDate={formik.values.releaseDate}
                    text="releaseDate"
                /> */}
                {/* <TextField
                    type='date'
                    id="releaseDate"
                    name="releaseDate"
                    label="ReleaseDate"
                    value={formik.values.releaseDate}
                    onChange={formik.handleChange}
                /> */}
            </Box>
            <Box variant="div" ml={4}>
                <Typography variant="h6" color="secondary" paragraph>
                    <FormLabel component="legend">Allowed Access</FormLabel>
                </Typography>
            </Box>
            <Box variant="div" ml={4}>
                <RadioGroup
                    row
                    aria-label="isDelete"
                    name="isDelete"
                    defaultValue="true" 
                    onChange={(e) => formik.handleChange(e)}
                // sx={{justifyContent: 'center'}}
                >
                    <FormControlLabel value="true" control={<Radio />} label="true" />
                    <FormControlLabel value="false" control={<Radio />} label="false" />
                    {/* <FormControlLabel value="na" control={<Radio />}  label="na" /> */}
                </RadioGroup>
            </Box>
            <Box variant="div" m={2}>
                <TextField
                    required
                    select
                    id="category"
                    label="Category"
                    value={formik.values.category}
                    onChange={selectedOption => {
                        // This inline function can now completely be reaplce by handleChange("year")
                        formik.handleChange("category")(selectedOption);
                      }}
                    helperText={formik.touched.category ? formik.errors.category : ""}
                    error={formik.touched.category && Boolean(formik.errors.category)}
                    margin="dense"
                    variant="outlined"
                    fullWidth
                >
                    {category.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
            <Box variant="div" m={2}>
                <TextField
                    required
                    id="validity"
                    name="validity"
                    label="Validity"
                    value={formik.values.validity}
                    onChange={formik.handleChange}
                    error={formik.touched.validity && Boolean(formik.errors.validity)}
                    helperText={formik.touched.validity && formik.errors.validity}
                    onBlur={formik.handleBlur}
                />
            </Box>
            <Box variant="div" m={2}>
                <TextField
                    select
                    id="level"
                    label="Level"
                    value={formik.values.level}
                    onChange={formik.handleChange("level")}
                    helperText={formik.touched.level ? formik.errors.level : ""}
                    error={formik.touched.level && Boolean(formik.errors.level)}
                    margin="dense"
                    // variant="outlined"
                    fullWidth
                >
                    {level.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
            <Box variant='div' m={2}>
                <TextField
                    // sx={{ml :'15px'}}
                    required
                    fullWidth
                    id="author"
                    name="author"
                    label="Author"
                    value={formik.values.author}
                    onChange={formik.handleChange}
                    error={formik.touched.author && Boolean(formik.errors.author)}
                    helperText={formik.touched.author && formik.errors.author}
                    onBlur={formik.handleBlur}
                />
            </Box>
            <Box variant='button' sx={{ display: 'flex', m: '18px', justifyContent: 'space-evenly' }}>
                <ColorButton onClick={formik.resetForm}>Reset</ColorButton>
                <ColorButton type='submit'>Submit</ColorButton>
            </Box>
        </FormControl>
    );
};
export default AddCourse;
