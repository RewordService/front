import React, { useState, useEffect } from 'react';
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
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PersonIcon from '@material-ui/icons/Person';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import BoldTypography from '../components/BoldTypography';
import Section from '../components/Section';
import routes from '../constants/routes.json';
import { selectCurrentUser } from '../slices/currentUser';
import { IUser } from '../interfaces';

const calcPercent = (success: number, total: number) => {
  const result = Math.round((success / total) * 100);
  if (Number.isNaN(result)) return 0;
  if (result > 100) return 100;
  return result;
};
interface IRechartData {
  name: number;
  total: number;
  success: number;
  percent: number;
}
const User: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [rewords, setRewords] = useState<IRechartData[]>([]);
  const [user, setUser] = useState<IUser>({
    email: '',
    id: 0,
    image: { url: '' },
    name: '',
    nickname: '',
    created_at: '',
    birthday: '',
    gender: 0,
    introduction: '',
  });
  useEffect(() => {
    axios
      .get<IUser>(`/users/${params.id}`)
      .then((res) => {
        if (!res.data.reword) return;
        const resRewords = Object.entries(res.data.reword);
        const ary = [];
        for (let i = 0; i < resRewords.length; i += 1) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const [count, { total, success }]: [
            string,
            { total: number; success: number }
          ] = resRewords[i];
          if (!Number(count)) break;
          ary.push({
            name: i + 2,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            total,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            success,
            percent: calcPercent(total, success),
          });
        }
        setUser(res.data);
        setRewords(ary);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  return (
    <Container>
      <Box mt={5}>
        <UserProfile user={user} loading={loading} />
      </Box>
      <Box mt={5}>
        <AccountNav paramsId={Number(params.id)} />
      </Box>
      <Box mb={5}>
        <Section title={<BoldTypography variant="h5">成績</BoldTypography>}>
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
                dataKey="success"
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
        </Section>
      </Box>
    </Container>
  );
};

const AccountNav: React.FC<{ paramsId: number }> = ({
  paramsId,
}: {
  paramsId: number;
}) => {
  const currentUser = useSelector(selectCurrentUser);
  if (!currentUser) return null;
  if (!(paramsId === currentUser.id)) return null;
  return (
    <Box mt={5}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardActionArea component={Link} to={routes.ACCOUNTEDIT}>
              <CardContent>
                <PersonIcon fontSize="large" />
                <BoldTypography>アカウント編集</BoldTypography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
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
  );
};

interface IUserProfile {
  loading: boolean;
  user: IUser;
}
const UserProfile: React.FC<IUserProfile> = ({
  loading,
  user,
}: IUserProfile) => (
  <Section
    title={<BoldTypography variant="subtitle1">プロフィール</BoldTypography>}
  >
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
              <BoldTypography>{user.created_at}</BoldTypography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">トータルスコア</Typography>
            <BoldTypography>{user.reword?.total}</BoldTypography>
          </Grid>
          <Box mb={5}>
            <Typography variant="body1">{user.introduction}</Typography>
          </Box>
        </Grid>
      </Box>
    )}
  </Section>
);
export default User;
