import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import BoldTypography from '../../components/BoldTypography';
import Section from '../../components/Section';
import MiniUserCards from './MiniUserCard';
import { IUser } from '../../interfaces';

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
    <Section
      title={
        <>
          <EmojiEventsIcon />
          <BoldTypography variant="h5">スコアランキング</BoldTypography>
        </>
      }
    >
      <MiniUserCards users={users} loading={loading} />
    </Section>
  );
};
export default ScoreUsers;
