import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import BoldTypography from '../components/BoldTypography';

const RewordInfo: React.FC = () => {
  const [score, setScore] = useState({ score_total: 0, score_rate: 0 });

  useEffect(() => {
    axios
      .get('/rewords')
      .then((res) => setScore(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
            border={1}
            borderTop={0}
            borderLeft={0}
            borderRight={0}
            borderColor="text.disabled"
            pl={4}
          >
            <BoldTypography variant="h5">Reword</BoldTypography>
          </Box>
        </Box>
        <Grid container>
          <Grid item xs={6}>
            <Box
              border={1}
              borderTop={0}
              borderLeft={0}
              borderBottom={0}
              borderColor="text.disabled"
              textAlign="center"
              py={5}
            >
              <Typography variant="body1">総合Reword数</Typography>
              <BoldTypography variant="h4">{score.score_total}</BoldTypography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box textAlign="center" py={5}>
              <Typography variant="body1">総合正答率</Typography>
              <BoldTypography variant="h4">{score.score_rate}%</BoldTypography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default RewordInfo;
