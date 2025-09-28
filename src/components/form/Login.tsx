import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';
import { textfieldtheme } from '../../theme/textFieldTheme';
import { ThemeProvider } from '@mui/material/styles';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import Login_logo from '../../assets/icons/login_logo.png'

interface FormData {
  email: string;
  password: string;
}
export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (formData.email === '' || formData.password === '') {
        setLoading(false);
        alert('Please fill all the fields');
        return;
      }
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      localStorage.setItem('authorization', `Bearer ${token}`);
      console.log(user);
      setLoading(false);
      setFormData({
        email: '',
        password: '',
      });
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

  };
  return (
    <ThemeProvider theme={textfieldtheme}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'skyblue',
        fontFamily: 'SFPro-Medium',
      }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 400,
            mx: 'auto',
            borderRadius: 2,
            boxShadow: 3,
            p: 4,
            pt: 7,
            pb: 4,
            bgcolor: 'white',
          }}
        >
          <TextField
            size="small"
            label="Enter username / email"
            variant="outlined"
            fullWidth
            name="email"
            type='email'
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            size="small"
            label="Enter Password"
            type="password"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <LoadingButton
            size="medium"
            type="submit"
            variant="contained"
            sx={{ mb: 2 }}
            fullWidth
            loading={loading}
          >
            Submit
          </LoadingButton>
          <Box textAlign="center" mb={3}>
            <Link
              to="/forgot-password"
              style={{
                color: 'rgba(25, 82, 160, 1)',
                fontFamily: 'SFPro-Medium',
                fontSize: '17px',
                fontWeight: 500,
                fontStyle: 'medium',
                letterSpacing: '0.1px',
                textDecoration: 'underline'
              }}

            >
              Forgot password
            </Link>
          </Box>
          <Box textAlign="center" display="flex" alignItems="center" justifyContent="center" gap={1} marginTop={7}>
            <img src={Login_logo} alt="Login Icon" loading='lazy' />
            <Typography
              variant="h5"
              component="h5"
              sx={{
                color: 'rgba(0, 0, 0, 1)',
                fontFamily: 'SFPro-Medium',
                fontSize: '32px',
                fontWeight: 500,
                fontStyle: 'medium',
                letterSpacing: '0.19px',
              }}
            >
              Vederra OS
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
