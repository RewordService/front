/* eslint-disable @typescript-eslint/unbound-method */
import React, { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { UserDelete, UserInfo, CurrentUser } from '../Axios/UsersController';
import BoldTypography from '../components/BoldTypography';

interface IFormValue {
  gender: boolean | null;
  year: number;
  password: string;
  passwordConfirmation: string;
}
const AccountEdit: React.FC = () => {
  const { control, handleSubmit, setValue } = useForm();
  const year = new Date().getFullYear();

  useEffect(() => {
    UserInfo(CurrentUser())
      .then((res) => {
        setValue('gender', res.sex);
        setValue('birth', res.birth_year);
        setValue('email', res.email);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setValue]);

  const onSubmit = (data: SubmitHandler<IFormValue>) => console.log(data);

  return (
    <Container>
      <Box mt={5}>
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
                <BoldTypography variant="h5">プロフィール詳細</BoldTypography>
              </Box>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  <BoldTypography variant="h6">性別</BoldTypography>
                </Box>
                <Controller
                  name="gender"
                  control={control}
                  defaultValue={0}
                  render={({ name, ref, value, onChange }) => (
                    <RadioGroup
                      row
                      ref={ref}
                      name={name}
                      value={value as number}
                      onChange={(e) =>
                        onChange(Number.parseInt(e.target.value, 10))
                      }
                    >
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="男性"
                      />
                      <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label="女性"
                      />
                      <FormControlLabel
                        value={9}
                        control={<Radio />}
                        label="その他"
                      />
                    </RadioGroup>
                  )}
                />
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
                  <BoldTypography variant="h6">誕生年</BoldTypography>
                </Box>

                <Controller
                  name="birth"
                  control={control}
                  defaultValue=""
                  render={({ name, value, onChange }) => (
                    <TextField
                      type="text"
                      variant="outlined"
                      value={value as string}
                      label={name}
                      placeholder={`例)${year}`}
                      onChange={(e) => onChange(e.target.value)}
                      fullWidth
                    />
                  )}
                />
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
                  <BoldTypography variant="h6">
                    メールアドレス変更
                  </BoldTypography>
                </Box>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ name, value, onChange }) => (
                    <TextField
                      value={value as string}
                      type="text"
                      label={name}
                      variant="outlined"
                      onChange={(e) => onChange(e.target.value)}
                      fullWidth
                    />
                  )}
                />
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
                  <BoldTypography variant="h6">パスワード変更</BoldTypography>
                </Box>
                <Controller
                  control={control}
                  name="password"
                  defaultValue=""
                  render={({ name, ref, value, onChange }) => (
                    <TextField
                      type="password"
                      label={name}
                      inputRef={ref}
                      value={value as string}
                      onChange={(e) => onChange(e.target.value)}
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <Box mb={2} />
                <Controller
                  control={control}
                  name="passwordConfirmation"
                  defaultValue=""
                  render={({ ref, value, onChange }) => (
                    <TextField
                      type="password"
                      inputRef={ref}
                      value={value as string}
                      label="password_confirmation"
                      variant="outlined"
                      onChange={(e) => onChange(e.target.value)}
                      fullWidth
                    />
                  )}
                />
              </Box>
              <Box mt={5}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                  disableElevation
                >
                  Edit Profile
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </Box>
      <Box my={5}>
        <Paper>
          <Box p={2}>
            <Box
              mb={3}
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
                <BoldTypography variant="h5">アカウント退会</BoldTypography>
              </Box>
            </Box>
            <Button
              color="secondary"
              variant="contained"
              disableElevation
              onClick={UserDelete}
            >
              Delete Account
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AccountEdit;
