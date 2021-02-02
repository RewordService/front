import React, { useState } from 'react';
import axios from 'axios';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Email from '@material-ui/icons/Email';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert, AlertTitle } from '@material-ui/lab';
import BoldTypography from '../components/BoldTypography';
import Section from '../components/Section';
import errorMessages from '../constants/errorMessages.json';

interface IContact {
  email: string;
  message: string;
}
const Contact: React.FC = () => {
  const [send, setSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const { control, errors, handleSubmit } = useForm();

  const onSubmit = (data: SubmitHandler<IContact>) => {
    setLoading(true);
    axios
      .post('/contacts', data)
      .then(() => {
        setSend(true);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <Container>
      <Box my={5}>
        <Section
          title={
            <>
              <Box display="flex" alignItems="center">
                <Email />
              </Box>
              <BoldTypography variant="h5">お問い合わせフォーム</BoldTypography>
            </>
          }
        >
          {send ? (
            <Box mt={5}>
              <Alert severity="success">
                <AlertTitle>送信しました！</AlertTitle>
                数日以内に返信を行います。お待ちください。
              </Alert>
            </Box>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box mt={2}>
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
              <Box my={2}>
                <Controller
                  name="message"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: {
                      value: true,
                      message:
                        errorMessages.message.text + errorMessages.required,
                    },
                    maxLength: {
                      value: errorMessages.message.maxLength,
                      message:
                        errorMessages.message.text +
                        errorMessages.is +
                        String(errorMessages.message.maxLength) +
                        errorMessages.maxLength,
                    },
                  }}
                  render={({ ref, value, onChange }, { invalid }) => (
                    <TextField
                      variant="outlined"
                      label="Message"
                      error={invalid}
                      disabled={loading}
                      multiline
                      rows={10}
                      fullWidth
                      inputRef={ref}
                      value={value as string}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="message"
                  render={({ message }) => (
                    <Alert severity="error">{message}</Alert>
                  )}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                startIcon={
                  <Fade in={loading}>
                    <CircularProgress size={20} />
                  </Fade>
                }
                disableElevation
                fullWidth
              >
                Submit
              </Button>
            </form>
          )}
        </Section>
      </Box>
    </Container>
  );
};

export default Contact;
