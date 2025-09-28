import { useState } from "react";
import { Box, TextField } from "@mui/material";
import { textfieldtheme } from "../../theme/textFieldTheme";
import { ThemeProvider } from "@mui/material/styles";
import UserHeader from "./UserHeader";
import UserTable from "./UserTable";
import { useDebounce } from "../../utils/debounce";




export default function UserDashboard() {
  const [searchUser, setSearchUser] = useState('');
  const debouncedSearchUser = useDebounce(searchUser, 300);

  return (
    <>
      <UserHeader />
      <Box sx={{ mt: 2, display: 'inline-block' }}>
        <ThemeProvider theme={textfieldtheme}>
          <TextField size="small" label="Search" variant="outlined" fullWidth value={searchUser} onChange={(e) => setSearchUser(e.target.value)} />
        </ThemeProvider>
      </Box>
      <Box marginTop={2}>
        <UserTable searchUser={debouncedSearchUser} />
      </Box>

    </>
  )
}
