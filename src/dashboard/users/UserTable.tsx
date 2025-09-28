import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import type { AppContextType } from '../../context/AppContext';
import { useContext } from 'react';
import useGetAndDelete from '../../hooks/useGetAndDelete';
import axios from 'axios';
import usePostAndPut from '../../hooks/usePostAndPut';

const columns: GridColDef<(any)[number]>[] = [
    { field: 'email', headerName: 'Email', flex: 2, minWidth: 200 },
    { field: 'firstname', headerName: 'First name', flex: 1, minWidth: 120 },
    { field: 'lastname', headerName: 'Last name', flex: 1, minWidth: 120 },
    { field: 'role', headerName: 'Role', flex: 1, minWidth: 100 },
];

export default function UserTable({ searchUser }: { searchUser: string }) {
    const { addUserForm } = useContext(AppContext) as AppContextType;
    const [userRowsData, setUserRowsData] = useState<any[]>([]);

    const getUser = useGetAndDelete(axios.get);
    const addUser = usePostAndPut(axios.post);

    const getUsers = async () => {
        const response = await getUser.callApi('users/allUsers', true, false);
        setUserRowsData(response.data);
    };

    useEffect(() => {
        if (addUserForm.Id === '' || addUserForm.lastName === '' || addUserForm.firstName === '' || addUserForm.role === '') {
            return;
        }
        const payload = {
            email: addUserForm.Id,
            firstname: addUserForm.firstName,
            lastname: addUserForm.lastName,
            role: addUserForm.role
        }
        addUser.callApi('users/create', payload, true, false, true)
            .then(() => {
                getUsers();
            })
            .catch((error) => { console.error('Error adding user:', error); });
    }, [addUserForm]);

    const filteredUserRowsData = userRowsData.filter(
        (user) =>
            user?.email?.toLowerCase().includes(searchUser.toLowerCase()) ||
            user?.lastname?.toLowerCase().includes(searchUser.toLowerCase()) ||
            user?.firstname?.toLowerCase().includes(searchUser.toLowerCase()) ||
            user?.role?.toLowerCase().includes(searchUser.toLowerCase())
    );

    useEffect(() => {
        getUsers();
    }, []);

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
