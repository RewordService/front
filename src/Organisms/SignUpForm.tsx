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

const SignUpForm = () => {
  const onSubmit = () => {
    //if (!this.state.agree) {
    //return this.setState({errors: ["利用規約に同意をしてください"]})
    //} else {
    //const data = {
    //email: this.state.email,
    //name: this.state.name,
    //password: this.state.password,
    //password_confirmation: this.state.password_confirmation,
    //}
    //const url = "/api/auth"
    //AuthPost(data, url).then(res => this.setState({errors: res}))
    //}
  }
  const {control, errors, watch, handleSubmit} = useForm()
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
                      value: 254,
                      message:
                        errorMessages.email.text +
                        errorMessages.is +
                        errorMessages.email.maxLength +
                        errorMessages.maxLength,
                    },
                  }}
                  render={({ref, value, onChange}, {invalid}) => (
                    <TextField
                      variant="outlined"
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
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: {
                      value: true,
                      message: errorMessages.name.text + errorMessages.required,
                    },
                    maxLength: {
                      value: 254,
                      message:
                        errorMessages.name.text +
                        errorMessages.is +
                        errorMessages.name.maxLength +
                        errorMessages.maxLength,
                    },
                  }}
                  render={({ref, value, onChange}, {invalid}) => (
                    <TextField
                      variant="outlined"
                      label="Name"
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
                  name="name"
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
                      type="password"
                      variant="outlined"
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
              <Box mb={2}>
                <Controller
                  name="password_confirmation"
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
                      value: value =>
                        value === watch("password") ||
                        errorMessages.validate_password_confirmation,
                    },
                  }}
                  render={({ref, value, onChange}, {invalid}) => (
                    <TextField
                      type="password"
                      variant="outlined"
                      label="password_confirmation"
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
                  name="password_confirmation"
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
                fullWidth
              >
                SignUp
              </Button>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
export default SignUpForm
