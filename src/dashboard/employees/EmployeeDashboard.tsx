import { Box, TextField, ThemeProvider } from "@mui/material";
import { textfieldtheme } from "../../theme/textFieldTheme";
import EmployeeHeader from "./EmployeeHeader";
import EmployeeTable from "./EmployeeTable";
import { useState } from "react";
import { useDebounce } from "../../utils/debounce";

export default function EmployeeDashboard() {
  const [searchEmployee, setSearchEmployee] = useState("");
  const debouncedSearchEmployee = useDebounce(searchEmployee, 500); 
  return (
    <>
      <EmployeeHeader />
      <Box sx={{ mt: 2, display: 'inline-block' }}>
        <ThemeProvider theme={textfieldtheme}>
          <TextField size="small" label="Search" variant="outlined" fullWidth value={searchEmployee} onChange={(e) => setSearchEmployee(e.target.value)} />
        </ThemeProvider>
      </Box>
      <Box marginTop={2}>
        <EmployeeTable search={debouncedSearchEmployee} />
      </Box>
    </>
  )
}
