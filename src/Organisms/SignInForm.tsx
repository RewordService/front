import React from "react"
import {Controller, useForm} from "react-hook-form"
import {ErrorMessage} from "@hookform/error-message"
import Alert from "@material-ui/lab/Alert"
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import errorMessages from "../constants/errorMessages.json"

const SignInForm = () => {
  const {control, errors, handleSubmit} = useForm()
  const onSubmit = () => {
    const url = "/api/auth/sign_in"
    //const data = {
    //email: this.state.email,
    //password: this.state.password,
    //}
    //AuthPost(data, url).then(res => this.setState({errors: res}))
  }

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
                      value: 254,
                      message:
                        errorMessages.email.text +
                        errorMessages.is +
                        errorMessages.maxLength,
                    },
                  }}
                  render={({ref, value, onChange}, {invalid}) => (
                    <TextField
                      variant="filled"
                      label="Email"
                      error={invalid}
                      fullWidth
                      inputRef={ref}
                      value={value}
                      onChange={e => onChange(e.target.value)}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({message}) => (
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
                      value: 254,
                      message:
                        errorMessages.password.text +
                        errorMessages.is +
                        errorMessages.password.maxLength +
                        errorMessages.maxLength,
                    },
                  }}
                  render={({ref, value, onChange}, {invalid}) => (
                    <TextField
                      variant="filled"
                      label="password"
                      error={invalid}
                      fullWidth
                      inputRef={ref}
                      value={value}
                      onChange={e => onChange(e.target.value)}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({message}) => (
                    <Alert severity="error">{message}</Alert>
                  )}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disableElevation
              >
                SignIn
              </Button>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default SignInForm
