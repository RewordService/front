import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import BoldTypography from '../components/BoldTypography';

const UserProfile: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: '',
    image: { url: '' },
    created_date: '',
    intro: '',
    rewords: [{ total: 0 }],
  });

  useEffect(() => {
    axios
      .get(`/users/${params.id}`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

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
        {loading ? (
          <Box my={5}>
            <LinearProgress />
          </Box>
        ) : (
          <Box textAlign="center">
            <Grid container>
              <Grid item xs={4}>
                <Box
                  border={1}
                  borderTop={0}
                  borderBottom={0}
                  borderLeft={0}
                  borderColor="text.disabled"
                >
                  <Typography variant="body1">ユーザー名</Typography>
                  <BoldTypography>{user.name}</BoldTypography>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box
                  border={1}
                  borderTop={0}
                  borderBottom={0}
                  borderLeft={0}
                  borderColor="text.disabled"
                >
                  <Typography variant="body1">Reword開始日</Typography>
                  <BoldTypography>{user.created_date}</BoldTypography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">トータルスコア</Typography>
                <BoldTypography>
                  {user.rewords[0]?.total || 'データがありません'}
                </BoldTypography>
              </Grid>
              <Box mb={5}>
                <Typography variant="body1">{user.intro}</Typography>
              </Box>
            </Grid>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default UserProfile;
