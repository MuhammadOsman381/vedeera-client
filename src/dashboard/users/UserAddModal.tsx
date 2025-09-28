import Drawer from '@mui/material/Drawer';
import { LoadingButton } from '@mui/lab';
import { Button, IconButton, Link, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useContext, useState } from 'react';
import { Box } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { textfieldtheme } from '../../theme/textFieldTheme';
import { ThemeProvider } from '@mui/material/styles';
import { AppContext } from '../../context/AppContext';
import type { AppContextType, AddUserFormType } from '../../context/AppContext';
import toast from 'react-hot-toast';

export default function UserAddModal() {
    const { setAddUserForm } = useContext(AppContext) as AppContextType;
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [AddUserFromModal, setAddUserFromModal] = useState<AddUserFormType>({
        Id: '',
        lastName: '',
        firstName: '',
        role: '',
        lastActivity: '',
    });

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddUserFromModal({ ...AddUserFromModal, [e.target.name]: e.target.value, lastActivity: new Date().toLocaleDateString('en-GB') });
    }
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        if (AddUserFromModal.Id === '' || AddUserFromModal.lastName === '' || AddUserFromModal.firstName === '' || AddUserFromModal.role === '') {
            toast.error('Please fill all the fields');
            setLoading(false);
            return;
        }
        setAddUserForm(AddUserFromModal);
        toggleDrawer(false);
        setLoading(false);
    }



    const toggleDrawer = (open: boolean) => {
        setIsOpenModal(open);
    }

    return (
        <div>
            <Button onClick={() => toggleDrawer(true)} variant="text" color="primary" sx={{ textDecoration: 'underline', textTransform: 'capitalize' }} >+Add User</Button>
            <Drawer
                anchor="right"
                open={isOpenModal}
                // onClose={() => toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        width: isMobile ? 250 : 500,
                        height: '100%',
                        borderTopLeftRadius: '20px',
                        borderBottomLeftRadius: '20px',
                        padding: isMobile ? 2 : 5,
                    }
                }}
            >
                <Box>
                    <Box >
                        <IconButton onClick={() => toggleDrawer(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <ThemeProvider theme={textfieldtheme}>
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 'semibold' }} mt={2} >New User</Typography>

                        </Box>
                        <Box>
                            <Typography variant="body1" sx={{ fontWeight: 'semibold' }} mt={2} >User ID / email</Typography>
                            <TextField size="small" fullWidth name="Id" value={AddUserFromModal.Id} onChange={handleChange} />
                        </Box>
                        <Box>
                            <Typography variant="body1" sx={{ fontWeight: 'semibold' }} mt={2} >Last Name</Typography>
                            <TextField size="small" fullWidth name="lastName" value={AddUserFromModal.lastName} onChange={handleChange} />
                        </Box>
                        <Box>
                            <Typography variant="body1" sx={{ fontWeight: 'semibold' }} mt={2} >First Name</Typography>
                            <TextField size="small" fullWidth name="firstName" value={AddUserFromModal.firstName} onChange={handleChange} />
                        </Box>

                        <Box>
                            <Typography variant="body1" sx={{ fontWeight: 'semibold' }} mt={2} >Role</Typography>
                            <TextField size="small" fullWidth name="role" value={AddUserFromModal.role} onChange={handleChange} />
                        </Box>
                    </ThemeProvider>
                    <Box sx={{ display: 'inline-flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mt: 2 }}>
                        <LoadingButton variant="contained" size='small' color="primary" fullWidth onClick={handleSubmit} loading={loading}>Save</LoadingButton>
                        <Button variant="contained" size='small' sx={{ backgroundColor: '#555555' }} fullWidth>Cancel</Button>
                    </Box>
                    <Box mt={2}>
                        <Link
                            component="button"
                            variant="body2"
                            color="error"

                            onClick={() => {
                                console.info("I'm a button.");
                            }}
                        >
                            Reset Password
                        </Link>
                    </Box>
                </Box>
            </Drawer>

        </div>
    );
}
