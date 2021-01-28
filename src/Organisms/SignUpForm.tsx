import React from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import errorMessages from '../constants/errorMessages.json';
import { ISignUpFormValues } from '../interfaces';
import { Sign } from '../Axios/AuthController';

const SignUpForm: React.FC = () => {
  const onSubmit = (data: SubmitHandler<ISignUpFormValues>) =>
    Sign(data, '/api/auth')
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { control, errors, watch, handleSubmit } = useForm();
  return (
    <Box my={5}>
      <Container maxWidth="xs">
        <Paper>
          <Box p={2}>
            <Typography variant="h4" align="center" gutterBottom>
              SignUp
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box mb={2}>
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
                  rules={{
                    required: {
                      value: true,
                      message: errorMessages.name.text + errorMessages.required,
                    },
                    maxLength: {
                      value: errorMessages.name.maxLength,
                      message:
                        errorMessages.name.text +
                        errorMessages.is +
                        String(errorMessages.name.maxLength) +
                        errorMessages.maxLength,
                    },
                  }}
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
                  rules={{
                    required: {
                      value: true,
                      message:
                        errorMessages.password_confirmation.text +
                        errorMessages.required,
                    },
                    validate: {
                      value: (value) =>
                        value === watch('password') ||
                        errorMessages.validate_password_confirmation,
                    },
                  }}
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disableElevation
                fullWidth
              >
                SignUp
              </Button>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
export default SignUpForm;
