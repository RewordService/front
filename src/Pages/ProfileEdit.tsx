import React, { useState, ChangeEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import BoldTypography from '../components/BoldTypography';
import {
  selectCurrentUser,
  selectHeaders,
  setCurrentUser,
} from '../slices/currentUser';
import { IErrorResponse, ICurrentUserResponse } from '../interfaces';

const ProfileEdit: React.FC = () => {
  const [serverError, setServerError] = useState('');
  const dispatch = useDispatch();
  const headers = useSelector(selectHeaders);
  const currentUser = useSelector(selectCurrentUser);
  const { control, handleSubmit } = useForm();
  const IconPatch = (e: ChangeEvent<HTMLInputElement>) => {
    if (!headers) return;
    const formData = new FormData();
    formData.append('image', (e.target.files as FileList)[0]);
    axios
      .patch('api/auth', formData, headers)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };
  const IconDelete = () => {
    if (!headers) return;
    axios
      .patch('api/auth', { image: null }, headers)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };
  const onSubmit = (data: SubmitHandler<{ introduction: string }>) => {
    if (!headers) return;
    axios
      .patch<ICurrentUserResponse>('/api/auth', data, headers)
      .then((res) => {
        // TODO:
        dispatch(setCurrentUser(res.data.data));
      })
      .catch((err: AxiosError<IErrorResponse>) => {
        if (!err.response) return;
        setServerError(err.response.data.errors[0]);
      });
  };
  const handleCloseSnackbar = () => setServerError('');

  return (
    <Container>
      <Box my={5}>
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
                <BoldTypography variant="h5">プロフィール編集</BoldTypography>
              </Box>
            </Box>
            <Box mt={5}>
              <Box
                display="flex"
                alignItems="center"
                mb={3}
                border={1}
                borderTop={0}
                borderLeft={0}
                borderRight={0}
                borderColor="text.disabled"
              >
                <BoldTypography variant="h6">プロフィール画像</BoldTypography>
              </Box>
              <input
                type="file"
                name="file"
                accept="image/*"
                onChange={(e) => IconPatch(e)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={IconDelete}
                disableElevation
              >
                デフォルトに戻す
              </Button>
            </Box>
            <Box mt={5}>
              <Box
                display="flex"
                alignItems="center"
                mb={3}
                border={1}
                borderTop={0}
                borderLeft={0}
                borderRight={0}
                borderColor="text.disabled"
              >
                <BoldTypography variant="h6">紹介文</BoldTypography>
              </Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="intro"
                  control={control}
                  defaultValue={currentUser?.intro}
                  render={({ ref, value, onChange }) => (
                    <TextField
                      variant="outlined"
                      label="introduce"
                      multiline
                      rows={10}
                      fullWidth
                      inputRef={ref}
                      value={value as string}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  )}
                />
                <Box mt={5}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disableElevation
                    fullWidth
                  >
                    保存
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Paper>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!serverError}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert elevation={6} variant="filled" severity="error">
          {serverError}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProfileEdit;
