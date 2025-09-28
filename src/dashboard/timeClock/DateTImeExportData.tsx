import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { Dayjs } from 'dayjs';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

export default function DateTimeExportData() {
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));


    const handleGo = () => {
        if (startDate && endDate) {
            console.log(`Start Date: ${startDate} End Date: ${endDate}`);
            alert('Data exported successfully');
        } else {
            alert('Please select start and end date');
        }
    }
    const handleExportData = () => {
        setLoading(true);
        console.log('Exporting data');
        setLoading(false);
    }


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, justifyContent: 'space-between', alignItems: isMobile ? 'start' : 'end', mt: 2 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: isMobile ? 'start' : 'end', flexDirection: isMobile ? 'column' : 'row' }}>
                    <Box>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>Start Date</Typography>
                        <DatePicker
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            format="MMM D, YYYY"
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    placeholder: ''
                                }
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>End Date</Typography>
                        <DatePicker
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            format="MMM D, YYYY"
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    placeholder: ''
                                }
                            }}
                        />
                    </Box>
                    <Box>
                        <Button variant="contained" size="small" sx={{ backgroundColor: '#1952A0' }} onClick={handleGo}>GO</Button>
                    </Box>
                </Box>
                <Box>
                    <LoadingButton onClick={handleExportData} loading={loading} variant="text" size="small" sx={{ color: '#1952A0', textTransform: 'capitalize', textDecoration: 'underline' }}>Export.csv</LoadingButton>
                </Box>
            </Box>
        </LocalizationProvider>

    );
}
