import {createMuiTheme} from "@material-ui/core/styles"
declare module "@material-ui/core/styles/createPalette" {
  interface PaletteOptions {
    twitter: PaletteOptions["primary"]
    facebook: PaletteOptions["primary"]
  }
  interface Palette {
    twitter: Palette["primary"]
    facebook: Palette["primary"]
  }
}
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#79bac1",
      dark: "#2a7886",
      contrastText: "#fff",
    },
    twitter: {
      main: "#1da1f2",
      dark: "#158ad1",
    },
    facebook: {
      main: "#3B5998",
      dark: "#2a4070",
    },
  },
})

export default theme
