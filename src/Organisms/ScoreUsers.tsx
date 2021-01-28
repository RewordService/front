/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import BoldTypography from '../components/BoldTypography';
import { totalUsers } from '../Axios/UsersController';
import MiniCards from '../Molecules/MiniCard';

interface IUser {
  id: number;
  name: string;
  image: { url: string };
}
const ScoreUsers: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    totalUsers().then((res) => {
      setUsers(res);
      setLoading(false);
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
