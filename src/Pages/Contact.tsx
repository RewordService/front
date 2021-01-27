import React from 'react';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import { Email } from '@material-ui/icons';
import BoldTypography from '../components/BoldTypography';
import errorMessages from '../constants/errorMessages.json';

const Contact: React.FC = () => {
  const { control, errors, handleSubmit } = useForm();

  async function onSubmit() {
    // await axios
    // .post('/contacts', data)
    // .then((res) => {
    // console.log(res);
    // })
    // .catch((err) => {
    // });
  }

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
                <Box display="flex" alignItems="center">
                  <Email />
                </Box>
                <BoldTypography variant="h5">
                  お問い合わせフォーム
                </BoldTypography>
              </Box>
            </Box>
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
                  name="contact"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: {
                      value: true,
                      message:
                        errorMessages.contact.text + errorMessages.required,
                    },
                    maxLength: {
                      value: errorMessages.contact.maxLength,
                      message:
                        errorMessages.contact.text +
                        errorMessages.is +
                        String(errorMessages.contact.maxLength) +
                        errorMessages.maxLength,
                    },
                  }}
                  render={({ ref, value, onChange }, { invalid }) => (
                    <TextField
                      variant="outlined"
                      label="Contact"
                      error={invalid}
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
                  name="contact"
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
                Submit
              </Button>
            </form>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Contact;
