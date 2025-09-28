import { useContext, useState } from 'react';
import { Box, Typography, Button, setRef } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { Dayjs } from 'dayjs';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import toast from 'react-hot-toast';
import useGetAndDelete from '../../hooks/useGetAndDelete';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

export default function DateTimeExportData() {
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const context = useContext(AppContext);
    if (!context) return null;

    const { rows, setRows, refresh, setRefresh } = context;


    const getFilteredTimeLogs = useGetAndDelete(axios.get);
    const getTimeLog = useGetAndDelete(axios.get);

    const calculateGrossHours = (startTime: Date, endTime: Date): number => {
        const diffMs = endTime.getTime() - startTime.getTime();
        return diffMs / (1000 * 60 * 60);
    };

    const getTimeLogs = async (start: string, end: string) => {
        try {
            setRefresh(true)
            console.log('Fetching filtered timelogs for:', start, end);
            const response = await getFilteredTimeLogs.callApi(
                `timelogs/timelogs-filter/${start}/${end}`,
                true,
                false
            );
            const rows = response.data.map((item: any) => {
                const timelogsWithGross = item.timelogs.map((log: any) => ({
                    ...log,
                    gross: (new Date(log.endTime).getTime() - new Date(log.startTime).getTime()) / (1000 * 60 * 60),
                }));
                const totalGross = timelogsWithGross.reduce((sum: number, log: any) => sum + log.gross, 0);
                return {
                    id: item.employee.id,
                    name: `${item.employee.name} `,
                    email: item.employee.email,
                    gross: Math.round(totalGross * 100) / 100,
                    timelogs: timelogsWithGross,
                };
            });
            setRows(rows);
            console.log('Filtered timelogs fetched:', rows);
        } catch (error) {
            console.error('Error fetching filtered timelogs:', error);
        }
        finally {
            setRefresh(false)
        }
    };

    const handleGo = async () => {
        if (startDate && endDate) {
            await getTimeLogs(startDate.toISOString(), endDate.toISOString());
            toast.success('Data exported successfully');
        } else {
            toast.error('Please select start and end date');
        }
    }

    const handleExportData = () => {
        if (!rows || rows.length === 0) {
            toast.error('No data to export');
            return;
        }
        setLoading(true);
        try {
            const headers = ['ID', 'Name', 'Email', 'Gross Hours'];
            const csvRows = [
                headers.join(','),
                ...rows.map((row: any) => [
                    row.id,
                    row.name,
                    row.email,
                    row.gross
                ].join(','))
            ].join('\n');
            const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `timelogs_${Date.now()}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success('CSV downloaded successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to export CSV');
        } finally {
            setLoading(false);
        }
    };

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
                    <Box>
                        <Button variant="contained" size="small" sx={{ backgroundColor: '#1952A0' }} onClick={
                            async () => {
                                try {
                                    setRefresh(true)
                                    const response = await getTimeLog.callApi('timelogs/', true, false);
                                    setRows(
                                        response.data.map((item: any) => ({
                                            id: item.id,
                                            name: item.employee.name,
                                            email: item.employee.email,
                                            gross: calculateGrossHours(new Date(item.startTime), new Date(item.endTime)),
                                        }))
                                    );
                                } catch (error) {
                                    console.error(error);
                                }
                                finally {
                                    setRefresh(false);
                                }
                            }
                        }>Reset</Button>
                    </Box>
                </Box>
                <Box>
                    <LoadingButton onClick={handleExportData} loading={loading} variant="text" size="small" sx={{ color: '#1952A0', textTransform: 'capitalize', textDecoration: 'underline' }}>Export.csv</LoadingButton>
                </Box>
            </Box>
        </LocalizationProvider>

    );
}
