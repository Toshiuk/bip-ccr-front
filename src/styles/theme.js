import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFFFFF"
    },
    secondary: {
      main: "#383667"
    },
    text: {
      secondary: "#FFFFFF"
    }
  },
  shape: {
    borderRadius: 4
  },
  typography: {
    h3: {
      fontSize: "1.5rem"
    },
    button: {
      fontSize: "1.125rem"
    }
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        border: "1px solid #C5C5C5;",
        background: "#F5F5F5"
      }
    },
    MuiRadio: {
      root: {
        color: "#383667"
      }
    },
    MuiCheckbox: {
      root: {
        color: "#383667"
      }
    }
  }
});

export default theme;
