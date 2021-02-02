import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useLocation } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import UserCard from './UserCard';
import { IUser } from '../../interfaces';

const SearchResult: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const location = useLocation<{ nameCont: string }>();
  useEffect(() => {
    const data = {
      params: { q: { name_cont: location.state.nameCont }, page },
    };
    axios
      .get<IUser[]>('/users', data)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err: AxiosError) => err);
  }, [location.state.nameCont, page]);
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
