import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import BoldTypography from '../components/BoldTypography';
import MiniCards from '../Molecules/MiniCard';
import { IUser } from '../interfaces';

const ScoreUsers: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<IUser[]>('/users/total_users')
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err: AxiosError) => err);
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
            display="flex"
            alignItems="center"
            border={1}
            borderTop={0}
            borderLeft={0}
            borderRight={0}
            borderColor="text.disabled"
            pl={4}
          >
            <EmojiEventsIcon />
            <BoldTypography variant="h5">スコアランキング</BoldTypography>
          </Box>
        </Box>
        <MiniCards users={users} loading={loading} />
      </Box>
    </Paper>
  );
};
export default ScoreUsers;
