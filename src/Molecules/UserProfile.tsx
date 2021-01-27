import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import BoldTypography from '../components/BoldTypography';
// scripts
import { UserInfo } from '../Axios/UsersController';
import { IUser } from '../interfaces';

export default function UserProfile() {
  const params = useParams();
  const [user, setUser] = useState<IUser>({
    id: 0,
    name: '',
    image: { url: '' },
    createdDate: '',
    intro: '',
    rewords: [{ total: 0 }],
  });

  useEffect(() => {
    // UserInfo(params)
    /// /@ts-ignore
    // .then(res => setUser(res as IUser))
    // .catch(err => console.log(err))
    setUser({
      id: 1,
      name: 'test',
      image: { url: '' },
      createdDate: 'created_date',
      intro: 'aaaaaaaaa',
      rewords: [{ total: 0 }],
    });
  }, [params]);

  return (
    <Paper>
      <Box p={2}>
        <Box
          border={5}
          borderTop={0}
          borderRight={0}
          borderBottom={0}
          borderColor="primary.main"
        >
          <Box
            display="flex"
            alignItems="center"
            border={1}
            borderTop={0}
            borderLeft={0}
            borderRight={0}
            borderColor="text.disabled"
            pl={4}
          >
            <BoldTypography variant="subtitle1">プロフィール</BoldTypography>
          </Box>
        </Box>
        <Box textAlign="center">
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="body1">ユーザー名</Typography>
              <BoldTypography>{user.name}</BoldTypography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="body1">Reword開始日</Typography>
              <BoldTypography>{user.createdDate}</BoldTypography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">トータルスコア</Typography>
              <BoldTypography>
                {user.rewords && user.rewords[0].total}
              </BoldTypography>
            </Grid>
            <Typography variant="body1">{user.intro}</Typography>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
}
