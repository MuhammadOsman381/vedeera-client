import { createTheme } from "@mui/material/styles";

export const textfieldtheme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiInputLabel-root": {
                        color: "838383", 
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "rgba(151, 151, 151, 1)", 
                    },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "rgba(151, 151, 151, 1)", 
                        },
                        "&:hover fieldset": {
                            borderColor: "rgba(151, 151, 151, 1)", 
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "rgba(151, 151, 151, 1)",  
                        },
                        "& input": {
                            color: "#838383",  
                        },
                        borderRadius: "8px",
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    "&.MuiButton-contained": {
                        backgroundColor: "rgba(25, 82, 160, 1)",
                        "&:hover": {
                            backgroundColor: "rgba(20, 70, 140, 1)",
                        },
                    },
                },
            },
        },
    },
});