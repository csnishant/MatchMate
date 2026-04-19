// src/theme/theme.js

import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000",
      paper: "#1c1c1e",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "18px",
          backgroundColor: "#1c1c1e",
        },
        notchedOutline: {
          borderColor: "rgba(255,255,255,0.1)",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#9ca3af",
        },
      },
    },
  },
});
