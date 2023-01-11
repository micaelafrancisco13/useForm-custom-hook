import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { Stack, TextField, useMediaQuery } from "@mui/material";

const Calendar = ({ name, label, error, helperText, onChange, ...rest }) => {
  // { ...rest } => inputFormat, value
  const matches = useMediaQuery("(min-width:640px)");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        {!matches ? (
          <MobileDatePicker
            {...rest}
            label={label}
            onChange={(event) =>
              onChange({ currentTarget: { name, value: event.format() } })
            }
            renderInput={(params) => (
              <TextField {...params} error={error} helperText={helperText} />
            )}
          />
        ) : (
          <DesktopDatePicker
            {...rest}
            label={label}
            onChange={(event) =>
              onChange({ currentTarget: { name, value: event.format() } })
            }
            renderInput={(params) => (
              <TextField {...params} error={error} helperText={helperText} />
            )}
          />
        )}
      </Stack>
    </LocalizationProvider>
  );
};

export default Calendar;
