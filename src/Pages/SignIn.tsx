import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import LoadingButton from '../components/Button/LoadingButton';
import routes from '../constants/routes.json';
import {
  ISignInFormValues,
  IErrorResponse,
  IUserSuccessResponse,
  IServerMessages,
} from '../interfaces';
import { setHeaders, setCurrentUser } from '../slices/currentUser';
import ServerAlert from '../components/ServerAlert';
import { signInSchema } from '../schema';

const SignInForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [serverMessages, setServerMessages] = useState<IServerMessages>();
  const dispatch = useDispatch();
  const history = useHistory();
  const { control, errors, handleSubmit } = useForm<ISignInFormValues>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = (data: SubmitHandler<ISignInFormValues>) => {
    setLoading(true);
    axios
      .post<IUserSuccessResponse>('/auth/sign_in', data)
      .then((res) => {
        dispatch(setCurrentUser(res.data.data));
        dispatch(setHeaders(res.headers));
        history.push(routes.HOME);
      })
      .catch((err: AxiosError<IErrorResponse>) => {
        setLoading(false);
        setServerMessages({
          severity: 'error',
          alerts: err.response?.data.errors || [],
        });
      });
  };

  return (
    <Box my={5}>
      <Container maxWidth="xs">
        <Paper>
          <Box p={2}>
            <Typography variant="h4" align="center" gutterBottom>
              SignIn
            </Typography>
            <ServerAlert serverMessages={serverMessages} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box mb={2}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ ref, value, onChange }, { invalid }) => (
                    <TextField
                      variant="outlined"
                      label="Email"
                      error={invalid}
                      disabled={loading}
                      fullWidth
                      inputRef={ref}
                      value={value as string}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => (
                    <Alert severity="error">{message}</Alert>
                  )}
                />
              </Box>
              <Box mb={2}>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ ref, value, onChange }, { invalid }) => (
                    <TextField
                      type="password"
                      variant="outlined"
                      label="password"
                      error={invalid}
                      disabled={loading}
                      fullWidth
                      inputRef={ref}
                      value={value as string}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <Alert severity="error">{message}</Alert>
                  )}
                />
              </Box>
              <LoadingButton loading={loading} primary="SignIn" />
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignInForm;
