import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import BoldTypography from '../../components/BoldTypography';
import Section from '../../components/Section';
import MiniUserCards from './MiniUserCard';
import { IUser } from '../../interfaces';

const NewUsers: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/users/new_users')
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Section
      title={
        <>
          <PersonAddIcon />
          <BoldTypography variant="h5">新規ユーザー</BoldTypography>
        </>
      }
    >
      <MiniUserCards loading={loading} users={users} />
    </Section>
  );
};

export default NewUsers;
