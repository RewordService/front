/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useLocation } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';
import UserCard from './UserCard';
import { IUser, IPagination } from '../../interfaces';

const SearchResult: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    link: '',
    perPage: 0,
  });
  const location = useLocation<{ nameCont: string }>();
  const handleChange = (_e: React.ChangeEvent<unknown>, value: number) =>
    setPage(value);
  useEffect(() => {
    const data = {
      params: { q: { name_cont: location.state.nameCont }, page },
    };
    axios
      .get<IUser[]>('/users', data)
      .then((res) => {
        const { total, link, 'per-page': perPage }: IPagination = res.headers;
        setPagination({ total, link, perPage });
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
  return (
    <>
      <UserCard users={users} />
      <Box display="flex" justifyContent="center" mb={5}>
        <Pagination
          count={Math.ceil(pagination.total / pagination.perPage)}
          size="large"
          onChange={handleChange}
        />
      </Box>
    </>
  );
};

export default SearchResult;
