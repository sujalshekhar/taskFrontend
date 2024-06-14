import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const DatePicker = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker />
    </LocalizationProvider>
  )
}

export default DatePicker