import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '../components/Button/LoadingButton';
import routes from '../constants/routes.json';
import {
  ISignUpFormValues,
  IErrorsResponse,
  IUserSuccessResponse,
  IServerMessages,
} from '../interfaces';
import { setHeaders, setCurrentUser } from '../slices/currentUser';
import ServerAlert from '../components/ServerAlert';
import { signUpSchema } from '../schema';

const SignUpForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [serverMessages, setServerMessages] = useState<IServerMessages>();
  const history = useHistory();
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { control, errors, handleSubmit } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = (data: SubmitHandler<ISignUpFormValues>) => {
    setLoading(true);
    axios
      .post<IUserSuccessResponse>('/auth', data)
      .then((res) => {
        dispatch(setCurrentUser(res.data.data));
        dispatch(setHeaders(res.headers));
        history.push(routes.HOME);
      })
      .catch((err: AxiosError<IErrorsResponse>) => {
        setServerMessages({
          severity: 'error',
          alerts: err.response?.data.errors.full_messages || [],
        });
        setLoading(false);
      });
  };
  return (
    <Box my={5}>
      <Container maxWidth="xs">
        <Paper>
          <Box p={2}>
            <Typography variant="h4" align="center" gutterBottom>
              SignUp
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
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ ref, value, onChange }, { invalid }) => (
                    <TextField
                      variant="outlined"
                      label="Name"
                      error={invalid}
                      fullWidth
                      inputRef={ref}
                      value={value as string}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="name"
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
              <Box mb={2}>
                <Controller
                  name="passwordConfirmation"
                  control={control}
                  defaultValue=""
                  render={({ ref, value, onChange }, { invalid }) => (
                    <TextField
                      type="password"
                      variant="outlined"
                      label="password_confirmation"
                      error={invalid}
                      fullWidth
                      inputRef={ref}
                      value={value as string}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="passwordConfirmation"
                  render={({ message }) => (
                    <Alert severity="error">{message}</Alert>
                  )}
                />
              </Box>
              <LoadingButton loading={loading} primary="SignUp" />
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
export default SignUpForm;
