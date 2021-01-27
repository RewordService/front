/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import BoldTypography from '../components/BoldTypography';
import { newUsers } from '../Axios/UsersController';
import MiniCards from '../Molecules/MiniCard';
import { IUser } from '../interfaces';

const NewUsers: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    setUsers(
      [...Array(10)].map(() => ({
        id: 1,
        name: 'test',
        image: { url: '' },
        created_date: 'created_date',
        intro: 'aaaaaaaaa',
        rewords: [{ total: 0 }],
      }))
    );

    newUsers().then((res) => {
      setUsers(res.data);
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
            <PersonAddIcon />
            <BoldTypography variant="h5">新規ユーザー</BoldTypography>
          </Box>
        </Box>
        <MiniCards users={users} />
      </Box>
    </Paper>
  );
};

export default NewUsers;
