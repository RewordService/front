import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import Box from '@material-ui/core/Box';
import routes from '../../constants/routes.json';
import BoldTypography from '../BoldTypography';

const useStyles = makeStyles((theme) => ({
  twitter: {
    color: 'white',
    background: theme.palette.twitter.main,
    '&:hover': { background: theme.palette.twitter.dark },
  },
  facebook: {
    color: 'white',
    background: theme.palette.facebook.main,
    '&:hover': { background: theme.palette.facebook.dark },
  },
}));
const ShareButtons: React.FC = () => {
  const classes = useStyles();
  return (
    <Box mt={5}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            fullWidth
            component={RouterLink}
            to={routes.GAME}
            startIcon={<SportsEsportsIcon fontSize="large" />}
          >
            <BoldTypography variant="subtitle1">PlayGame</BoldTypography>
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            className={classes.twitter}
            variant="contained"
            disableElevation
            fullWidth
            href={routes.TWITTER}
            startIcon={<TwitterIcon fontSize="large" />}
          >
            <BoldTypography variant="subtitle1">Twitter</BoldTypography>
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            className={classes.facebook}
            variant="contained"
            disableElevation
            fullWidth
            href={routes.FACEBOOK}
            startIcon={<FacebookIcon fontSize="large" />}
          >
            <BoldTypography variant="subtitle1">Facebook</BoldTypography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ShareButtons;
