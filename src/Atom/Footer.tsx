import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';

const Footer: React.FC = () => (
  <Box
    width="100%"
    bgcolor="primary.main"
    color="primary.contrastText"
    py={4}
    textAlign="center"
  >
    <Button color="inherit" component={Link} to={routes.POLICY}>
      プライバシーポリシー
    </Button>
    <Button color="inherit" component={Link} to={routes.CONTACT}>
      お問い合わせ
    </Button>
    <Typography variant="body1" color="inherit">
      © 2020 Reword
    </Typography>
  </Box>
);
export default Footer;
