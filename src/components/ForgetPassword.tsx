import { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ThemeProvider } from '@mui/material/styles';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { firebaseConfig } from '../config/firebase';
import toast from 'react-hot-toast';
import { textfieldtheme } from '../theme/textFieldTheme';
import { initializeApp } from 'firebase/app';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        try {
            if (!email) {
                toast.error('Please enter your email');
                setLoading(false);
                return;
            }
            console.log("Email being submitted:", email);
            const actionCodeSettings = {
                url: "http://localhost:3000/login",
                handleCodeInApp: false,
            };
            sendPasswordResetEmail(auth, email, actionCodeSettings)
                .then(() => {
                    console.log("Password reset email sent successfully");
                    toast.success("If this email exists in our system, a reset link has been sent.");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error("Error sending password reset email:", errorCode, errorMessage);
                });
            setEmail('');
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || 'Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={textfieldtheme}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    backgroundColor: 'skyblue',
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        maxWidth: 400,
                        mx: 'auto',
                        borderRadius: 2,
                        boxShadow: 3,
                        p: 4,
                        bgcolor: 'white',
                    }}
                >
                    <Typography variant="h5" mb={2} fontWeight={600} textAlign="center">
                        Reset Password
                    </Typography>

                    <TextField
                        size="small"
                        label="Enter your email"
                        variant="outlined"
                        fullWidth
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <LoadingButton
                        type="submit"
                        variant="contained"
                        fullWidth
                        loading={loading}
                    >
                        Send Reset Link
                    </LoadingButton>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
