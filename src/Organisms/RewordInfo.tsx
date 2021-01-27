/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { GameIndex } from '../Axios/GamePost';
import BoldTypography from '../components/BoldTypography';

export default function RewordInfo() {
  const [scoreTotal, setScoreTotal] = useState(0);
  const [scoreRate, setScoreRate] = useState(0);
  const refScoreTotal = useRef(scoreTotal);
  const refScoreRate = useRef(scoreRate);

  useEffect(() => {
    GameIndex().then((res) => {
      console.log(res);
      const timer = setInterval(async () => {
        await setScoreTotal((score) => score + 1);
        if (res.score_total < refScoreTotal.current) clearInterval(timer);
      }, 10);

      const timer1 = setInterval(() => {
        setScoreRate((score) => score + 1);
        if (res.score_rate < refScoreRate.current) {
          clearInterval(timer1);
          setScoreRate(res.score_rate);
        }
      }, 10);
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
              <BoldTypography variant="h4">{scoreTotal}</BoldTypography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box textAlign="center" py={5}>
              <Typography variant="body1">総合正答率</Typography>
              <BoldTypography variant="h4">{scoreRate}%</BoldTypography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
