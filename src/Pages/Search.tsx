/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import UserCard from '../Molecules/UserCard';
import { Users } from '../Axios/UsersController';
import { IUser } from '../interfaces';

const SearchResult: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation<{ nameCont: string }>();
  useEffect(() => {
    const storageHeader: IUser = JSON.parse(localStorage.getItem('user'));
    console.log(storageHeader);
    Users(location.state.nameCont)
      .then((res) => {
        setUsers(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [location.state.nameCont]);
  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size={100} />
      </Box>
    );
  return <UserCard users={users} />;
};

export default SearchResult;
