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
import usePostAndPut from '../../hooks/usePostAndPut';
import axios from 'axios';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

export default function UserAddModal() {
    const context = useContext(AppContext);
    if (!context) return null;
    const { refresh, setRefresh } = context;
    const { setAddUserForm } = useContext(AppContext) as AppContextType;
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [AddUserFromModal, setAddUserFromModal] = useState<AddUserFormType>({
        Id: '',
        lastName: '',
        firstName: '',
        role: '',
        lastActivity: '',
        password: '',
    });

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const addUser = usePostAndPut(axios.post);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddUserFromModal({ ...AddUserFromModal, [e.target.name]: e.target.value, lastActivity: new Date().toLocaleDateString('en-GB') });
    }
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setRefresh(true);
        const { Id, password, firstName, lastName, role } = AddUserFromModal;
        if (!Id || !password || !firstName || !lastName || !role) {
            toast.error('Please fill all the fields');
            setRefresh(false);
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, Id, password);
            const user = userCredential.user;
            console.log("✅ Firebase user created:", user.uid);
            const payload = {
                email: Id,
                firstname: firstName,
                lastname: lastName,
                role: role,
            };
            await addUser.callApi("users/create", payload, true, false, true);
            setAddUserForm(AddUserFromModal);
            toast.success("User created successfully!");
            toggleDrawer(false);
            setAddUserFromModal({
                Id: '',
                lastName: '',
                firstName: '',
                role: '',
                lastActivity: '',
                password: '',
            });
        } catch (error: any) {
            console.error("❌ Error creating user:", error);
            toast.error(error.message || "Error creating user");
        } finally {
            setRefresh(false);
        }
    };
    const toggleDrawer = (open: boolean) => {
        setIsOpenModal(open);
    };



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

                        {/* 🔑 Password field added here */}
                        <Box>
                            <Typography variant="body1" sx={{ fontWeight: 'semibold' }} mt={2}>Password</Typography>
                            <TextField
                                size="small"
                                fullWidth
                                type="password"
                                name="password"
                                value={AddUserFromModal.password}
                                onChange={handleChange}
                            />
                        </Box>

                        <Box>
                            <Typography variant="body1" sx={{ fontWeight: 'semibold' }} mt={2} >Role</Typography>
                            <TextField size="small" fullWidth name="role" value={AddUserFromModal.role} onChange={handleChange} />
                        </Box>
                    </ThemeProvider>
                    <Box sx={{ display: 'inline-flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mt: 2 }}>
                        <LoadingButton variant="contained" size='small' color="primary" fullWidth onClick={handleSubmit} loading={refresh}>Save</LoadingButton>
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
