/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export interface AddUserFormType {
    Id: string;
    lastName: string;
    firstName: string;
    role: string;
    lastActivity: string;
}
export interface AddEmployeeFormType {
    name: string;
    email: string;
    crews: string[];
}

export interface AppContextType {
    isUser: any;
    setIsUser: (isUser: any) => void;
    isAuthLoading: boolean;
    setIsAuthLoading: (isAuthLoading: boolean) => void;
    addUserForm: AddUserFormType;
    setAddUserForm: (addUserForm: AddUserFormType) => void;
    addEmployeeForm: AddEmployeeFormType;
    setAddEmployeeForm: (addEmployeeForm: AddEmployeeFormType) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {

    const [isUser, setIsUser] = useState<any>(null);
    const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
    const [addUserForm, setAddUserForm] = useState<AddUserFormType>({
        Id: '',
        lastName: '',
        firstName: '',
        role: '',
        lastActivity: '',
    });
    const [addEmployeeForm, setAddEmployeeForm] = useState<AddEmployeeFormType>({
        name: "",
        email: "",
        crews: []
    });


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setIsUser(firebaseUser);
            setIsAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);


    return (
        <AppContext.Provider value={{ isUser, setIsUser, addUserForm, setAddUserForm, addEmployeeForm, setAddEmployeeForm, isAuthLoading, setIsAuthLoading }}>
            {children}
        </AppContext.Provider>
    );
};
