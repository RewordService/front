import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
// scripts
import { IsSignedIn } from '../Axios/UsersController';
// partials
import routes from '../constants/routes.json';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  })
);
const Header: React.FC = () => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      history.push({
        pathname: 'SearchResult',
        state: { name_cont: search },
      });
    }
  };
  const handleCloseDrawer = () => setOpen(false);
  const handleOpenDrawer = () => setOpen(true);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const list = () => (
    <Box
      width="250px"
      onClick={handleCloseDrawer}
      onKeyDown={handleCloseDrawer}
    >
      <List>
        <ListItem button component={RouterLink} to={routes.HOME}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={RouterLink} to={routes.GAME}>
          <ListItemIcon>
            <SportsEsportsIcon />
          </ListItemIcon>
          <ListItemText primary="Game" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {IsSignedIn() ? (
          <ListItem button component={RouterLink} to={routes.SIGNOUT}>
            <ListItemText primary="SignOut" />
          </ListItem>
        ) : (
          <>
            <ListItem button component={RouterLink} to={routes.SIGNIN}>
              <ListItemText primary="SignIn" />
            </ListItem>
            <ListItem button component={RouterLink} to={routes.SIGNUP}>
              <ListItemText primary="SignUp" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar color="default" position="sticky">
      <Toolbar>
        <Hidden mdUp>
          <IconButton color="inherit" onClick={handleOpenDrawer}>
            <MenuIcon />
          </IconButton>
          <Drawer open={open} onClose={handleCloseDrawer}>
            {list()}
          </Drawer>
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
        <Hidden smDown>
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
        <Hidden xsDown>
          <Box ml="auto">
            <Grid container alignItems="flex-end">
              <Grid item>
                <SearchIcon />
              </Grid>
              <Grid item>
                <TextField
                  label="Search User"
                  onKeyPress={handleKeyPress}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
