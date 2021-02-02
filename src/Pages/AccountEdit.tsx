import React, { useState, ChangeEvent } from 'react';
import snakeCaseKeys from 'snakecase-keys';
import axios, { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Alert from '@material-ui/lab/Alert';
import BoldTypography from '../components/BoldTypography';
import Section from '../components/Section';
import {
  selectCurrentUser,
  selectHeaders,
  setCurrentUser,
} from '../slices/currentUser';
import { IErrorResponse, IUser } from '../interfaces';

type IFormValue = {
  introduction: string;
  image: FileList;
};

const ProfileEdit: React.FC = () => {
  const [serverError, setServerError] = useState('');
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { control, handleSubmit } = useForm<IFormValue>();
  const dispatch = useDispatch();
  const headers = useSelector(selectHeaders);
  const currentUser = useSelector(selectCurrentUser);
  const handleClick = () => {
    if (!headers) return;
    axios.delete('/auth', headers).catch((err) => console.log(err));
  };
  const IconPatch = (e: ChangeEvent<HTMLInputElement>) => {
    if (!headers) return;
    const formData = new FormData();
    formData.append('image', (e.target.files as FileList)[0]);
    axios
      .patch('/auth', formData, headers)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const IconDelete = () => {
    if (!headers) return;
    axios
      .patch('/user/profile', { image: null }, headers)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const onSubmit = (data: IFormValue) => {
    const formData = new FormData();
    if (!headers) return;
    if (data.image) formData.append('image', data.image[0]);
    console.log(formData);
    console.log(snakeCaseKeys({ ...data, image: formData }));
    axios
      .patch<IUser>('/auth', snakeCaseKeys({ ...data }), headers)
      .then((res) => {
        console.log(res);
        dispatch(setCurrentUser(res.data));
      })
      .catch((err: AxiosError<IErrorResponse>) => {
        if (!err.response) return;
        setServerError(err.response.data.errors[0]);
      });
    axios
      .patch<IUser>('/auth', formData, headers)
      .then((res) => {
        console.log(res);
        dispatch(setCurrentUser(res.data));
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
        <Section
          title={<BoldTypography variant="h5">ユーザー編集</BoldTypography>}
        >
          <Box mt={5}>
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
                  <BoldTypography variant="h6">アイコン</BoldTypography>
                </Box>
                <Controller
                  name="image"
                  control={control}
                  render={({ ref, onChange }) => (
                    <input
                      ref={ref}
                      onChange={(e) => onChange(e.target.files)}
                      type="file"
                      accept="image/*"
                    />
                  )}
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
                  <BoldTypography variant="h6">自己紹介文</BoldTypography>
                </Box>
                <Controller
                  name="introduction"
                  control={control}
                  defaultValue={currentUser?.introduction || ''}
                  render={({ ref, value, onChange }) => (
                    <TextField
                      variant="outlined"
                      label="introduction"
                      multiline
                      rows={10}
                      fullWidth
                      inputRef={ref}
                      value={value as string}
                      onChange={(e) => onChange(e.target.value)}
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
                  <BoldTypography variant="h6">性別</BoldTypography>
                </Box>
                <Controller
                  name="gender"
                  control={control}
                  defaultValue={currentUser?.gender || 0}
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
                  name="birthday"
                  control={control}
                  defaultValue={currentUser?.birthday || ''}
                  render={({ ref, value, onChange }) => (
                    <TextField
                      inputRef={ref}
                      type="date"
                      variant="outlined"
                      value={value as string}
                      id="date"
                      label="Birthday"
                      defaultValue="2017-05-24"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => onChange(e.target.value)}
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
                  defaultValue={currentUser?.email}
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
        </Section>
      </Box>
      <Box mb={5}>
        <Section
          title={<BoldTypography variant="h5">アカウント退会</BoldTypography>}
        >
          <Box mt={3}>
            <Button
              color="secondary"
              variant="contained"
              disableElevation
              onClick={handleClick}
            >
              Delete Account
            </Button>
          </Box>
        </Section>
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
