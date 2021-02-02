import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { useSelector, useDispatch } from 'react-redux';
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
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
  selectCurrentUser,
  selectHeaders,
  remove,
} from '../slices/currentUser';
import routes from '../constants/routes.json';
import { IErrorResponse } from '../interfaces';

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
  const [serverError, setServerError] = useState('');
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const headers = useSelector(selectHeaders);
  const history = useHistory();
  const classes = useStyles();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      history.push({
        pathname: routes.SEARCH,
        state: { nameCont: search },
      });
    }
  };
  const handleCloseDrawer = () => setOpen(false);
  const handleOpenDrawer = () => setOpen(true);
  const handleCloseSnackbar = () => setServerError('');
  const handleSignOut = () => {
    if (!headers) return;
    axios
      .delete('/auth/sign_out', headers)
      .then(() => {
        dispatch(remove());
        history.push({
          pathname: routes.HOME,
        });
      })
      .catch((err: AxiosError<IErrorResponse>) => {
        dispatch(remove());
        setServerError(err.response?.data.errors[0] || '');
        history.push({
          pathname: routes.HOME,
        });
      });
  };

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
      {currentUser && (
        <List>
          <ListItem button component={RouterLink} to={routes.MYPAGE}>
            <ListItemText primary="MyPage" />
          </ListItem>
        </List>
      )}
      <Divider />
      <List>
        {currentUser ? (
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
            to={routes.LANDING}
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
            {currentUser?.id ? (
              <Button
                color="primary"
                variant="contained"
                disableElevation
                onClick={handleSignOut}
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
          {currentUser?.id && (
            <IconButton
              component={RouterLink}
              to={`${routes.USERS}/${currentUser.id || ''}`}
            >
              <AccountCircleIcon fontSize="large" />
            </IconButton>
          )}
        </Hidden>
      </Toolbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!serverError}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert elevation={6} variant="filled" severity="error">
          {serverError}
        </Alert>
      </Snackbar>
    </AppBar>
  );
};

export default Header;
