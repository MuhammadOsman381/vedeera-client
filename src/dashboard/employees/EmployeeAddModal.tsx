import Drawer from '@mui/material/Drawer';
import { LoadingButton } from '@mui/lab';
import { Button, IconButton, TextField, Typography, useMediaQuery, useTheme, Chip } from '@mui/material';
import { useContext, useState } from 'react';
import { Box } from '@mui/material';
import { Close as CloseIcon, Add as AddIcon } from '@mui/icons-material';
import { textfieldtheme } from '../../theme/textFieldTheme';
import { ThemeProvider } from '@mui/material/styles';
import { AppContext } from '../../context/AppContext';
import type { AppContextType, AddEmployeeFormType } from '../../context/AppContext';
import toast from 'react-hot-toast';

export default function EmployeeAddModal() {
    const { setAddEmployeeForm } = useContext(AppContext) as AppContextType;
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [AddEmployeeFromModal, setAddEmployeeFromModal] = useState<Omit<AddEmployeeFormType, "crews"> & { crews: string[] }>({
        name: "",
        email: "",
        crews: []
    });

    const [crewInput, setCrewInput] = useState("");

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddEmployeeFromModal({ ...AddEmployeeFromModal, [e.target.name]: e.target.value });
    };

    const handleAddCrew = () => {
        if (crewInput.trim() === "") return;
        if (AddEmployeeFromModal.crews.includes(crewInput.trim())) {
            toast.error("Crew already added");
            return;
        }
        setAddEmployeeFromModal((prev) => ({
            ...prev,
            crews: [...prev.crews, crewInput.trim()]
        }));
        setCrewInput("");
    };

    const handleDeleteCrew = (crew: string) => {
        setAddEmployeeFromModal((prev) => ({
            ...prev,
            crews: prev.crews.filter((c) => c !== crew)
        }));
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);

        if (
            AddEmployeeFromModal.name === '' ||
            AddEmployeeFromModal.email === '' ||
            AddEmployeeFromModal.crews.length === 0
        ) {
            toast.error('Please fill all the fields');
            setLoading(false);
            return;
        }

        setAddEmployeeForm(AddEmployeeFromModal);
        toggleDrawer(false);
        setLoading(false);
    };

    const toggleDrawer = (open: boolean) => {
        setIsOpenModal(open);
    };

    return (
        <div>
            <Button 
                onClick={() => toggleDrawer(true)} 
                variant="text" 
                color="primary" 
                sx={{ textDecoration: 'underline', textTransform: 'capitalize' }}
            >
                + Add Employee
            </Button>

            <Drawer
                anchor="right"
                open={isOpenModal}
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
                    <Box>
                        <IconButton onClick={() => toggleDrawer(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <ThemeProvider theme={textfieldtheme}>
                        <Box>
                            <Typography variant="h4" fontWeight="semibold" mt={2}>New Employee</Typography>
                        </Box>

                        <Box>
                            <Typography variant="body1" fontWeight="semibold" mt={2}>Name</Typography>
                            <TextField size="small" fullWidth name="name" value={AddEmployeeFromModal.name} onChange={handleChange} />
                        </Box>

                        <Box>
                            <Typography variant="body1" fontWeight="semibold" mt={2}>Email</Typography>
                            <TextField size="small" fullWidth name="email" value={AddEmployeeFromModal.email} onChange={handleChange} />
                        </Box>

                        <Box mt={2}>
                            <Typography variant="body1" fontWeight="semibold">Crews</Typography>
                            <Box display="flex" gap={1} mt={1}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    value={crewInput}
                                    onChange={(e) => setCrewInput(e.target.value)}
                                />
                                <IconButton color="primary" onClick={handleAddCrew}>
                                    <AddIcon />
                                </IconButton>
                            </Box>
                            <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                                {AddEmployeeFromModal.crews.map((crew, idx) => (
                                    <Chip 
                                        key={idx} 
                                        label={crew} 
                                        onDelete={() => handleDeleteCrew(crew)} 
                                        color="primary"
                                        variant="outlined"
                                    />
                                ))}
                            </Box>
                        </Box>
                    </ThemeProvider>

                    <Box sx={{ display: 'inline-flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mt: 3 }}>
                        <LoadingButton 
                            variant="contained" 
                            size='small' 
                            color="primary" 
                            fullWidth 
                            onClick={handleSubmit} 
                            loading={loading}
                        >
                            Save
                        </LoadingButton>
                        <Button 
                            variant="contained" 
                            size='small' 
                            sx={{ backgroundColor: '#555555' }} 
                            fullWidth
                            onClick={() => toggleDrawer(false)}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </div>
    );
}
