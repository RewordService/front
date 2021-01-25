import React, {useState, KeyboardEvent, ChangeEvent} from "react"
import {Link as RouterLink, useHistory} from "react-router-dom"
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import Hidden from "@material-ui/core/Hidden"
import IconButton from "@material-ui/core/IconButton"
import Drawer from "@material-ui/core/Drawer"
import LabelImportantIcon from "@material-ui/icons/LabelImportant"
import SearchIcon from "@material-ui/icons/Search"
import MenuIcon from "@material-ui/icons/Menu"
//scripts
import {IsSignedIn} from "../Axios/UsersController"
//partials
import routes from "../constants/routes.json"
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
)
function Header() {
  const [search, setSearch] = useState("")
  const history = useHistory()
  const classes = useStyles()
  const SearchResult = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter")
      history.push({
        pathname: "SearchResult",
        state: {name_cont: search},
      })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value)

  return (
    <>
      <AppBar color="default">
        <Toolbar>
          <Hidden mdUp>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
          </Hidden>
          <LabelImportantIcon />
          <Typography variant="h5">
            <Link
              color="inherit"
              underline="none"
              component={RouterLink}
              to={IsSignedIn() ? routes.HOME : routes.LANDING}
            >
              REWORD
            </Link>
          </Typography>
          <Hidden mdDown>
            <Box className={classes.root}>
              <Button component={RouterLink} to={routes.HOME}>
                Home
              </Button>
              <Button component={RouterLink} to={routes.GAME}>
                Game
              </Button>
              {IsSignedIn() ? (
                <Button
                  color="primary"
                  variant="contained"
                  component={RouterLink}
                  to={routes.SIGNOUT}
                  disableElevation
                >
                  SignOut
                </Button>
              ) : (
                <>
                  <Button
                    color="primary"
                    variant="contained"
                    component={RouterLink}
                    to={routes.SIGNIN}
                    disableElevation
                  >
                    SignIn
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    component={RouterLink}
                    to={routes.SIGNUP}
                    disableElevation
                  >
                    SignUp
                  </Button>
                </>
              )}
            </Box>
          </Hidden>
          <Box ml="auto">
            <Grid container alignItems="flex-end">
              <Grid item>
                <SearchIcon />
              </Grid>
              <Grid item>
                <TextField
                  label="Search User"
                  onKeyDown={SearchResult}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer />
    </>
  )
}

export default Header
