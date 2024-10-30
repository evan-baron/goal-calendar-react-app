import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function Calendar() {
  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker />
    </LocalizationProvider>
    <div>test</div>
    </>
  );
}