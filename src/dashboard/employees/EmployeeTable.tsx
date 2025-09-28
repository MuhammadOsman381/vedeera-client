import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import type { AppContextType } from '../../context/AppContext';
import axios from 'axios';
import useGetAndDelete from '../../hooks/useGetAndDelete';
import usePostAndPut from '../../hooks/usePostAndPut';

const columns: GridColDef[] = [
    { field: 'name', headerName: 'First name', flex: 1, minWidth: 120 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 120 },
    { field: 'crews', headerName: 'Crews', flex: 1, minWidth: 100 },
];

export default function EmployeeTable({ search }: { search: string }) {
    const { addEmployeeForm } = useContext(AppContext) as AppContextType;
    const [employeeRowsData, setEmployeeRowsData] = useState<any[]>([]);


    const getEmploye = useGetAndDelete(axios.get);
    const postEmploye = usePostAndPut(axios.post);

    const getEmployees = async () => {
        try {
            const response = await getEmploye.callApi('employees/', true, false);
            console.log('Employees fetched:', response.data);
            setEmployeeRowsData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (
            addEmployeeForm.name &&
            addEmployeeForm.email &&
            addEmployeeForm.crews
        ) {
            postEmploye.callApi('employees/', addEmployeeForm, true, false, true)
                .then(() => {
                    getEmployees();
                })
                .catch((error) => { console.error('Error adding employee:', error); });
        }
    }, [addEmployeeForm]);


    const filteredEmployeeRowsData = employeeRowsData.filter((employee) =>
        [employee.name, employee.email, employee.crews.join(' ')] // join array into string
            .some((field) =>
                field?.toLowerCase().includes(search.toLowerCase())
            )
    );


    useEffect(() => {
        getEmployees();
    }, []);

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={filteredEmployeeRowsData}
                columns={columns}
                loading={getEmploye.loading}
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
    );
}
