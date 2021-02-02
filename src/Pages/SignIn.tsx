import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import errorMessages from '../constants/errorMessages.json';
import routes from '../constants/routes.json';
import { ISignInFormValues, IErrorResponse, IUser } from '../interfaces';
import { setHeaders, setCurrentUser } from '../slices/currentUser';

const SignInForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const { control, errors, handleSubmit } = useForm<ISignInFormValues>();

  const onSubmit = (data: SubmitHandler<ISignInFormValues>) => {
    setLoading(true);
    axios
      .post<{ data: IUser }>('/auth/sign_in', data)
      .then((res) => {
        dispatch(setCurrentUser(res.data.data));
        dispatch(setHeaders(res.headers));
        history.push(routes.HOME);
      })
      .catch((err: AxiosError<IErrorResponse>) => {
        if (!err.response) return;
        setServerErrors(err.response.data.errors);
        setLoading(false);
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box mb={2}>
                {serverErrors.length ? (
                  <Box mb={2}>
                    <Alert severity="error">{serverErrors.join('\n')}</Alert>
                  </Box>
                ) : null}
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: {
                      value: true,
                      message:
                        errorMessages.email.text + errorMessages.required,
                    },
                    maxLength: {
                      value: errorMessages.email.maxLength,
                      message:
                        errorMessages.email.text +
                        errorMessages.is +
                        String(errorMessages.email.maxLength) +
                        errorMessages.maxLength,
                    },
                  }}
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
                  rules={{
                    required: {
                      value: true,
                      message:
                        errorMessages.password.text + errorMessages.required,
                    },
                    maxLength: {
                      value: errorMessages.password.maxLength,
                      message:
                        errorMessages.password.text +
                        errorMessages.is +
                        String(errorMessages.password.maxLength) +
                        errorMessages.maxLength,
                    },
                  }}
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={
                  <Fade in={loading}>
                    <CircularProgress size={20} />
                  </Fade>
                }
                disabled={loading}
                disableElevation
                fullWidth
              >
                SignIn
              </Button>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignInForm;
