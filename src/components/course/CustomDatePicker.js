import React,{ useState } from "react";
// import DateView from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import * as moment  from 'moment';

// const DatePicker =(props) =>{
//     const {releaseDate,text} = props
//     return(
//         <DateView sx={{width: '100%'}}
//             value={releaseDate}
//             placeholderText={text}
//         />
//     )
// }

const CustomDatePicker =(props) =>{
    const {getDate} =props
    const [value, setValue] = React.useState(null)
    // console.log('CustomDatePicker value',value)
    return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                id="releaseDate"
                label="Release Date"
                name="releaseDate"
                value={value}
                value-type="format"
                // format="yyyy-MM-dd"
                formatDate={(date) => moment(new Date()).format('MM-DD-YYYY')}
                onChange={(newValue)=>{
                        setValue(newValue)
                        getDate(newValue)
                }}
                // views={["year", "month", "day"]}
                // onChange={(newValue) => {
                //     setValue(newValue);
                // }}
                renderInput={(params) => <TextField {...params} />}
            />
      </LocalizationProvider>
    )
}
export default CustomDatePicker
