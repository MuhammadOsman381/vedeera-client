import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useState, useEffect, useContext } from 'react';
import useGetAndDelete from '../../hooks/useGetAndDelete';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

const columns: GridColDef<(any)[number]>[] = [
    { field: 'id', headerName: 'UserID', flex: 2, minWidth: 200 },
    { field: 'email', headerName: 'Email', flex: 2, minWidth: 200 },
    { field: 'firstname', headerName: 'First name', flex: 1, minWidth: 120 },
    { field: 'lastname', headerName: 'Last name', flex: 1, minWidth: 120 },
    { field: 'role', headerName: 'Role', flex: 1, minWidth: 100 },
];

export default function UserTable({ searchUser }: { searchUser: string }) {
    const context = useContext(AppContext);
    if (!context) return null;
    const { refresh } = context;
    const [userRowsData, setUserRowsData] = useState<any[]>([]);
    const getUser = useGetAndDelete(axios.get);
    const getUsers = async () => {
        const response = await getUser.callApi('users/allUsers', true, false);
        console.log('Users fetched:', response.data);
        setUserRowsData(response.data);
    };
    const filteredUserRowsData = userRowsData.filter(
        (user) =>
            user?.email?.toLowerCase().includes(searchUser.toLowerCase()) ||
            user?.lastname?.toLowerCase().includes(searchUser.toLowerCase()) ||
            user?.firstname?.toLowerCase().includes(searchUser.toLowerCase()) ||
            user?.role?.toLowerCase().includes(searchUser.toLowerCase())
    );
    useEffect(() => {
        getUsers();
    }, [refresh]);
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                loading={getUser.loading}
                rows={filteredUserRowsData}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 6,
                        },
                    },
                }}
                pageSizeOptions={[5]}
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
