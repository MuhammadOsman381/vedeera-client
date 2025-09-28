import { Box, Typography } from "@mui/material";
import UserAddModal from "./UserAddModal";
export default function UserHeader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h5">Users</Typography>
      <UserAddModal  />
    </Box>
  )
}
