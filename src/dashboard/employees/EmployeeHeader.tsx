import { Box, Typography } from "@mui/material";
import EmployeeAddModal from "./EmployeeAddModal";
export default function EmployeeHeader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h5">Employees</Typography>
      <EmployeeAddModal  />
    </Box>
  )
}
