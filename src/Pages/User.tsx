/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Link, useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PersonIcon from '@material-ui/icons/Person';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import BoldTypography from '../components/BoldTypography';
import routes from '../constants/routes.json';
import { selectCurrentUser } from '../slices/currentUser';
import UserProfile from '../Molecules/UserProfile';
import { IUser } from '../interfaces';

const calcPercent = (success: number, total: number) => {
  const result = Math.round((success / total) * 100);
  if (Number.isNaN(result)) return 0;
  if (result > 100) return 100;
  return result;
};

const User: React.FC = () => {
  const ORDINAL = useMemo(
    () => [
      'second',
      'third',
      'fourth',
      'fifth',
      'sixth',
      'seventh',
      'eighth',
      'ninth',
      'tenth',
    ],
    []
  );
  const currentUser = useSelector(selectCurrentUser);
  const params = useParams<{ id: string }>();
  const [rewords, setRewords] = useState(
    [...Array(8)].map((_, i) => ({
      name: i + 1,
      total: 0,
      correct: 0,
      percent: 0,
    }))
  );
  useEffect(() => {
    axios
      .get<IUser>(`/users/${params.id}`)
      .then((res) => {
        const ary = [];
        if (!res.data.rewords?.length) return;
        for (let i = 0; i < ORDINAL.length; i += 1) {
          const totalStr = `${ORDINAL[i]}_total`;
          const successStr = `${ORDINAL[i]}_success`;
          const total = res.data.rewords[0][totalStr];
          const correct = res.data.rewords[0][successStr];
          ary.push({
            name: i + 2,
            total,
            correct,
            percent: calcPercent(total, correct),
          });
        }
        setRewords(ary);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ORDINAL, params.id]);

  return (
    <Container>
      <Box mt={5}>
        <UserProfile />
      </Box>
      {Number(params.id) === currentUser?.id && (
        <Box mt={5}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardActionArea component={Link} to={routes.PROFILEEDIT}>
                  <CardContent>
                    <AssignmentIndIcon fontSize="large" />
                    <BoldTypography>プロフィール編集</BoldTypography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardActionArea component={Link} to={routes.ACCOUNTEDIT}>
                  <CardContent>
                    <PersonIcon fontSize="large" />
                    <BoldTypography>アカウント編集</BoldTypography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardActionArea component={Link} to={routes.ACCOUNTSTATUS}>
                  <CardContent>
                    <DoubleArrowIcon fontSize="large" />
                    <BoldTypography>会員グレード</BoldTypography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
      <Box my={5}>
        <Paper>
          <Box p={2}>
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
                  <BoldTypography variant="h5">成績</BoldTypography>
                </Box>
              </Box>
              <BoldTypography variant="h6" align="center">
                正答数
              </BoldTypography>
              <ResponsiveContainer width="99%" aspect={2}>
                <BarChart
                  data={rewords}
                  width={730}
                  height={400}
                  margin={{
                    top: 20,
                    right: 50,
                    left: 50,
                    bottom: 20,
                  }}
                >
                  <Legend verticalAlign="top" height={36} />
                  <Tooltip />
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <XAxis
                    dataKey="name"
                    label={{ value: '文字数', position: 'bottom' }}
                  />
                  <YAxis
                    domain={['dataMin', 'dataMax']}
                    label={{
                      value: '試行回数',
                      angle: -90,
                      position: 'left',
                    }}
                  />
                  <Bar
                    type="monotone"
                    dataKey="total"
                    barSize={10}
                    fill="#78dbff"
                  />
                  <Bar
                    type="monotone"
                    dataKey="correct"
                    barSize={10}
                    fill="#ff7878"
                  />
                </BarChart>
              </ResponsiveContainer>
              <BoldTypography variant="h6" align="center">
                正答率
              </BoldTypography>
              <ResponsiveContainer width="99%" aspect={2}>
                <BarChart
                  data={rewords}
                  width={730}
                  height={400}
                  margin={{
                    top: 20,
                    right: 50,
                    left: 50,
                    bottom: 20,
                  }}
                >
                  <Tooltip />
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <XAxis
                    dataKey="name"
                    label={{ value: '文字数', position: 'bottom' }}
                  />
                  <YAxis
                    ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                    unit=""
                    label={{
                      value: 'パーセント',
                      angle: -90,
                      position: 'left',
                    }}
                  />
                  <Bar
                    type="monotone"
                    dataKey="percent"
                    barSize={10}
                    fill="#2a7886"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default User;
