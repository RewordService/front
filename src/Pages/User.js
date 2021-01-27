/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState, useMemo } from 'react';
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
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
// scripts
import { UserInfo } from '../Axios/UsersController';
// partials
import Section from '../Atom/Section';
import UserProfile from '../Molecules/UserProfile';

const calcPercent = (success, total) => {
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
  const params = useParams();
  const [rewords, setRewords] = useState(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    [...Array(8)].map((_, i) => ({
      name: i + 1,
      total: 0,
      correct: 0,
      percent: 0,
    }))
  );

  useEffect(() => {
    UserInfo(params.id)
      .then((res) => {
        setRewords(
          ORDINAL.map((ordinal, i) => ({
            name: i + 2,
            total: res.rewords[0][`${ordinal}_total`],
            correct: res.rewords[0][`${ordinal}_success`],
            percent: calcPercent(
              res.rewords[0][`${ordinal}_success`],
              res.rewords[0][`${ordinal}_total`]
            ),
          }))
        );
      })
      .catch((err) => console.log(err));
  }, [ORDINAL, params.id]);

  return (
    <Container>
      <Box mt={5}>
        <UserProfile />
      </Box>
      <Box my={5}>
        <Paper>
          <Box p={2}>
            <Section>
              <h2>成績</h2>
              <h3>正答数</h3>
              <ResponsiveContainer width="99%" aspect={2}>
                <BarChart
                  data={rewords}
                  width={730}
                  height={400}
                  label={{ value: '正答数', position: 'top' }}
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
            </Section>
            <Section>
              <h3>正答率</h3>
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
            </Section>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default User;
