import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function Calendar() {
  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker 
        slotProps={{
          textField: {
            sx: {
              '& .MuiInputBase-root': {
                height: '1.25rem',
                width: '8rem',
                padding: '0',
                margin: '0'
              },
              '& .MuiInputBase-input': {
                color: 'rgb(25, 25, 75)',
                padding: '0'
              }
            }
          }
        }}
      />
    </LocalizationProvider>
    </>
  );
}