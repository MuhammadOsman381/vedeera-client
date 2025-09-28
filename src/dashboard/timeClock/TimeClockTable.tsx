import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import useGetAndDelete from '../../hooks/useGetAndDelete';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

interface TimeClockRow {
    id: string;
    lastName: string;
    firstName: string;
    gross: number;
}

const columns: GridColDef<TimeClockRow>[] = [
    { field: 'id', headerName: 'ID', minWidth: 100, flex: 1 },
    { field: 'name', headerName: 'Name', minWidth: 150, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 150, flex: 1 },
    { field: 'gross', headerName: 'Gross (hrs)', minWidth: 120, flex: 1 },

];

export default function TimeClockTable() {
    const context = useContext(AppContext);
    if (!context) return null;

    const { rows, setRows, refresh } = context;

    const getTimeLog = useGetAndDelete(axios.get);

    const calculateGrossHours = (startTime: Date, endTime: Date): number => {
        const diffMs = endTime.getTime() - startTime.getTime();
        return diffMs / (1000 * 60 * 60);
    };

    const getTimeLogs = async () => {
        const response = await getTimeLog.callApi('timelogs/', true, false);
        setRows(
            response.data.map((item: any) => ({
                id: item.id,
                name: item.employee.name,
                email: item.employee.email,
                gross: calculateGrossHours(new Date(item.startTime), new Date(item.endTime)),
            }))
        );
    };


    useEffect(() => {
        getTimeLogs();
    }, []);

    const totalGross = rows.reduce((sum, row) => sum + row.gross, 0);

    return (
        <>
            <Box sx={{ height: 400, width: '100%' }} mt={2}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    loading={getTimeLog.loading || refresh}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 6 },
                        },
                    }}
                    pageSizeOptions={[6]}
                    sx={{
                        '& .MuiDataGrid-columnHeaderTitle': {
                            fontWeight: 'bold',
                        },
                    }}
                    disableRowSelectionOnClick
                />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1,
                    borderBottom: '1px solid #E0E0E0',
                    borderLeft: '1px solid #E0E0E0',
                    borderRight: '1px solid #E0E0E0',
                }}
                mb={4}
            >
                <Typography sx={{ fontWeight: 'bold' }}>Total Gross Hours:</Typography>
                <Typography sx={{ fontWeight: 'bold' }}>
                    {totalGross.toFixed(2)}
                </Typography>
            </Box>
        </>
    );
}
